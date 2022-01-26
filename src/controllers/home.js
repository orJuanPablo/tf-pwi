const home = (req, res) => {
  try {
    res.render("index",{titulo: "orJuanPablo"});
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { home };
