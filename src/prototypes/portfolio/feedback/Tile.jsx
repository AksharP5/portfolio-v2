import { feedbackProp } from "./feedback-prop";

export default function Tile({ feedback }) {
  if (!feedback) return null;

  return (
    <div
      className="click-feedback feedback-tile"
      style={{ left: `${feedback.x}px`, top: `${feedback.y}px` }}
      aria-hidden="true"
    >
      <span />
    </div>
  );
}

Tile.propTypes = { feedback: feedbackProp };
