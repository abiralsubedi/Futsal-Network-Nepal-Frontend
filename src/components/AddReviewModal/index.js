import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";

import Modal from "components/Modal";
import Button from "components/Button";
import TextField from "components/TextField";

import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

import useStyles from "./style";

const AddReviewModal = ({
  open,
  handleClose,
  addReviewData,
  handleSubmit,
  loading
}) => {
  const classes = useStyles();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = React.useState(-1);

  const { _id: reviewId } = addReviewData;

  useEffect(() => {
    if (addReviewData) {
      const { rating, comment } = addReviewData;
      setRating(rating || 0);
      setComment(comment || "");
    }
  }, [addReviewData]);

  const labels = {
    1: "Hated it",
    2: "Didn't like it",
    3: "Just OK",
    4: "Liked it",
    5: "Loved it"
  };

  const commentBoxMemo = useMemo(
    () => (
      <TextField
        id="review-comment"
        label="Comment"
        value={comment}
        handleChange={val => setComment(val)}
        fullWidth
        multiline={true}
        rows={8}
        customClasses={classes.textAreaWrapper}
        autoFocus
        required
      />
    ),
    [comment]
  );

  const ratingMemo = useMemo(
    () => (
      <>
        <Rating
          name="simple-controlled"
          value={rating}
          size="large"
          classes={{
            iconFilled: classes.ratingColor
          }}
          onChange={(event, newValue) => {
            if (newValue) {
              setRating(newValue);
            }
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        {(rating || hover !== -1) && (
          <Box ml={2} className={classes.ratingText}>
            {labels[hover !== -1 ? hover : rating]}
          </Box>
        )}
      </>
    ),
    [hover, rating]
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={`${reviewId ? "Edit" : "Add"} Review`}
    >
      <div className={classes.addReviewContent}>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit({ rating, comment, reviewId });
          }}
        >
          {commentBoxMemo}
          <div className={classes.ratingWrapper}>{ratingMemo}</div>
          <div>
            <Button
              size="large"
              color="primary"
              fullWidth
              buttonRootClass={classes.addReviewButtonRoot}
              type="submit"
              buttonText={reviewId ? "Save" : "Submit"}
              variant="contained"
              actionLoading={loading}
              disabled={loading || !comment || !rating}
              data-cy="submit-review"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

AddReviewModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  addReviewData: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  handleSubmit: PropTypes.func,
  loading: PropTypes.bool
};

export default AddReviewModal;
