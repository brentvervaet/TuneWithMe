import { Container, Typography, Box, Divider, Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const position = [51.03313998232613, 3.703070657671316];

const About = () => (

  <Container>
    <Box mt={5} textAlign="center">
      <Typography variant="h1" component="h1" gutterBottom>
        About Us
      </Typography>
      <Divider variant="fullWidth" />
      <Box mt={5}>
        <Typography variant="body2" component="p" gutterBottom>
          Welcome to TuneWithMe, your ultimate tuning application!
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          At TuneWithMe, we are passionate about music and committed to 
          providing musicians with the best tools to keep their instruments 
          perfectly tuned. Whether you are a beginner or a professional,
          our application is designed to help you achieve the perfect sound every time.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Our mission is to make tuning instruments easy, accurate, and 
          accessible for everyone. We believe that a well-tuned instrument
          is the foundation of great music, and we strive to provide a user-friendly
          platform that meets the needs of musicians of all levels.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Features
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          - Instrument Management: Easily manage your collection of instruments, 
          including details like type, number of notes, and descriptions.
          <br />
          - Tuning Tools: Use our advanced tuning tools to ensure your instruments are always in perfect pitch.
          <br />
          - Custom Tunings: Create and save custom tunings for your instruments.
          <br />
          - User-Friendly Interface: Our intuitive interface makes it easy to navigate
          and use all the features of the application.
          <br />
          - Real-Time Feedback: Get real-time feedback on your tuning to make quick adjustments.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Our Team
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          We are a team of dedicated developers and music enthusiasts who understand 
          the importance of precision in music. Our goal is to provide a reliable and 
          efficient tool that enhances your musical experience.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          If you have any questions, feedback, or suggestions,
          feel free to reach out to us at 
          <a href="mailto:support@tunewithme.com">support@tunewithme.com</a>.
          We are always here to help and would love to hear from you!
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Thank you for choosing TuneWithMe. Let{'\''}s make beautiful music together!
        </Typography>
        <Box mt={5}>
          <Button color="secondary" component={Link} to="/about/services">Services</Button>
          <Button color="secondary" component={Link} to="/about/history">History</Button>
          <Button color="secondary" component={Link} to="/about/location" data-cy="location_btn">Location</Button>
        </Box>
      </Box>
    </Box>
    <Outlet />
  </Container>
);

export const Services = ()  =>(
  <Container>
    <Box mt={5} textAlign="center">
      <Typography variant="h3" component="h1" gutterBottom>
        Services
      </Typography>
      <Divider variant="fullWidth" />
      <Box mt={5}>
        <Box mt={5} textAlign="left">
          <Typography variant="body2" component="p">
            At TuneWithMe, we offer a range of services to help you keep your instruments in top condition:
          </Typography>
          <Typography variant="body2" component="p">
            - **Instrument Tuning**: Our advanced tuning tools provide accurate and reliable tuning
            for a variety of instruments.
            <br />
            - **Custom Tunings**: Create and save custom tunings tailored to your specific needs.
            <br />
            - **Instrument Management**: Keep track of your instrument collection,
            including details like type, number of notes, and descriptions.
            <br />
            - **Real-Time Feedback**: Receive real-time feedback on your tuning to make quick and precise adjustments.
            <br />
            - **User Support**: Our dedicated support team is here to help you with
            any questions or issues you may have.
          </Typography>
          <Typography variant="body2" component="p">
            We are committed to providing the best possible service to our users.
            If you have any special requests or need assistance, please don{'\''}t 
            hesitate to contact us at <a href="mailto:support@tunewithme.com">support@tunewithme.com</a>.
          </Typography>
        </Box>
      </Box>
    </Box>
  </Container>
);

export const History = () => (
  <Container>
    <Box mt={5} textAlign="center">
      <Typography variant="h3" component="h1" gutterBottom>
        History
      </Typography>
      <Divider variant='middle' />
      <Box mt={5} textAlign="left">
        <Typography variant="body2" component="p">
          TuneWithMe was founded in 2023 by a group of passionate musicians and developers 
          who saw the need for a reliable and user-friendly tuning application. 
          Our journey began with a simple idea: to create a tool that would help 
          musicians of all levels keep their instruments in perfect tune.
        </Typography>
        <Typography variant="body2" component="p">
          Over the years, we have grown and evolved, constantly improving our 
          application based on user feedback and technological advancements.
          Our commitment to quality and innovation has made TuneWithMe a 
          trusted name in the music community.
        </Typography>
        <Typography variant="body2" component="p">
          Today, TuneWithMe is used by thousands of musicians around the world, 
          from beginners to professionals. We are proud of our journey and excited
          about the future as we continue to develop new features and tools to support our users.
        </Typography>
      </Box>
    </Box>
  </Container>
);

export const Location = () => (
  <Container>
    <Box mt={5} textAlign="center">
      <Typography variant="h3" component="h1" gutterBottom>
        Location
      </Typography>
      <Divider variant="fullWidth" />
      <Box mt={5}
        data-cy="map_container"
      >
        <MapContainer 
          center={position} 
          zoom={16} 
          style={{ height: '400px', width: '100%' }} 
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker 
            position={position} 
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </Box>
    </Box>
  </Container>
);

export default About;