import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import ImageViewer from "react-simple-image-viewer";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import CameraAltIcon from "@material-ui/icons/CameraAlt";
import PublishIcon from "@material-ui/icons/Publish";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import ConfirmationModal from "components/ConfirmationModal";

import useStyles from "./style";
import { Typography } from "@material-ui/core";

const ImageField = ({ images }) => {
  const classes = useStyles();

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = React.useState(null);

  const [confirmModalActive, setConfirmModalActive] = useState(false);

  const handleProfileMenuClick = event => {
    event.stopPropagation();
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const openImageViewer = useCallback(index => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const profileMenuOptions = [
    {
      label: "Upload Photo",
      icon: <PublishIcon />,
      handleItemClick: () => console.log("uploaded")
    },
    {
      label: "Remove",
      icon: <DeleteOutlineIcon />,
      handleItemClick: () => setConfirmModalActive(true)
    }
  ];

  return (
    <div
      className={`custom-image-viewer ${images.length === 1 ? "single" : ""}`}
    >
      <ConfirmationModal
        open={confirmModalActive}
        handleClose={() => setConfirmModalActive(false)}
        title="Remove Profile Picture"
        confirmationText="Are you sure you want to remove the profile picture?"
      />
      <div className={classes.imageContainer}>
        {(images || []).map((image, index) => (
          <div className={classes.imageField} key={index}>
            <div
              className={classes.roundedImage}
              style={{
                backgroundImage: `url(https://assets-devap.innovatetech.io/images/landscape_c15d7d0a-400e-45b8-ad99-63ad0d8a9832_3754.jpeg)`
              }}
              key={index}
              onClick={() => openImageViewer(index)}
            >
              <div
                className={classes.imageAction}
                onClick={handleProfileMenuClick}
              >
                <CameraAltIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Menu
        id="profile-image-menu"
        anchorEl={profileMenuAnchor}
        keepMounted
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
      >
        {profileMenuOptions.map(option => (
          <MenuItem
            onClick={() => {
              handleProfileMenuClose();
              option.handleItemClick();
            }}
            className={classes.menuItemLabel}
            key={option.label}
          >
            {option.icon} {option.label}
          </MenuItem>
        ))}
      </Menu>
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
