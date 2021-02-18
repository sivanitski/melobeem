import propTypes from "prop-types";

const defaultProptypes = {
  CHILD: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    imageUrl: propTypes.string.isRequired,
    totalVotes: propTypes.number.isRequired,
    // parentName: propTypes.string.isRequired, // now it does not exist in back data
    // rank: propTypes.number.isRequired, // now it does not exist in back data
  }).isRequired,
};

export default defaultProptypes;
