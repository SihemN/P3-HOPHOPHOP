const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipe" });
  }

  //  Créer une recette

  createRecipe(
    name,
    description,
    persons,
    ingredients,
    category,
    groupId,
    userId,
    time
  ) {
    return this.database.query(
      `INSERT INTO ${this.table} (
      r_name, r_description, r_time_preparation, r_nb_persons, r_list_ingredients, r_category, r_group_id,r_user_id
      ) VALUES (?,?,?,?,?,?,?,?)`,
      [name, description, time, persons, ingredients, category, groupId, userId]
    );
  }

  //  Récupérer toutes les recettes d'un groupe
  getRecipeByGroup(groupId) {
    return this.database.query(
      `SELECT r_id, r_name, r_category, u.u_name
      FROM ${this.table}
      JOIN user AS u ON u.u_id = r_user_id
      WHERE r_group_id = ?
      ORDER BY r_name ASC 
      `,
      [groupId]
    );
  }

  //  Modifier une recette
  updateRecipe(recipeId, recipeUpdated) {
    // on récupère les champs renseignés dans req.body
    const keysToUpdate = Object.keys(recipeUpdated);
    // on récupère leurs valeurs
    const valuesToUpdate = Object.values(recipeUpdated);

    // on compile ces champs dans une string en leur ajoutant le préfixe pour coller à notre BDD et à la syntaxe SQL
    const setKeys = keysToUpdate.map((column) => `r_${column} = ?`).join(", ");
    return this.database.query(
      `UPDATE ${this.table} set ${setKeys} WHERE r_id = ?`,
      [...valuesToUpdate, recipeId]
    );
  }

  //  Récupérer une recette
  getRecipeById(recipeId) {
    return this.database.query(
      `SELECT r_id, r_name, r_description, r_time_preparation, r_nb_persons, r_list_ingredients, r_category FROM ${this.table} WHERE r_id = ?`,
      [recipeId]
    );
  }

  //  Supprimer une recette
  deleteRecipe(recipeId) {
    return this.database.query(`DELETE FROM ${this.table} WHERE r_id = ?`, [
      recipeId,
    ]);
  }
}

module.exports = RecipeManager;
