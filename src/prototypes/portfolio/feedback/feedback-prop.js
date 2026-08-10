import PropTypes from "prop-types";

export const feedbackProp = PropTypes.shape({
  id: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});
