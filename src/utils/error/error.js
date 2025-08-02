export const asyncHandler = (fc) => {
  return (req, res, next) => {
    fc(req, res, next).catch((error) => {
      return next(new Error(error, { cause: 500 }));
    });
  };
};

export const globalErrorHandling = (error, req, res, next) => {
  if (process.env.MOOD == "DEV") {
    return res
      .status(error.cause || 400)
      .json({ error, msg: error.message, stack: error.stack });
  }
  return res
  .status(error.cause || 400)
  .json({error, msg: error.message});
};
