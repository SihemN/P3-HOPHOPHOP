const tables = require("../tables");

// Créer une recette
const createRecipe = async (req, res) => {
  try {
    const userId = req.payload;
    const { id } = req.params;
    const { name, description, time, persons, ingredients, category } =
      req.body;
    const [result] = await tables.recipe.createRecipe(
      name,
      description,
      persons,
      ingredients,
      category,
      id,
      userId,
      time
    );
    if (result.affectedRows) {
      res.status(201).json("Votre recette à été créée");
    } else {
      res.status(401).json("Problème dans la création !!!");
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
    // console.info("back", result);
    if (result.length) {
      res.status(200).json({
        message: "Liste des recettes du groupe",
        result,
      });
    } else {
      res.status(401).json("Vous n'avez pas de recettes :(");
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
    console.info("result Controller >>", result);
    if (result.affectedRows) {
      res.status(200).json("La recette a été mise à jour");
    } else {
      res.status(401).json("Mise à jour échouée!!");
    }
  } catch (error) {
    // console.log('error', error)
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
      res.status(401).send("Récupération de la recette échouée!!");
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
      res.status(200).json("La recette a été supprimée!");
    } else {
      res.status(401).json("Suppression de la recette échouée!!");
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
