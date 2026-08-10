import { feedbackProp } from "./feedback-prop";

export default function Echo({ feedback }) {
  if (!feedback) return null;

  return (
    <div
      className="click-feedback feedback-echo"
      style={{ left: `${feedback.x}px`, top: `${feedback.y}px` }}
      aria-hidden="true"
    >
      <span />
      <span />
    </div>
  );
}

Echo.propTypes = { feedback: feedbackProp };
