import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "components/TextField";
import Grid from "@material-ui/core/Grid";
import { useSnackbar } from "notistack";

import DeleteIcon from "@material-ui/icons/Delete";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

import ConfirmationModal from "components/ConfirmationModal";

import getImageUrl from "utils/getImageUrl";

import useStyles from "./style";

const ImageHolder = ({
  image,
  wrapperClass,
  handleImageClick,
  handleImageEdit,
  handleImageRemove,
  noCaption
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [caption, setCaption] = useState("");
  const [confirmModalActive, setConfirmModalActive] = useState(false);

  const getImage = () => {
    if (typeof image === "string") {
      return getImageUrl(image);
    } else {
      return window.URL.createObjectURL(image.get("file"));
    }
  };

  const imageUrl = useMemo(() => getImage(), [image]);

  return (
    <div className={`${classes.imageHolderContainer} ${wrapperClass}`}>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={4} xs={12}>
          <div className={classes.imageHolder}>
            <img
              src={imageUrl}
              className={classes.roundedImage}
              style={{
                cursor: !image && "auto"
              }}
              onClick={() => (image ? handleImageClick(imageUrl) : null)}
              alt="holder"
            />
            <div className={classes.imageActions}>
              <Tooltip title="Edit">
                <IconButton
                  aria-label="edit"
                  onClick={() =>
                    document.querySelector("#uploadProfilePicture").click()
                  }
                >
                  <EditRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  aria-label="delete"
                  onClick={() => setConfirmModalActive(true)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </Grid>
        {!noCaption && (
          <Grid item lg={5} sm={6} xs={12}>
            <div className={classes.imageCaption}>
              <TextField
                id="image-caption"
                label="Caption"
                value={caption}
                handleChange={val => setCaption(val)}
                fullWidth
                multiline={true}
                rows={4}
                inputProps={{ maxLength: 200 }}
              />
            </div>
          </Grid>
        )}
      </Grid>
      <input
        accept="image/*"
        id="uploadProfilePicture"
        type="file"
        onChange={({ target }) => {
          const file = target.files[0];
          if (file.size <= 1024 ** 2) {
            const imageFormData = new FormData();
            imageFormData.append("file", file, file.name);
            handleImageEdit(imageFormData);
          } else {
            enqueueSnackbar("Sorry, the image needs to be less than 1 MB.", {
              variant: "error"
            });
          }
          target.value = "";
        }}
        hidden
      />
      <ConfirmationModal
        open={confirmModalActive}
        handleClose={() => setConfirmModalActive(false)}
        title="Remove Profile Picture"
        confirmationText="Are you sure you want to remove the profile picture?"
        handleConfirm={() => {
          setConfirmModalActive(false);
          handleImageRemove();
        }}
      />
    </div>
  );
};

ImageHolder.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  wrapperClass: PropTypes.string,
  handleImageClick: PropTypes.func,
  handleImageEdit: PropTypes.func,
  handleImageRemove: PropTypes.func,
  noCaption: PropTypes.bool
};

export default ImageHolder;
