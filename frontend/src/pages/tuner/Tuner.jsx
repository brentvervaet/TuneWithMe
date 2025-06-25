import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { PitchDetector } from 'pitchy';
import useSWR from 'swr';
import { getAll } from '../../api/index';
import AsyncData from '../../components/AsyncData';

const Tuner = () => {
  const [frequency, setFrequency] = useState(null);
  const [closestNote, setClosestNote] = useState(null);
  const [deviation, setDeviation] = useState(0);

  const { data: notes = [], isLoading, error } = useSWR('notes', getAll);

  // Find closest note based on frequency
  useEffect(() => {
    if (frequency && notes.length > 0) {
      const closest = notes.reduce((prev, curr) => {
        return Math.abs(curr.frequency - frequency) < Math.abs(prev.frequency - frequency) ? curr : prev;
      });
      setClosestNote(closest);
      
      // Calculate how far off the frequency is from the target note
      const centsOff = 1200 * Math.log2(frequency / closest.frequency);
      setDeviation(centsOff);
    }
  }, [frequency, notes]);

  useEffect(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const pitchDetector = PitchDetector.forFloat32Array(analyser.fftSize);

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const detectPitch = () => {
          const input = new Float32Array(analyser.fftSize);
          analyser.getFloatTimeDomainData(input);
          const [pitch, clarity] = pitchDetector.findPitch(input, audioContext.sampleRate);
          if (clarity > 0.8) {
            setFrequency(pitch.toFixed(2));
          }
          requestAnimationFrame(detectPitch);
        };

        detectPitch();
      });

    return () => audioContext.close();
  }, []);

  return (
    <Container>
      <Box textAlign="center" mt={5}>
        <Typography variant="h3" component="h1" gutterBottom>
          Tuner
        </Typography>
        
        <AsyncData error={error} loading={isLoading}>
          {closestNote && (
            <Box mt={3}>
              <Typography variant="h2" color="primary" gutterBottom>
                {closestNote.name}
              </Typography>
              
              <Typography variant="h5" gutterBottom>
                Target: {closestNote.frequency} Hz
              </Typography>
              
              <Typography variant="h5" 
                color={Math.abs(deviation) < 5 ? 'success.main' : 'error.main'}>
                {frequency ? `Current: ${frequency} Hz` : 'Listening...'}
              </Typography>
              
              <Box mt={2}>
                <Typography variant="body1" 
                  color={Math.abs(deviation) < 5 ? 'success.main' : 'error.main'}>
                  {deviation > 0 ? '▲' : '▼'} {Math.abs(deviation).toFixed(1)} cents
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.abs(deviation) < 5 ? 'In Tune!' : 'Out of Tune'}
                </Typography>
              </Box>
            </Box>
          )}
        </AsyncData>
      </Box>
    </Container>
  );
};

export default Tuner;