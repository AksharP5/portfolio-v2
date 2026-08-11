import { feedbackProp } from "./feedback-prop";

export default function Ink({ feedback }) {
  if (!feedback) return null;

  return (
    <div
      className="click-feedback feedback-ink"
      style={{ left: `${feedback.x}px`, top: `${feedback.y}px` }}
      aria-hidden="true"
    >
      <span />
    </div>
  );
}

Ink.propTypes = { feedback: feedbackProp };
