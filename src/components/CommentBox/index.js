import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

import getDateTime from "utils/getDateTime";
import getImageUrl from "utils/getImageUrl";

import useStyles from "./style";

const CommentBox = ({
  user,
  reviewDate,
  comment,
  rating,
  handleDelete,
  handleEdit
}) => {
  const classes = useStyles();
  const [showMore, setShowMore] = useState(false);
  const [moreAvailable, setMoreAvailable] = useState(false);

  useEffect(() => {
    setTimeout(() => setMoreAvailable(hasMoreComment()), 500);
  }, []);
  const { photoUri, fullName, _id: userId } = user;

  const userPhoto = getImageUrl(photoUri);

  const hasMoreComment = () => {
    const commentEl = document.querySelector(`#uc-${userId}`);
    let lines = 1;
    if (commentEl) {
      lines = commentEl.offsetHeight / 25;
    }
    return lines >= 3;
  };

  return (
    <div className={classes.commentWrapper}>
      <div className={classes.commentHeader}>
        <div className={classes.commentProfileWrapper}>
          <div className={classes.commentAvatar}>
            <Avatar
              alt="header-profile-picture"
              src={userPhoto}
              className={classes.largeAvatar}
            />
          </div>
          <div className={classes.commentNameWrapper}>
            <div>
              <Typography className={classes.commentName}>
                {fullName}
              </Typography>
            </div>
            <div className={classes.commentRate}>
              <Grid container spacing={1}>
                <Grid item>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    readOnly
                    size="small"
                    classes={{ iconFilled: classes.ratingColor }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body2" className={classes.secondaryText}>
                    {getDateTime(reviewDate, "onlyDate")}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <div>
          {handleDelete && (
            <Tooltip title="Delete">
              <IconButton
                onClick={handleDelete}
                className={classes.commentActionButton}
              >
                <DeleteRoundedIcon
                  style={{ fontSize: 20 }}
                  className={classes.secondaryText}
                />
              </IconButton>
            </Tooltip>
          )}
          {handleEdit && (
            <Tooltip title="Edit">
              <IconButton
                onClick={handleEdit}
                className={classes.commentActionButton}
                data-cy="review-edit-button"
              >
                <EditRoundedIcon
                  style={{ fontSize: 20 }}
                  className={classes.secondaryText}
                />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
      <div
        className={`${classes.commentBody} ${moreAvailable ? "more" : ""}`}
        onClick={() => (moreAvailable ? setShowMore(prev => !prev) : null)}
      >
        <Typography
          variant="body1"
          className={`${classes.commentContent} ${
            showMore ? "fullReview" : ""
          }`}
          id={`uc-${userId}`}
        >
          {comment}
        </Typography>
      </div>
    </div>
  );
};

CommentBox.propTypes = {
  user: PropTypes.object,
  reviewDate: PropTypes.string,
  rating: PropTypes.number,
  comment: PropTypes.string,
  handleDelete: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  handleEdit: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
};

export default CommentBox;
