import PropTypes from "prop-types";

const VideoComponent = ({ id, small }) => {
  return (
    <iframe
      width="100%"
      height={small ? "150" : "500"}
      src={`https://www.youtube.com/embed/${id}`}
      alt=""
      title="YouTube video player"
      allowFullScreen
    ></iframe>
  );
};

VideoComponent.propTypes = {
  id: PropTypes.string.isRequired,
  small: PropTypes.bool,
};

export default VideoComponent;
