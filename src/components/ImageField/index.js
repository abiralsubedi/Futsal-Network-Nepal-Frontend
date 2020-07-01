import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import ImageViewer from "react-simple-image-viewer";

import useStyles from "./style";

const ImageField = ({ images }) => {
  const classes = useStyles();

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback(index => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div
      className={`custom-image-viewer ${images.length === 1 ? "single" : ""}`}
    >
      <div className={classes.imageContainer}>
        {(images || []).map((image, index) => (
          <img
            src={
              "https://assets-devap.innovatetech.io/images/landscape_c15d7d0a-400e-45b8-ad99-63ad0d8a9832_3754.jpeg"
            }
            onClick={() => openImageViewer(index)}
            key={index}
            alt={`index-${index}`}
          />
        ))}
      </div>
      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
};

ImageField.propTypes = {
  images: PropTypes.array
};

export default ImageField;
