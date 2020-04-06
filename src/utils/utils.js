module.exports.generateResponse = function (code, success, message, data) {
  return {
    code,
    success,
    message,
    data,
  };
};

module.exports.formatYupError = (err) => {
  const errors = [];
  err.inner.forEach((e) => {
    errors.push(e.message);
  });
  return errors.toString();
};
