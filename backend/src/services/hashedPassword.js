// on importe argon2 pour hasher le password
const argon2 = require("argon2");

// on importe fs (FileSystem) pour gérer l'upload d'image
const fs = require("fs");

// on gère les options de hashage
// type : méthode de hashage
// memoryCost : quantité de mémoire utilisable par la méthode de hashage (en kilobits)
// timeCost : nb d'itérations par la méthode hashage : augmente la force du hashage mais prend plus de temps
// parallelism : nb de threads pour computer le hashage.
// thread : est une séquence d'instructions d'exécutions
const hashPassword = async (req, res, next) => {
  const hashOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };
  try {
    // on récupère le password rentré par l'user dans le corps de la requête
    const { password } = req.body;

    // si le user a bien rentré un password
    if (password) {
      // on hashe le password
      const hashedPassword = await argon2.hash(password, hashOptions);
      // on supprime le password rentré par le user (on ne garde pas le password en clair)
      // ATTENTION A CORRIGER
      delete password.value;

      // on met à jour la valeur de la propriété hashedPassword avec ce password hashé
      req.body.hashedPassword = hashedPassword;

      next();
    } else {
      fs.unlinkSync(req.file.path);
      res.status(401).send("verifier vos données");
    }
  } catch (error) {
    fs.unlinkSync(req.file.path);

    res.status(500).send(error);
  }
};

module.exports = hashPassword;
