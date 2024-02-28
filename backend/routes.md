# Les routes `Backend :c :c :( :( :( )))`

| route                                         | Verbe  | Front | Back | Description                                  | status          |
| --------------------------------------------- | ------ | ----- | ---- | -------------------------------------------- | --------------- |
| /users                                        | GET    | NO    | yes  | Récupérer tous les users                     | ok              |
| /users                                        | POST   | NO    | yes  | Créer un user                                | ok              |
| /login                                        | POST   | NO    | yes  | Connecter un user                            | ok              |
| /logout                                       | POST   | NO    | yes  | déconnecter un user                          | ok              |
| /users/:id                                    | GET    | NO    | yes  | Récupère les infos du user par son ID        | ok              |
| /users/update-upload                          | PATCH  | NO    | yes  | Update user sans password et avec un avatar  | ok              |
| /users/update                                 | PATCH  | NO    | yes  | Update un user sans password et sans avatar  | ok              |
| /users/update-password                        | PATCH  | NO    | yes  | Update only le password                      | ok              |
| /users                                        | DELETE | NO    | yes  | delete user                                  | ok              |
| /groups                                       | POST   | NO    | yes  | Créer un groupe                              | ok              |
| /groups/users/:id                             | GET    | NO    | yes  | Récupérer les groupes du user                | ok              |
| /groups/update                                | PATCH  | NO    | yes  | Modifier le nom du groupe                    | nok             |
| /groups                                       | DELETE | NO    | yes  | Supprimer un groupe                          | nok             |
| /groups/update                                | PATCH  | NO    | yes  | Modifier le nom du groupe                    | nok             |
| AJOUTER ET SUPPRIMER UN UTILISATEUR DU GROUPE |
| /events                                       | POST   | NO    | yes  | Créer un évènement                           | nok             |
| /events                                       | GET    | NO    | yes  | Récupérer tous les évènements d'un groupe    | nok             |
| /events/:id                                   | GET    | NO    | yes  | Récupérer un évènement par son ID            | NOT OK          |
| /events/:id                                   | PATCH  | NO    | yes  | update un évènement par son ID               | NOT OK          |
| /events/:id                                   | DELETE | NO    | yes  | Supprimer un évènement par son ID            | NOT OK          |
| /reminders                                    | POST   | NO    | yes  | Créer une alerte                             | NOT OK          |
| /reminders/:id                                | GET    | NO    | yes  | Récupérer une alerte par son ID              | NOT OK          |
| /reminders/:id                                | PATCH  | NO    | yes  | Modifier une alerte par son ID               | NOT OK          |
| /reminders/:id                                | DELETE | NO    | yes  | Supprimer une alerte par son ID              | NOT OK          |
| /tasks                                        | POST   | NO    | yes  | Créer une tâche                              | NOT OK          |
| /tasks                                        | GET    | NO    | yes  | Récupérer toutes les tâches d'une to do list | NOT OK          |
| /tasks/:id                                    | DELETE | NO    | yes  | Supprimer une tâche                          | NOT OK          |
| /tasks/:id                                    | PATCH  | NO    | yes  | Modifier une tâche                           | NOT OK          |
| /tasks-categories                             | POST   | NO    | yes  | Créer une to do list                         | NOT OK          |
| /tasks-categories                             | GET    | NO    | yes  | Récupérer toutes les to do list              | NOT OK          |
| /tasks-categories/:id                         | GET    | NO    | yes  | Récupérer une to do list                     | NOT OK          |
| /tasks-categories/:id                         | PATCH  | NO    | yes  | Modifier une to do list                      | NOT OK          |
| /tasks-categories/:id                         | DELETE | NO    | yes  | Supprimer une to do list                     | NOT OK          |
| /transactions                                 | POST   | NO    | yes  | Créer une transaction                        | NOT OK          |
| /transactions                                 | GET    | NO    | yes  | Récupérer toutes les transactions            | NOT OK          |
| /transactions/:id                             | PATCH  | NO    | yes  | Modifier une transaction                     | NOT OK          |
| /transactions/:id                             | DELETE | NO    | yes  | Supprimer une transaction                    | NOT OK          |
| /transactions-categories                      | POST   | NO    | yes  | Créer une catégorie de transaction           | NOT OK          |
| /transactions-categories                      | GET    | NO    | yes  | Créer toutes les catégories de transaction   | NOT OK          |
| /transactions-categories/:id                  | PATCH  | NO    | yes  | Modifier une catégorie de transaction        | NOT OK          |
| /transactions-categories/:id                  | DELETE | NO    | yes  | Supprimer une catégorie de transaction       | NOT OK          |
| /documents                                    | POST   | NO    | yes  | Créer un document                            | NOT OK          |
| /documents                                    | GET    | NO    | yes  | Récupérer tous les documents d'un dossier    | NOT OK          |
| /documents/:id                                | PATCH  | NO    | yes  | Modifier un document                         | NOT OK          |
| /documents/:id                                | DELETE | NO    | yes  | Supprimer un document                        | NOT OK          |
| /documents-categories                         | POST   | NO    | yes  | Créer une catégorie de documents             | NOT OK          |
| /documents-categories                         | GET    | NO    | yes  | Réupérer toutes les catégories de documents  | NOT OK          |
| /documents-categories/:id                     | PATCH  | NO    | yes  | Modifier une catégorie de documents          | NOT OK          |
| /documents-categories/:id                     | DELETE | NO    | yes  | Supprimer une catégorie de documents         | NOT OK          |
| /recipes                                      | POST   | NO    | yes  | Créer une recette                            | NOT OK          |
| /recipes                                      | GET    | NO    | yes  | Récupérer toutes les recettes                | NOT OK          |
| /recipes/:id                                  | PATCH  | NO    | yes  | Modifier une recette                         | NOT OK          |
| /recipes/:id                                  | GET    | NO    | yes  | Récupérer une recette                        | NOT OK          |
| /recipes/:id                                  | DELETE | NO    | yes  | Supprimer une recette                        | NOT OK          |
| /positions                                    | POST   | NO    | yes  | Ajouter une position                         | NOT OK          |
| /positions/:id                                | DELETE | NO    | yes  | Supprimer une position                       | NOT OK          |
| /positions/:id                                | GET    | NO    | yes  | Récupérer une position par son ID            | NOT OK          |
| ????????/positions                            | GET    | NO    | yes  | Récupérer toutes les positions               | NOT OK ???????? |
| /messages                                     | POST   | NO    | yes  | Créer un message                             | NOT OK          |
| /messages/:id                                 | DELETE | NO    | yes  | Supprimer un message                         | NOT OK          |
| /messages                                     | GET    | NO    | yes  | Récupérer tous les messages                  | NOT OK          |
| /contacts                                     | POST   | NO    | yes  | Créer un contact                             | NOT OK          |
| /contacts/:id                                 | GET    | NO    | yes  | Récupérer un contact                         | NOT OK          |
| /contacts                                     | GET    | NO    | yes  | Récupérer tous les contacts                  | NOT OK          |
| /contacts/:id                                 | PATCH  | NO    | yes  | Modifier un contact                          | NOT OK          |
| /contacts/:id                                 | DELETE | NO    | yes  | Supprimer un contact                         | NOT OK          |
| /contacts-categories/                         | POST   | NO    | yes  | Créer une catégorie de contact               | NOT OK          |
| /contacts-categories/:id                      | PATCH  | NO    | yes  | Modifier une catégorie de contact            | NOT OK          |
| /contacts-categories/                         | GET    | NO    | yes  | Récupérer toutes les catégories de contact   | NOT OK          |
| /contacts-categories/:id                      | DELETE | NO    | yes  | Supprimer une catégorie de contact           | NOT OK          |

# Les routes `Frontend :D :D :D`

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
| /home         |       | YES   | NO   | Page d'accueil (une fois connecté) | not ok        |
| ????? /logout |       | YES   | NO   | Page d'accueil (landing page)      | not ok ?????? |
| /calendar     |       | YES   | NO   | Page du calendrier                 | not ok        |
| /budget       |       | YES   | NO   | Page du budget                     | not ok        |
| /todolist     |       | YES   | NO   | Page de la todolist                | not ok        |
| /recipes      |       | YES   | NO   | Page de recettes                   | not ok        |
| /contacts     |       | YES   | NO   | Page de contacts                   | not ok        |
| /documents    |       | YES   | NO   | Page de documents                  | not ok        |
| /chat         |       | YES   | NO   | Page du chat                       | not ok        |
| /settings     |       | YES   | NO   | Page de paramètres                 | not ok        |
| /settings     |       | YES   | NO   | Page de paramètres                 | not ok        |

# Est ce qu'une page de paramètre (par ex pour les recettes) est une route ?
