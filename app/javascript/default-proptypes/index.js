import propTypes from "prop-types";

const defaultProptypes = {
  CHILD: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    imageUrl: propTypes.string.isRequired,
    totalVotes: propTypes.number.isRequired,
    username: propTypes.string,
    rank: propTypes.number.isRequired,
    level: propTypes.number.isRequired,
  }).isRequired,
  WINNER_OF_COMPETITION: propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    winnerImageUrl: propTypes.string.isRequired,
    entriesCount: propTypes.number.isRequired,
    prizeCents: propTypes.number.isRequired,
  }).isRequired,
  VOTER: propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    avatarUrl: propTypes.string,
  }),
};

export default defaultProptypes;
