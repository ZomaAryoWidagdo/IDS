function errorHandler(err, req, res, next) {
  if (err === "DataNotFound") {
    res.status(404).json({
      message: `Data Not Found`,
    });
  } else if (err.name === "validationError") {
    res.status(400).json(err.errors);
  } else if (err === "UpdateFailed") {
    res.status(400).json({
      message: `Update Failed`,
    });
  } else {
    res.status(500).json({
      message: "INTERNAL SERVER ERROR",
    });
  }
}

module.exports = errorHandler;
