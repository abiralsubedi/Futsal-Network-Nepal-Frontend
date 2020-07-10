const assetsBaseUrl = process.env.REACT_APP_ASSETS_BASE_URL;

const getImageUrl = photoUri => {
  if (photoUri) {
    if (/https?:/.test(photoUri)) {
      return photoUri;
    } else {
      return `${assetsBaseUrl}${photoUri}`;
    }
  } else {
    return `${assetsBaseUrl}/images/dummy.png`;
  }
};

export default getImageUrl;
