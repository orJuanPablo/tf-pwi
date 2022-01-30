const fourOfour = (req, res) => {
    try {
      res.render("fourOfour");
    } catch (error) {
      throw new Error(error);
    }
  };
  module.exports = { fourOfour };