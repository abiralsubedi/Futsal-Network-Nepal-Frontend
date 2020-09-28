import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";

import { useSnackbar } from "notistack";
import Gallery from "react-grid-gallery";
import ImageViewer from "react-simple-image-viewer";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import AddRoundedIcon from "@material-ui/icons/AddRounded";

import Loader from "components/Loader";
import Button from "components/Button";
import ImageHolder from "components/ImageHolder";

import getImageUrl from "utils/getImageUrl";

import { getGalleryInfo, postGalleryInfo, clearGalleryData } from "./actions";
import useStyles from "./style";

const GalleryPage = ({
  fetchGalleryInfo,
  saveGalleryInfo,
  onClearGalleryData,
  globalData: { profile },
  galleryInfoData,
  match
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const {
    galleryInfoLoading,
    galleryInfo,
    postGalleryInfoLoading,
    postGalleryInfoSuccess,
    postGalleryInfoError
  } = galleryInfoData;

  const [editMode, setEditMode] = useState(false);
  const [viewPhotoUrl, setViewPhotoUrl] = useState(false);
  const [editImages, setEditImages] = useState([]);

  const vendorId = match.params.vendorId || profile._id;

  const isUser = profile.role === "User";

  useEffect(() => {
    fetchGalleryInfo({ vendorId });
  }, []);

  useEffect(() => {
    if (galleryInfo) {
      setEditImages(galleryInfo);
    }
  }, [galleryInfo]);

  useEffect(() => {
    if (postGalleryInfoError) {
      enqueueSnackbar(postGalleryInfoError, {
        variant: "error",
        onClose: () => onClearGalleryData()
      });
    }
    if (postGalleryInfoSuccess) {
      enqueueSnackbar(postGalleryInfoSuccess, {
        variant: "success",
        onClose: () => onClearGalleryData()
      });
      fetchGalleryInfo({ vendorId });
    }
  }, [postGalleryInfoError, postGalleryInfoSuccess]);

  const galleryImagesMemo = useMemo(() => {
    return (galleryInfo || []).map(({ photoUri, caption }) => ({
      src: getImageUrl(photoUri),
      thumbnail: getImageUrl(photoUri),
      caption,
      thumbnailWidth: 320,
      thumbnailHeight: 212
    }));
  }, [galleryInfoLoading]);

  const galleryMemo = useMemo(
    () => (
      <Gallery
        images={galleryImagesMemo}
        enableImageSelection={false}
        margin={3}
        backdropClosesModal
      />
    ),
    [galleryInfoLoading]
  );

  const addImageMemo = useMemo(
    () => (
      <div>
        <Tooltip title="Add">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => {
              const newImages = [...editImages];
              newImages.push({ photoUri: "", caption: "" });
              setEditImages(newImages);
            }}
            className={classes.fieldActionIcon}
            edge="end"
          >
            <AddRoundedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </div>
    ),
    [editImages.length]
  );

  if (galleryInfoLoading) {
    return <Loader wrapperClass={classes.loadingWrapper} />;
  }

  return (
    <div className={classes.GameHourContent}>
      <div className={classes.toggleButtonWrapper}>
        {!isUser && (
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            buttonRootClass={classes.toggleViewButton}
            buttonText={editMode ? "View" : "Edit"}
            onClick={() => setEditMode(prev => !prev)}
          />
        )}
      </div>
      {!editMode && galleryMemo}
      {editMode && (
        <div>
          {(editImages || []).map((item, index) => (
            <ImageHolder
              image={item.photoUri}
              captionValue={item.caption}
              wrapperClass={classes.galleryImageContainer}
              handleImageClick={url => setViewPhotoUrl(url)}
              handleCaptionChange={val => {
                const newImages = [...editImages];
                newImages[index].caption = val;
                setEditImages(newImages);
              }}
              handleImageEdit={imageFormData => {
                const newImages = [...editImages];
                newImages[index].photoUri = imageFormData;
                setEditImages(newImages);
              }}
              handleImageRemove={() => {
                const newImages = [...editImages];
                newImages.splice(index, 1);
                setEditImages(newImages);
              }}
              key={index + 1}
            />
          ))}
          {(editImages || []).length < 5 && addImageMemo}
          <Button
            variant="contained"
            size="large"
            color="primary"
            fullWidth
            disabled={postGalleryInfoLoading}
            actionLoading={postGalleryInfoLoading}
            buttonRootClass={classes.postGalleryButton}
            buttonText="Save Changes"
            onClick={() => {
              const filteredImages = editImages.filter(img => img.photoUri);
              saveGalleryInfo({ gallery: filteredImages, vendorId });
            }}
          />
        </div>
      )}
      <div className="custom-image-viewer single">
        {viewPhotoUrl && (
          <ImageViewer
            src={[viewPhotoUrl]}
            currentIndex={0}
            onClose={() => setViewPhotoUrl(false)}
          />
        )}
      </div>
    </div>
  );
};

GalleryPage.propTypes = {
  fetchGalleryInfo: PropTypes.func,
  onClearGalleryData: PropTypes.func,
  saveGalleryInfo: PropTypes.func,
  galleryInfoData: PropTypes.object,
  match: PropTypes.object
};

const mapStateToProps = state => ({
  galleryInfoData: state.GalleryReducer,
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({
  fetchGalleryInfo: data => dispatch(getGalleryInfo(data)),
  onClearGalleryData: () => dispatch(clearGalleryData()),
  saveGalleryInfo: data => dispatch(postGalleryInfo(data))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(GalleryPage);
