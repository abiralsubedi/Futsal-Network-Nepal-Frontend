const checkValidEmail = emailAddress => {
  if (/^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)) {
    return true;
  }
  return false;
};

export default checkValidEmail;
