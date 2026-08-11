import { playTone } from "./audio";

export function playEchoSound(context) {
  playTone(context, {
    duration: 0.1,
    endFrequency: 330,
    frequency: 392,
    type: "triangle",
    volume: 0.025,
  });
  playTone(context, {
    delay: 0.09,
    duration: 0.13,
    endFrequency: 247,
    frequency: 294,
    volume: 0.014,
  });
}

export function playCoinLiftSound(context) {
  playTone(context, {
    duration: 0.055,
    endFrequency: 720,
    frequency: 660,
    type: "triangle",
    volume: 0.022,
  });
  playTone(context, {
    delay: 0.047,
    duration: 0.06,
    endFrequency: 980,
    frequency: 880,
    type: "triangle",
    volume: 0.019,
  });
  playTone(context, {
    delay: 0.094,
    duration: 0.085,
    endFrequency: 1360,
    frequency: 1240,
    volume: 0.014,
  });
}

export function playPinpointSound(context) {
  playTone(context, {
    duration: 0.025,
    endFrequency: 580,
    frequency: 760,
    type: "square",
    volume: 0.01,
  });
  playTone(context, {
    delay: 0.03,
    duration: 0.065,
    endFrequency: 440,
    frequency: 520,
    type: "triangle",
    volume: 0.018,
  });
}

export function playFlipSound(context) {
  playTone(context, {
    duration: 0.085,
    endFrequency: 280,
    frequency: 170,
    type: "triangle",
    volume: 0.03,
  });
  playTone(context, {
    delay: 0.055,
    duration: 0.055,
    endFrequency: 620,
    frequency: 760,
    volume: 0.012,
  });
}

export function playTrailSound(context) {
  [330, 440, 587].forEach((frequency, index) => {
    playTone(context, {
      delay: index * 0.038,
      duration: 0.06,
      endFrequency: frequency * 1.08,
      frequency,
      type: "triangle",
      volume: 0.018 - index * 0.003,
    });
  });
}

export function playInkSound(context) {
  playTone(context, {
    duration: 0.055,
    endFrequency: 160,
    frequency: 230,
    type: "triangle",
    volume: 0.028,
  });
  playTone(context, {
    delay: 0.018,
    duration: 0.04,
    endFrequency: 820,
    frequency: 960,
    volume: 0.009,
  });
}
