// Import access to database tables

const argon2 = require("argon2");

const jwt = require("jsonwebtoken");

const tables = require("../tables");

require("dotenv").config();
// const fs = require("fs");

const read = async (req, res) => {
  try {
    const [users] = await tables.user.getAllUsers();
    if (users.length) {
      res.status(200).json({
        message: "liste des users",
        users,
      });
    } else {
      res.status(200).json({
        message: "pas de users",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const readByEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({ message: "remplir vos champs !" });
    } else {
      const [user] = await tables.user.getUserByEmail(email);
      if (user.length) {
        // check password
        const isVerify = await argon2.verify(
          user[0].u_hashedPassword,
          password
        );

        if (typeof isVerify === "boolean" && isVerify) {
          const token = jwt.sign(
            { payload: user[0].u_id },
            process.env.SECRET_KEY_JWT,
            {
              expiresIn: "24h",
            }
          );

          res.status(200).send(token);
        } else {
          res.status(401).send("verifier vos données");
        }
      } else {
        res.status(401).send("addresse mail n'existe pas");
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const { name, email, hashedPassword, avatar, admin } = req.body;
    const [results] = await tables.user.addUser(
      name,
      email,
      hashedPassword,
      avatar,
      admin
    );
    if (results.affectedRows) {
      res.status(201).send("Created");
    } else {
      res.status(401).send("Error during the creation");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const logout = async (req, res) => {
  try {
    const id = req.payload;
    const token = jwt.sign({ payload: id }, process.env.SECRET_KEY_JWT, {
      expiresIn: "0h",
    });
    res.status(200).json({
      message: "Déconnecté",
      token,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const readById = async (req, res) => {
  try {
    const id = req.payload;
    const [user] = await tables.user.getUserById(id);
    if (user.length) {
      res.status(200).json({ message: "Connecté", user: user[0] });
    } else {
      res.status(401).send("Vérifiez vos données");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const id = req.payload;
    const [result] = await tables.user.updateUserWithoutPassword(id, req.body);
    if (result.affectedRows) {
      res
        .status(200)
        .json({ message: "votre compte a été mis à jour avec succès" });
    } else {
      res.status(401).send("problème");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { hashedPassword } = req.body;
    const id = req.payload;
    const [result] = await tables.user.updateUserOnlyPassword(
      id,
      hashedPassword
    );
    if (result.affectedRows) {
      res.status(200).json({ message: "votre demande a été prise en compte" });
    } else {
      res.status(401).send("problème");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.payload;
    const [result] = await tables.user.deleteUser(id);
    if (result.affectedRows) {
      res.status(200).json({
        message: " La suppression du compte à été prise en compte",
      });
    } else {
      res.status(401).send("problème");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  read,
  create,
  readByEmail,
  logout,
  readById,
  update,
  updatePassword,
  deleteUser,
};
