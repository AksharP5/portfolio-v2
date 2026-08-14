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
