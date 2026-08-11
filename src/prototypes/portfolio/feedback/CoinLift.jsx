import { feedbackProp } from "./feedback-prop";

export default function CoinLift({ feedback }) {
  if (!feedback) return null;

  return (
    <div
      className="click-feedback feedback-coin"
      style={{ left: `${feedback.x}px`, top: `${feedback.y}px` }}
      aria-hidden="true"
    >
      <span className="coin-disc" />
      <span className="coin-shadow" />
    </div>
  );
}

CoinLift.propTypes = { feedback: feedbackProp };
