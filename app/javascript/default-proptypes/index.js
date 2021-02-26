import propTypes from "prop-types";

const defaultProptypes = {
  CHILD: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    imageUrl: propTypes.string.isRequired,
    totalVotes: propTypes.number.isRequired,
    username: propTypes.string.isRequired,
    rank: propTypes.number,
  }).isRequired,
};

export default defaultProptypes;
