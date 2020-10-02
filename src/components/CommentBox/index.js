import React, { useState } from "react";
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

  const { photoUri, fullName } = user;

  const userPhoto = getImageUrl(photoUri);

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
                  <Typography variant="body2" color="textSecondary">
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
                  className={classes.commentActionIcon}
                />
              </IconButton>
            </Tooltip>
          )}
          {handleEdit && (
            <Tooltip title="Edit">
              <IconButton
                onClick={() => console.log("yes")}
                className={classes.commentActionButton}
              >
                <EditRoundedIcon
                  style={{ fontSize: 20 }}
                  className={classes.commentActionIcon}
                />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
      <div
        className={classes.commentBody}
        onClick={() => setShowMore(prev => !prev)}
      >
        <Typography
          variant="body1"
          className={`${classes.commentContent} ${
            showMore ? "fullReview" : ""
          }`}
        >
          {comment}
        </Typography>
      </div>
    </div>
  );
};

CommentBox.propTypes = {
  user: PropTypes.object,
  reviewDate: PropTypes.instanceOf(Date),
  rating: PropTypes.number,
  comment: PropTypes.string,
  handleDelete: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  handleEdit: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
};

export default CommentBox;
