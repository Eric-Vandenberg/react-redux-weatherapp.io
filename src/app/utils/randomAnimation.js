import Vivus from 'vivus';

export default function randomAnimation() {
  const animations = [
    Vivus.EASE, Vivus.EASE_IN,
    Vivus.EASE_OUT_BOUNCE,
    Vivus.LINEAR, Vivus.EASE_OUT
  ];

  return animations[Math.round(Math.random() * (animations.length - 1))];
};