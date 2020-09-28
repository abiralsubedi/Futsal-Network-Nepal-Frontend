import {
  GET_GALLERY_INFO,
  GET_GALLERY_INFO_ERROR,
  GET_GALLERY_INFO_SUCCESS,
  POST_GALLERY_INFO,
  POST_GALLERY_INFO_ERROR,
  POST_GALLERY_INFO_SUCCESS,
  CLEAR_GALLERY_DATA
} from "./constants";

export default (
  state = {
    galleryInfoLoading: false,
    galleryInfo: [],
    galleryInfoError: "",
    postGalleryInfoLoading: false,
    postGalleryInfoSuccess: "",
    postGalleryInfoError: ""
  },
  action
) => {
  switch (action.type) {
    case GET_GALLERY_INFO:
      return {
        ...state,
        galleryInfoLoading: true,
        galleryInfo: [],
        galleryInfoError: ""
      };
    case GET_GALLERY_INFO_SUCCESS:
      return {
        ...state,
        galleryInfoLoading: false,
        galleryInfo: action.payload
      };
    case GET_GALLERY_INFO_ERROR:
      return {
        ...state,
        galleryInfoLoading: false,
        galleryInfoError: action.error
      };

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
        postGalleryInfoLoading: false,
        postGalleryInfoSuccess: "",
        postGalleryInfoError: ""
      };

    default:
      return state;
  }
};
