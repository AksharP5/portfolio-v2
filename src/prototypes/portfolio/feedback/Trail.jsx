import { feedbackProp } from "./feedback-prop";

export default function Trail({ feedback }) {
  if (!feedback) return null;

  return (
    <div
      className="click-feedback feedback-trail"
      style={{ left: `${feedback.x}px`, top: `${feedback.y}px` }}
      aria-hidden="true"
    >
      {Array.from({ length: 3 }, (_, index) => (
        <span key={index} style={{ "--trail-index": index }} />
      ))}
    </div>
  );
}

Trail.propTypes = { feedback: feedbackProp };
