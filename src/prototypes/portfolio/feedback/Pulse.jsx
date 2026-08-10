import { feedbackProp } from "./feedback-prop";

export default function Pulse({ feedback }) {
  if (!feedback) return null;

  return (
    <div
      className="click-feedback feedback-pulse"
      style={{ left: `${feedback.x}px`, top: `${feedback.y}px` }}
      aria-hidden="true"
    >
      <span />
    </div>
  );
}

Pulse.propTypes = { feedback: feedbackProp };
