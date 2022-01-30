const home = (req, res) => {
  try {
    res.render("index", {
      warning: false,
      success: false,
    });
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { home };
