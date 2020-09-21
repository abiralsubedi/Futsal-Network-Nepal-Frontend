import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { useSnackbar } from "notistack";

import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

import TextEditor from "components/TextEditor";
import Button from "components/Button";
import Loader from "components/Loader";

import {
  getDescriptionInfo,
  postDescriptionInfo,
  clearDescriptionData
} from "./actions";
import useStyles from "./style";

const DescriptionPage = ({
  fetchDescriptionInfo,
  saveDescriptionInfo,
  onClearDescriptionData,
  globalData: { profile },
  descriptionInfoData,
  match
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const {
    descriptionInfoLoading,
    descriptionInfo: { description },
    postDescriptionInfoLoading,
    postDescriptionInfoSuccess,
    postDescriptionInfoError
  } = descriptionInfoData;

  const vendorId = match.params.vendorId || profile._id;
  const isUser = profile.role === "User";

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    fetchDescriptionInfo({ vendorId });
  }, []);

  useEffect(() => {
    if (description) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(description)))
      );
    }
  }, [description]);

  useEffect(() => {
    if (postDescriptionInfoError) {
      enqueueSnackbar(postDescriptionInfoError, {
        variant: "error",
        onClose: () => onClearDescriptionData()
      });
    }
    if (postDescriptionInfoSuccess) {
      enqueueSnackbar(postDescriptionInfoSuccess, {
        variant: "success",
        onClose: () => onClearDescriptionData()
      });
    }
  }, [postDescriptionInfoError, postDescriptionInfoSuccess]);

  const htmlContent = useMemo(() => {
    if (description) {
      return draftToHtml(JSON.parse(description));
    }
    return "";
  }, [description]);

  if (descriptionInfoLoading) {
    return <Loader wrapperClass={classes.loadingWrapper} />;
  }

  return (
    <div className={classes.descriptionContent}>
      {!isUser && (
        <>
          <TextEditor
            value={editorState}
            handleChange={newState => setEditorState(newState)}
            placeholder="Enter your description"
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => {
              const rawContent = convertToRaw(editorState.getCurrentContent());
              saveDescriptionInfo({
                description: JSON.stringify(rawContent),
                vendorId
              });
            }}
            fullWidth
            disabled={postDescriptionInfoLoading}
            buttonRootClass={classes.descriptionButtonRoot}
            actionLoading={postDescriptionInfoLoading}
            buttonText="Save Changes"
          />
        </>
      )}
      {isUser && <div dangerouslySetInnerHTML={{ __html: htmlContent }} />}
    </div>
  );
};

DescriptionPage.propTypes = {
  fetchDescriptionInfo: PropTypes.func,
  onClearDescriptionData: PropTypes.func,
  saveDescriptionInfo: PropTypes.func,
  descriptionInfoData: PropTypes.object,
  match: PropTypes.object
};

const mapStateToProps = state => ({
  descriptionInfoData: state.DescriptionReducer,
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({
  fetchDescriptionInfo: data => dispatch(getDescriptionInfo(data)),
  onClearDescriptionData: () => dispatch(clearDescriptionData()),
  saveDescriptionInfo: data => dispatch(postDescriptionInfo(data))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(DescriptionPage);
