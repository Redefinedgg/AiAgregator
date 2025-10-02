export const checkUnauthorizedError = (err: any) => {
  if (
    err.response?.status === 401 &&
    err.response?.data?.message === "Unauthorized"
  ) {
    window.localStorage.removeItem("accessToken");
    return {
      message: "Unauthorized",
      statusCode: 401,
    };
  }
};
