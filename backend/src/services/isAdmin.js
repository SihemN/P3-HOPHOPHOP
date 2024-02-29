const isAdmin = (req, res, next) => {
  try {
    if (req.body.admin) {
      next();
    } else {
      res.status(403).send("accès refusé, vous n'êtes pas admin");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = isAdmin;

// vérifier si le user est dans la BDD
// vérifier si le user est dans le groupe à supprimer
// vérifier s'il est admin
