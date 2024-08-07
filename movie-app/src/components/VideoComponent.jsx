import PropTypes from "prop-types";
import React from "react";
import "../index.css";
import { Box } from "@chakra-ui/react";

const VideoComponent = ({ id, small }) => {
  return (
    <Box className="videoWrapper">
      <iframe
        width="100%"
        height={small ? "150" : "500"}
        src={`https://www.youtube.com/embed/${id}`}
        alt=""
        title="YouTube video player"
        allowFullScreen
      ></iframe>
    </Box>
  );
};

VideoComponent.propTypes = {
  id: PropTypes.string.isRequired,
  small: PropTypes.bool,
};

export default VideoComponent;
