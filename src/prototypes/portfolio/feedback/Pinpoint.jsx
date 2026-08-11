import { feedbackProp } from "./feedback-prop";

export default function Pinpoint({ feedback }) {
  if (!feedback) return null;

  return (
    <div
      className="click-feedback feedback-pinpoint"
      style={{ left: `${feedback.x}px`, top: `${feedback.y}px` }}
      aria-hidden="true"
    >
      <span className="pinpoint-tick pinpoint-tick-top" />
      <span className="pinpoint-tick pinpoint-tick-right" />
      <span className="pinpoint-tick pinpoint-tick-bottom" />
      <span className="pinpoint-tick pinpoint-tick-left" />
    </div>
  );
}

Pinpoint.propTypes = { feedback: feedbackProp };
