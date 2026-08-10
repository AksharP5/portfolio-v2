import { playTone } from "./audio";

export function playPulseSound(context) {
  playTone(context, {
    duration: 0.075,
    endFrequency: 180,
    frequency: 260,
    type: "triangle",
    volume: 0.035,
  });
}

export function playSnapSound(context) {
  playTone(context, {
    duration: 0.028,
    endFrequency: 420,
    frequency: 720,
    type: "square",
    volume: 0.014,
  });
  playTone(context, {
    delay: 0.035,
    duration: 0.035,
    endFrequency: 280,
    frequency: 440,
    type: "triangle",
    volume: 0.02,
  });
}

export function playEchoSound(context) {
  playTone(context, {
    duration: 0.11,
    endFrequency: 480,
    frequency: 520,
    volume: 0.024,
  });
  playTone(context, {
    delay: 0.075,
    duration: 0.14,
    endFrequency: 620,
    frequency: 680,
    volume: 0.017,
  });
}

export function playTileSound(context) {
  playTone(context, {
    duration: 0.09,
    endFrequency: 105,
    frequency: 190,
    type: "triangle",
    volume: 0.036,
  });
  playTone(context, {
    delay: 0.012,
    duration: 0.035,
    endFrequency: 680,
    frequency: 760,
    volume: 0.011,
  });
}

export function playBarsSound(context) {
  playTone(context, {
    duration: 0.06,
    endFrequency: 380,
    frequency: 300,
    type: "triangle",
    volume: 0.024,
  });
  playTone(context, {
    delay: 0.06,
    duration: 0.08,
    endFrequency: 560,
    frequency: 470,
    type: "triangle",
    volume: 0.021,
  });
}
