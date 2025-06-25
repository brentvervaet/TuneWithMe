let TUNINGS = [
  {
    id: 1,
    name: 'Standard',
    isCustom: false,
  },
  {
    id: 2,
    name: 'Drop D',
    isCustom: false,
  },
  {
    id: 3,
    name: 'Open G',
    isCustom: false,
  },
];

let INSTRUMENTS = [
  {
    id: 1,
    name: 'Guitar',
    type: 'String',
  },
  {
    id: 2,
    name: 'Bass',
    type: 'String',
  },
  {
    id: 3,
    name: 'Ukulele',
    type: 'String',
  },
  {
    id: 4,
    name: 'Violin',
    type: 'String',
  },
];
let NOTES = [
  {
    id: 1,
    name: 'C',
    frequency: 16.35,
  },
  {
    id: 2,
    name: 'C#',
    frequency: 17.32,
  },
  {
    id: 3,
    name: 'D',
    frequency: 18.35,
  },
  {
    id: 4,
    name: 'D#',
    frequency: 19.45,
  },
  {
    id: 5,
    name: 'E',
    frequency: 20.6,
  },
  {
    id: 6,
    name: 'F',
    frequency: 21.83,
  },
  {
    id: 7,
    name: 'F#',
    frequency: 23.12,
  },
  {
    id: 8,
    name: 'G',
    frequency: 24.5,
  },
  {
    id: 9,
    name: 'G#',
    frequency: 25.96,
  },
  {
    id: 10,
    name: 'A',
    frequency: 27.5,
  },
  {
    id: 11,
    name: 'A#',
    frequency: 29.14,
  },
  {
    id: 12,
    name: 'B',
    frequency: 30.87,
  },
];

module.exports = { INSTRUMENTS, TUNINGS, NOTES };
