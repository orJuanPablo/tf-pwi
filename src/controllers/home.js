const home = (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { home };
