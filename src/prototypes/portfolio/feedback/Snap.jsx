import { feedbackProp } from "./feedback-prop";

export default function Snap({ feedback }) {
  if (!feedback) return null;

  return (
    <div
      className="click-feedback feedback-snap"
      style={{ left: `${feedback.x}px`, top: `${feedback.y}px` }}
      aria-hidden="true"
    >
      <span className="snap-corner snap-corner-tl" />
      <span className="snap-corner snap-corner-tr" />
      <span className="snap-corner snap-corner-br" />
      <span className="snap-corner snap-corner-bl" />
    </div>
  );
}

Snap.propTypes = { feedback: feedbackProp };
