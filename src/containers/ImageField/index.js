import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import ImageViewer from "react-simple-image-viewer";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useSnackbar } from "notistack";

import CameraAltIcon from "@material-ui/icons/CameraAlt";
import PublishIcon from "@material-ui/icons/Publish";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import Modal from "components/Modal";
import Button from "components/Button";
import ConfirmationModal from "components/ConfirmationModal";

import { postProfilePicture, clearMessage } from "./actions";

import useStyles from "./style";

const ImageField = ({
  images,
  saveProfilePicture,
  onClearImageMessage,
  imageFieldData
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const {
    postProfilePictureLoading,
    postProfilePictureSuccess,
    postProfilePictureError
  } = imageFieldData;

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = React.useState(null);

  const [confirmModalActive, setConfirmModalActive] = useState(false);
  const [pictureModalActive, setPictureModalActive] = useState(false);
  const [editImageData, setEditImageData] = useState(false);

  useEffect(() => {
    if (postProfilePictureError) {
      enqueueSnackbar(postProfilePictureError, {
        variant: "error",
        onClose: () => onClearImageMessage()
      });
    }
    if (postProfilePictureSuccess) {
      enqueueSnackbar(postProfilePictureSuccess, {
        variant: "success",
        onClose: () => onClearImageMessage()
      });
      setPictureModalActive(false);
    }
    setConfirmModalActive(false);
  }, [postProfilePictureError, postProfilePictureSuccess]);

  const profileMenuOptions = [
    {
      label: "Upload Photo",
      icon: <PublishIcon />,
      handleItemClick: () =>
        document.querySelector("#uploadProfilePicture").click()
    },
    {
      label: "Remove",
      icon: <DeleteOutlineIcon />,
      handleItemClick: () => setConfirmModalActive(true)
    }
  ];

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

  return (
    <div
      className={`custom-image-viewer ${images.length === 1 ? "single" : ""}`}
    >
      <ConfirmationModal
        open={confirmModalActive}
        handleClose={() => setConfirmModalActive(false)}
        title="Remove Profile Picture"
        confirmationText="Are you sure you want to remove the profile picture?"
        handleConfirm={() => saveProfilePicture("")}
        loading={postProfilePictureLoading}
      />
      <Modal
        open={pictureModalActive}
        handleClose={() => setPictureModalActive(false)}
        title="Update Profile Picture"
      >
        <div className={classes.attachmentThumbnail}>
          {editImageData && (
            <img
              src={window.URL.createObjectURL(editImageData.get("file"))}
              alt="Not found"
            />
          )}
        </div>
        <Button
          variant="contained"
          size="large"
          color="primary"
          fullWidth
          disabled={postProfilePictureLoading}
          buttonRootClass={classes.imageButtonRoot}
          onClick={() => saveProfilePicture(editImageData)}
          actionLoading={postProfilePictureLoading}
          buttonText="Update"
        />
      </Modal>
      <input
        accept="image/*"
        id="uploadProfilePicture"
        type="file"
        onChange={({ target }) => {
          const file = target.files[0];
          const imageFormData = new FormData();
          imageFormData.append("file", file, file.name);
          setEditImageData(imageFormData);
          target.value = "";
          setPictureModalActive(true);
        }}
        hidden
      />
      <div className={classes.imageContainer}>
        {(images || []).map((image, index) => (
          <div className={classes.imageField} key={index}>
            <div
              className={classes.roundedImage}
              style={{
                backgroundImage: `url(${image})`
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
        classes={{ paper: classes.imageMenuPaper }}
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
  images: PropTypes.array,
  imageFieldData: PropTypes.object,
  savePassword: PropTypes.func,
  onClearImageMessage: PropTypes.func
};

const mapStateToProps = state => ({
  imageFieldData: state.ImageFieldReducer
});

const mapDispatchToProps = dispatch => ({
  saveProfilePicture: data => dispatch(postProfilePicture(data)),
  onClearImageMessage: () => dispatch(clearMessage())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ImageField);
