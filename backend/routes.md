# Les routes de `QUIZ THE WILD`

| route                  | Verbe                    | Front | Back | Description                                                 | status |
| --------------------- | ------------------------ | ----- | ---- | ----------------------------------------------------------- | ------ |
| /users | GET | NO | yes | Récupérer tous les users | ok |
| /users | POST | NO | yes | Créer un user | ok |
| /login | POST | NO | yes | Connecter un user | ok |
| /logout | POST | NO | yes | déconnecter un user | ok |
| /users/:id | GET | NO | yes | Récupère les infos du user par son ID | ok |
| /users/update-upload | PATCH | NO | yes | Update user sans password et avec un avatar | ok |
| /users/update | PATCH | NO | yes | Update un user sans password et sans avatar | ok |
| /users/update-password | PATCH | NO | yes | Update only le password | ok |
| /users| DELETE | NO | yes | delete user | ok |
| /groups | POST | NO | yes | Créer un groupe | nok |
| /groups/update | PATCH | NO | yes | Modifier le nom du groupe | nok |
| /groups | DELETE | NO | yes | Supprimer un groupe | nok |
| /groups/update | PATCH | NO | yes | Modifier le nom du groupe | nok |
|AJOUTER ET SUPPRIMER UN UTILISATEUR DU GROUPE|
| /events | POST | NO | yes | Créer un évènement | nok |
| /events | GET | NO | yes | Récupérer tous les évènements d'un groupe| nok |
| /events/:id | GET | NO | yes | Récupérer un évènement par son ID | NOT OK |
| /events/:id | PATCH | NO | yes | update un évènement par son ID | NOT OK |
| /events/:id | DELETE | NO | yes | Supprimer un évènement par son ID | NOT OK |
| /reminders | POST | NO | yes | Créer une alerte | NOT OK |
| /reminders/:id | GET | NO | yes | Récupérer une alerte par son ID | NOT OK |
| /reminders/:id | PATCH | NO | yes | Modifier une alerte par son ID | NOT OK |
| /reminders/:id | DELETE | NO | yes | Supprimer une alerte par son ID | NOT OK |
| /tasks | POST | NO | yes | Créer une tâche | NOT OK |
| /tasks | GET | NO | yes | Récupérer toutes les tâches d'une to do list | NOT OK |
| /tasks/:id | DELETE | NO | yes | Supprimer une tâche | NOT OK |
| /tasks/:id | PATCH | NO | yes | Modifier une tâche | NOT OK |
| /tasks-categories| POST | NO | yes | Créer une to do list | NOT OK |
| /tasks-categories| GET | NO | yes | Récupérer toutes les to do list | NOT OK |
| /tasks-categories/:id| GET | NO | yes | Récupérer une to do list | NOT OK |
| /tasks-categories/:id| PATCH | NO | yes | Modifier une to do list | NOT OK |
| /tasks-categories/:id| DELETE | NO | yes | Supprimer une to do list | NOT OK |
| /transactions| POST | NO | yes | Créer une transaction  | NOT OK |
| /transactions| GET | NO | yes | Récupérer toutes les transactions  | NOT OK |
| /transactions/:id| PATCH | NO | yes | Modifier une transaction  | NOT OK |
| /transactions/:id| DELETE | NO | yes | Supprimer une transaction  | NOT OK |
| /transactions-categories| POST | NO | yes | Créer une catégorie de transaction  | NOT OK |
| /transactions-categories| GET | NO | yes | Créer toutes les catégories de transaction  | NOT OK |
| /transactions-categories/:id| PATCH | NO | yes | Modifier une catégorie de transaction  | NOT OK |
| /transactions-categories/:id| DELETE | NO | yes | Supprimer une catégorie de transaction  | NOT OK |
| /documents| POST | NO | yes | Créer un document  | NOT OK |
| /documents| GET | NO | yes | Récupérer tous les documents d'un dossier  | NOT OK |
| /documents/:id| PATCH | NO | yes | Modifier un document  | NOT OK |
| /documents/:id| DELETE | NO | yes | Supprimer un document  | NOT OK |
| /documents-categories| POST | NO | yes | Créer une catégorie de documents  | NOT OK |
| /documents-categories| GET | NO | yes | Réupérer toutes les catégories de documents  | NOT OK |
| /documents-categories/:id| PATCH | NO | yes | Modifier une catégorie de documents  | NOT OK |
| /documents-categories/:id| DELETE | NO | yes | Créer une catégorie de documents  | NOT OK |











