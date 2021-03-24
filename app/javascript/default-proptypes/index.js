import propTypes from "prop-types";

const defaultProptypes = {
  CHILD: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    imageUrl: propTypes.string.isRequired,
    totalVotes: propTypes.number.isRequired,
    username: propTypes.string.isRequired,
    rank: propTypes.number.isRequired,
    level: propTypes.number.isRequired,
  }).isRequired,
  VOTER: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    avatarUrl: propTypes.string.isRequired,
  }).isRequired,
};

export default defaultProptypes;
