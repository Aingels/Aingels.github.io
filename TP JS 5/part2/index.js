// Create needed constants
const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');

let db;

window.onload = function () {
    //ouvrir la BDD; elle sera créée si elle n'existe pas déjà
    let request = window.indexedDB.open('notes', 1);
    // la base de données n'a pas pu être ouverte avec succès
    request.onerror = function () {
        console.log('Database failed to open');
    };

    // la base de données a été ouverte avec succès
    request.onsuccess = function () {
        console.log('Database opened successfully');

        // Stocke la base de données ouverte dans la variable db. On l'utilise par la suite
        db = request.result;

        // Exécute la fonction displayData() pour afficher les notes qui sont dans la BDD
        displayData();

        // Spécifie les tables de la BDD si ce n'est pas déjà pas fait
        request.onupgradeneeded = function (e) {
            // Récupère une référence à la BDD ouverte
            let db = e.target.result;

            // Crée un objectStore pour stocker nos notes (une table)
            // Avec un champ qui s'auto-incrémente comme clé
            let objectStore = db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });

            // Définit les champs que l'objectStore contient
            objectStore.createIndex('title', 'title', { unique: false });
            objectStore.createIndex('body', 'body', { unique: false });

            console.log('Database setup complete');

            // Créer un gestionnaire onsubmit pour appeler la fonction addData() quand le formulaire est soumis
            form.onsubmit = addData;

            // Définit la fonction addData()
            function addData(e) {
                // empêcher le formulaire d'être soumis vers le serveur
                e.preventDefault();

                // récupérer les valeurs entrées dans les champs du formulaire
                // et les stocker dans un objet qui sera inséré en BDD
                let newItem = { title: titleInput.value, body: bodyInput.value };

                // ouvrir une transaction en lecture/écriture
                let transaction = db.transaction(['notes'], 'readwrite');

                // récupérer l'object store de la base de données qui a été ouvert avec la transaction
                let objectStore = transaction.objectStore('notes');

                // demander l'ajout de notre nouvel objet à l'object store
                var request = objectStore.add(newItem);
                request.onsuccess = function () {
                    // vider le formulaire, pour qu'il soit prêt pour un nouvel ajout
                    titleInput.value = '';
                    bodyInput.value = '';
                };
                // attendre la fin de la transaction, quand l'ajout a été effectué
                transaction.oncomplete = function () {
                    console.log('Transaction completed: database modification finished.');

                    // mettre à jour l'affichage pour montrer le nouvel item en exécutant displayData()
                    displayData();
                };

                transaction.onerror = function () {
                    console.log('Transaction not opened due to error');
                };
            }

        };
    };
}