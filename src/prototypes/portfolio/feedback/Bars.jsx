import { feedbackProp } from "./feedback-prop";

export default function Bars({ feedback }) {
  if (!feedback) return null;

  return (
    <div
      className="click-feedback feedback-bars"
      style={{ left: `${feedback.x}px`, top: `${feedback.y}px` }}
      aria-hidden="true"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} style={{ "--bar-index": index }} />
      ))}
    </div>
  );
}

Bars.propTypes = { feedback: feedbackProp };
