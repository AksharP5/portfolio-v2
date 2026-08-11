import { feedbackProp } from "./feedback-prop";

export default function Flip({ feedback }) {
  if (!feedback) return null;

  return (
    <div
      className="click-feedback feedback-flip"
      style={{ left: `${feedback.x}px`, top: `${feedback.y}px` }}
      aria-hidden="true"
    >
      <span />
    </div>
  );
}

Flip.propTypes = { feedback: feedbackProp };
