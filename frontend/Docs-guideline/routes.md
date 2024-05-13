# Les routes `Backend `

| route                                         | Verbe  | Front | Back | Description                                                           | status          |
| --------------------------------------------- | ------ | ----- | ---- | --------------------------------------------------------------------- | --------------- |
| /users                                        | GET    | NO    | yes  | Récupérer tous les users                                              | ok              |
| /users                                        | POST   | NO    | yes  | Créer un user                                                         | ok              |
| /login                                        | POST   | NO    | yes  | Connecter un user                                                     | ok              |
| /logout                                       | POST   | NO    | yes  | Déconnecter un user                                                   | ok              |
| /me                                           | GET    | NO    | yes  | Récupère les infos du user par son ID                                 | ok              |
| /users/update-upload                          | PATCH  | NO    | yes  | Update un user sans password et avec un avatar                        | ok              |
| /users/update                                 | PATCH  | NO    | yes  | Update un user sans password et sans avatar                           | ok              |
| /users/update-password                        | PATCH  | NO    | yes  | Update only le password                                               | ok              |
| /users                                        | DELETE | NO    | yes  | Delete user                                                           | ok              |
| /users/desactivate                            | PATCH  | NO    | yes  | Désactiver user                                                       | ok              |
| /groups                                       | POST   | NO    | yes  | Créer un groupe                                                       | ok              |
| /groups/users                                 | GET    | NO    | yes  | Récupérer les groupes du user                                         | ok              |
| /groups/:id/users                             | GET    | NO    | yes  | Récupérer les users du groupe                                         | ok              |
| /groups/:id/users                             | POST   | NO    | yes  | Ajouter un user dans le groupe                                        | ok              |
| /groups/:id/users/:idUser                     | PATCH  | NO    | yes  | Modifier le rôle d'un user dans le groupe                             | ok              |
| /groups/:id/users/:idUser                     | DELETE | NO    | yes  | Supprimer un user dans le groupe                                      | ok              |
| /groups/update/:id                            | PATCH  | NO    | yes  | Modifier le nom du groupe                                             | ok              |
| /groups/:id                                   | DELETE | NO    | yes  | Supprimer un groupe                                                   | ok              |
| /events/groups/:id                            | POST   | NO    | yes  | Créer un évènement                                                    | ok              |
| /events/groups/:id                            | GET    | NO    | yes  | Récupérer tous les évènements d'un groupe                             | ok              |
| /events/:id                                   | GET    | NO    | yes  | Récupérer un évènement par son ID                                     | OK              |
| /events/:id                                   | PATCH  | NO    | yes  | update un évènement par son ID                                        | OK              |
| /events/:id                                   | DELETE | NO    | yes  | Supprimer un évènement par son ID                                     | OK              |
| /reminders                                    | POST   | NO    | yes  | Créer une alerte                                                      | OK              |
| /reminders/:id                                | GET    | NO    | yes  | Récupérer une alerte par son ID                                       | OK              |
| /reminders/events/:id                         | GET    | NO    | yes  | Récupérer les alertes d'un event                                      | OK              |
| /reminders/:id                                | PATCH  | NO    | yes  | Modifier une alerte par son ID                                        | OK              |
| /reminders/:id                                | DELETE | NO    | yes  | Supprimer une alerte par son ID                                       | OK              |
| /tasks/groups/:groupId/categories/:catTaskId  | POST   | NO    | yes  | Créer une tâche                                                       | OK              |
| /tasks/categories/:id                         | GET    | NO    | yes  | Récupérer toutes les tâches d'une to do list                          | OK              |
| /tasks/:id                                    | DELETE | NO    | yes  | Supprimer une tâche                                                   | OK              |
| /tasks/:id                                    | PATCH  | NO    | yes  | Modifier une tâche                                                    | OK              |
| /tasks-categories                             | POST   | NO    | yes  | Créer une to do list                                                  | OK              |
| /tasks-categories/groups/:id                  | GET    | NO    | yes  | Récupérer les to do list publiques du group                           | OK              |
| /tasks-categories/groups/:id/users/           | GET    | NO    | yes  | Récupérer les to do list privées du User dans le groupe               | OK              |
| /tasks-categories/:id                         | PATCH  | NO    | yes  | Modifier une to do list                                               | OK              |
| /tasks-categories/:id                         | DELETE | NO    | yes  | Supprimer une to do list                                              | OK              |
| /transactions                                 | POST   | NO    | yes  | Créer une transaction                                                 | OK              |
| /transactions/groups/:id                      | POST   | NO    | yes  | Créer une transaction avec new category                               | OK              |
| /transactions/groups/:id                      | GET    | NO    | yes  | Récupérer toutes les transactions d'un groupe                         | OK              |
| /transactions/:id                             | PATCH  | NO    | yes  | Modifier une transaction                                              | OK              |
| /transactions/:id                             | DELETE | NO    | yes  | Supprimer une transaction                                             | OK              |
| /transactions-categories/groups/:id           | GET    | NO    | yes  | Récupérer toutes les catégories de transaction d'un groupe            | OK              |
| /transactions-categories/:id                  | PATCH  | NO    | yes  | Modifier une catégorie de transaction                                 | OK              |
| /transactions-categories/desactivate/:id      | PATCH  | NO    | yes  | Désactiver une catégorie de transaction                               | OK              |
| /documents                                    | POST   | NO    | yes  | Créer un document                                                     | OK              |
| /documents/categories/:id                     | GET    | NO    | yes  | Récupérer tous les documents d'un dossier                             | OK              |
| /documents/categories/users/:id               | GET    | NO    | yes  | Récupérer tous les documents privés d'un user pour le dossier "Privé" | OK              |
| /documents/:id                                | PATCH  | NO    | yes  | Modifier un document                                                  | OK              |
| /documents/:id                                | DELETE | NO    | yes  | Supprimer un document                                                 | OK              |
| /documents-categories/groups/:id              | POST   | NO    | yes  | Créer une catégorie de documents                                      | OK              |
| /documents-categories                         | GET    | NO    | yes  | Réupérer toutes les catégories de documents                           | OK              |
| /documents-categories/:id                     | PATCH  | NO    | yes  | Modifier une catégorie de documents                                   | OK              |
| /documents-categories/:id                     | DELETE | NO    | yes  | Supprimer une catégorie de documents                                  | OK              |
| /recipes                                      | POST   | NO    | yes  | Créer une recette                                                     | OK              |
| /recipes                                      | GET    | NO    | yes  | Récupérer toutes les recettes                                         | OK              |
| /recipes/:id                                  | PATCH  | NO    | yes  | Modifier une recette                                                  | OK              |
| /recipes/:id                                  | GET    | NO    | yes  | Récupérer une recette                                                 | OK              |
| /recipes/:id                                  | DELETE | NO    | yes  | Supprimer une recette                                                 | OK              |
| /messages/groups/:id                          | POST   | NO    | yes  | Créer un message                                                      | OK              |
| /messages/groups/:id                          | GET    | NO    | yes  | Récupérer tous les messages du groupe                                 | OK              |
| /contacts/contacts/groups/:id/category/:catId | POST   | NO    | yes  | Créer un contact                                                      | OK              |
| /contacts/:id                                 | GET    | NO    | yes  | Récupérer un contact                                                  | OK              |
| /contacts/groups/:id                          | GET    | NO    | yes  | Récupérer tous les contacts du groupe                                 | OK              |
| /contacts/:id                                 | PATCH  | NO    | yes  | Modifier un contact                                                   | OK              |
| /contacts/:id                                 | DELETE | NO    | yes  | Supprimer un contact                                                  | OK              |
| /contacts-categories/                         | POST   | NO    | yes  | Créer une catégorie de contact                                        | OK              |
| /contacts-categories/:id                      | PATCH  | NO    | yes  | Modifier une catégorie de contact                                     | OK              |
| /contacts-categories/                         | GET    | NO    | yes  | Récupérer toutes les catégories de contact                            | OK              |
| /contacts-categories/:id                      | DELETE | NO    | yes  | Supprimer une catégorie de contact                                    | OK              |
| pour une V2                                   | -      | -     | -    | -                                                                     | -               |
| /positions                                    | POST   | NO    | yes  | Ajouter une position                                                  | NOT OK          |
| /positions/:id                                | DELETE | NO    | yes  | Supprimer une position                                                | NOT OK          |
| /positions/:id                                | GET    | NO    | yes  | Récupérer une position par son ID                                     | NOT OK          |
| ????????/positions                            | GET    | NO    | yes  | Récupérer toutes les positions                                        | NOT OK ???????? |

# Les routes `Frontend`

# Routes publiques

| route          | Verbe | Front | Back | Description                          | status |
| -------------- | ----- | ----- | ---- | ------------------------------------ | ------ |
| /index         |       | YES   | NO   | Page d'accueil (landing page)        | not ok |
| /404           |       | YES   | NO   | Page d'erreur 404                    | not ok |
| /signup        |       | YES   | NO   | Page d'inscription                   | not ok |
| /login         |       | YES   | NO   | Page de connexion                    | not ok |
| /signup        |       | YES   | NO   | Page d'inscription                   | not ok |
| /lost-password |       | YES   | NO   | Page de récupération de mot de passe | not ok |

# Routes protégées

| route         | Verbe | Front | Back | Description                        | status        |
| ------------- | ----- | ----- | ---- | ---------------------------------- | ------------- |
| /home         |       | YES   | NO   | Page d'accueil (une fois connecté) | not ok     
| /documents    |       | YES   | NO   | Page de documents                  | not ok        |
| /recipes      |       | YES   | NO   | Page de recettes                   | not ok        |
| /todolist     |       | YES   | NO   | Page de la todolist                | not ok        |
| /contacts     |       | YES   | NO   | Page de contacts                   | not ok        |
| /calendar     |       | YES   | NO   | Page du calendrier                 | not ok        |
| /budget       |       | YES   | NO   | Page du budget                     | not ok        |
| /chat         |       | YES   | NO   | Page du chat                       | not ok        |
| /settings     |       | YES   | NO   | Page de paramètres                 | not ok        |
| /settings     |       | YES   | NO   | Page de paramètres                 | not ok        |

# Est ce qu'une page de paramètre (par ex pour les recettes) est une route ?
