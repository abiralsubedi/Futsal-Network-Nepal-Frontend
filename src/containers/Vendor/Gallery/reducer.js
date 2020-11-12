import {
  POST_GALLERY_INFO,
  POST_GALLERY_INFO_ERROR,
  POST_GALLERY_INFO_SUCCESS,
  CLEAR_GALLERY_DATA
} from "./constants";

export default (
  state = {
    postGalleryInfoLoading: false,
    postGalleryInfoSuccess: "",
    postGalleryInfoError: ""
  },
  action
) => {
  switch (action.type) {
    case POST_GALLERY_INFO:
      return {
        ...state,
        postGalleryInfoLoading: true,
        postGalleryInfoSuccess: "",
        postGalleryInfoError: ""
      };
    case POST_GALLERY_INFO_SUCCESS:
      return {
        ...state,
        postGalleryInfoLoading: false,
        postGalleryInfoSuccess: action.payload
      };
    case POST_GALLERY_INFO_ERROR:
      return {
        ...state,
        postGalleryInfoLoading: false,
        postGalleryInfoError: action.error
      };

    case CLEAR_GALLERY_DATA:
      return {
        ...state,
        postGalleryInfoSuccess: "",
        postGalleryInfoError: ""
      };

    default:
      return state;
  }
};
