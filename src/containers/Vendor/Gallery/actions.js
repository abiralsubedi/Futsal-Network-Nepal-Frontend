import {
  GET_GALLERY_INFO,
  GET_GALLERY_INFO_ERROR,
  GET_GALLERY_INFO_SUCCESS,
  POST_GALLERY_INFO,
  POST_GALLERY_INFO_ERROR,
  POST_GALLERY_INFO_SUCCESS,
  CLEAR_GALLERY_DATA
} from "./constants";

export const getGalleryInfo = payload => ({
  type: GET_GALLERY_INFO,
  payload
});

export const getGalleryInfoSuccess = payload => ({
  type: GET_GALLERY_INFO_SUCCESS,
  payload
});
export const getGalleryInfoError = error => ({
  type: GET_GALLERY_INFO_ERROR,
  error
});

export const postGalleryInfo = payload => ({
  type: POST_GALLERY_INFO,
  payload
});

export const postGalleryInfoSuccess = payload => ({
  type: POST_GALLERY_INFO_SUCCESS,
  payload
});
export const postGalleryInfoError = error => ({
  type: POST_GALLERY_INFO_ERROR,
  error
});

export const clearGalleryData = () => ({
  type: CLEAR_GALLERY_DATA
});
