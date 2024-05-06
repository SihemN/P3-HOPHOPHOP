/* eslint-disable camelcase */
const tables = require("../tables");

// Créer une recette
const createRecipe = async (req, res) => {
  try {
    const userId = req.payload;
    const { id } = req.params;
    const {
      name,
      description,
      time_preparation,
      nb_persons,
      list_ingredients,
      category,
    } = req.body;
    const [result] = await tables.recipe.createRecipe(
      name,
      description,
      nb_persons,
      list_ingredients,
      category,
      id,
      userId,
      time_preparation
    );
    if (result.affectedRows) {
      res.status(201).json("recette créée");
    } else {
      res
        .status(401)
        .json("La création n'a pas aboutie, actualisez la page et réessayez");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Récupérer toutes les recettes
const getRecipeByGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.recipe.getRecipeByGroup(id);
    if (result.length === 0) {
      res.status(200).json({
        message: "Aucune recette à afficher",
        result,
      });
    } else if (result.length) {
      res.status(200).json({
        message: "Liste des recettes du groupe",
        result,
      });
    } else {
      res.status(401).json("erreur pour récupérer les recettes");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Modifier une recette
const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.recipe.updateRecipe(id, req.body);
    if (result.affectedRows) {
      res.status(200).json("recette mise à jour");
    } else {
      res.status(401).json("Mise à jour échouée");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Récupérer une recette
const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.recipe.getRecipeById(id);
    if (result.length) {
      res.status(200).json({
        message: "Recette récupérée",
        result,
      });
    } else {
      res.status(401).send("Récupération de la recette échouée");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Supprimer une recette
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.recipe.deleteRecipe(id);
    if (result.affectedRows) {
      res.status(200).json("recette supprimée");
    } else {
      res.status(401).json("Suppression de la recette a échouée");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createRecipe,
  getRecipeByGroup,
  updateRecipe,
  getRecipeById,
  deleteRecipe,
};
