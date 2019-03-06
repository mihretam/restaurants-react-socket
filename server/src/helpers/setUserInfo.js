const setUserInfo = (request) => {
  const getUserInfo = {
    _id: request._id,
    fullName: request.fullName,
    email: request.email,
    role: request.role,
  };
  return getUserInfo;
};

export default setUserInfo;
