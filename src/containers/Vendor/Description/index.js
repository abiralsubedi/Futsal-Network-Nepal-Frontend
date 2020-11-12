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

import { getVendorAdditionalInfo } from "containers/Vendor/SitePage/actions";

import { postDescriptionInfo, clearDescriptionData } from "./actions";
import useStyles from "./style";

const DescriptionPage = ({
  saveDescriptionInfo,
  onClearDescriptionData,
  globalData: { profile },
  descriptionInfoData,
  match,
  sitePageData,
  fetchVendorAdditionalInfo
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const {
    postDescriptionInfoLoading,
    postDescriptionInfoSuccess,
    postDescriptionInfoError
  } = descriptionInfoData;

  const { descriptionInfo, vendorAdditionalInfoLoading } = sitePageData;

  const vendorId = match.params.vendorId || profile._id;
  const isUser = profile.role === "User";

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (descriptionInfo) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(descriptionInfo))
        )
      );
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [descriptionInfo]);

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
      fetchVendorAdditionalInfo({ vendorId });
    }
  }, [postDescriptionInfoError, postDescriptionInfoSuccess]);

  const htmlContent = useMemo(() => {
    if (descriptionInfo) {
      return draftToHtml(JSON.parse(descriptionInfo));
    }
    return `<p style="color: #989393; text-align: center; font-size: 1rem">There is no description.</p>`;
  }, [descriptionInfo]);

  if (vendorAdditionalInfoLoading) {
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
  onClearDescriptionData: PropTypes.func,
  saveDescriptionInfo: PropTypes.func,
  descriptionInfoData: PropTypes.object,
  match: PropTypes.object,
  sitePageData: PropTypes.object,
  fetchVendorAdditionalInfo: PropTypes.func
};

const mapStateToProps = state => ({
  descriptionInfoData: state.DescriptionReducer,
  globalData: state.LoginReducer,
  sitePageData: state.SitePageReducer
});

const mapDispatchToProps = dispatch => ({
  fetchVendorAdditionalInfo: data => dispatch(getVendorAdditionalInfo(data)),
  onClearDescriptionData: () => dispatch(clearDescriptionData()),
  saveDescriptionInfo: data => dispatch(postDescriptionInfo(data))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(DescriptionPage);
