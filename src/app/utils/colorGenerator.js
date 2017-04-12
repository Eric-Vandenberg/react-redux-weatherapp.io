export default function randomColorSelect() {
  const colors = [
    '#FF1744', '#F50057', '#D500F9',
    '#651FFF', '#3D5AFE', '#2979FF',
    '#00B0FF', '#00E5FF', '#1DE9B6',
    '#00E676', '#76FF03', '#FFEA00',
    '#FFC400', '#FF9100', '#FF3D00'
  ];

  return colors[Math.round(Math.random() * (colors.length - 1))]
};