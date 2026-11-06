# Documentation technique — Auchan-

## 1. Structure du projet

- `index.html` : page principale, filtres, recherche, catalogue, pagination et fenêtre du panier.
- `data/data.json` : jeu de données initial des produits.
- `js/main.js` : point d’entrée, charge les données puis lance l’affichage.
- `js/api.js` : chargement du JSON avec Fetch.
- `js/products.js` : rendu du catalogue, recherche, filtre, pagination, glisser-déposer et interactions du panier.
- `js/cart.js`, `js/dragDrop.js`, `js/storage.js`, `js/ui.js`, `js/validation.js` : modules complémentaires présents dans le dépôt.
- `css/` : feuilles de style du projet.

## 2. Chargement du catalogue

Au démarrage, `main.js` appelle la fonction asynchrone `appi()` du module `api.js`. Celle-ci exécute `fetch("./data/data.json")`, vérifie le statut HTTP, puis convertit la réponse avec `response.json()`. Les données chargées sont également sérialisées dans `localStorage` sous la clé `data`.

Le point d’entrée transmet ensuite le tableau de produits à `afficher()` dans `products.js` pour construire le catalogue.

## 3. Recherche, filtres et pagination

Le catalogue est filtré selon la catégorie choisie et le texte de recherche. La recherche actuelle compare le début du nom du produit, sans tenir compte de la casse. Les événements `change` du filtre et `input` de la recherche remettent la pagination à la première page.

La pagination affiche 8 produits par page. Les boutons précédent et suivant mettent à jour la page courante et le libellé indique la page actuelle et le nombre total de pages.

## 4. Panier et stockage local

Le panier est enregistré sous la clé `cart` dans `localStorage`. `JSON.stringify()` sérialise le tableau avant l’enregistrement et `JSON.parse()` le restaure à la lecture. Si le contenu sauvegardé n’est pas un JSON valide, le panier est initialisé comme tableau vide.

Lorsqu’un produit est ajouté, le code cherche une ligne existante avec le même identifiant. Si elle existe, sa quantité augmente ; sinon une ligne est créée. Le total est calculé en additionnant le prix multiplié par la quantité de chaque article. Le client peut supprimer une ligne du panier.

## 5. Glisser-déposer

Chaque fiche produit est rendue déplaçable. Lors du début du glissement, l’identifiant du produit est placé dans `dataTransfer`. Les zones de dépôt récupèrent cet identifiant, retrouvent le produit dans le catalogue et l’ajoutent au panier. Le panier peut aussi être utilisé avec le bouton « Ajouter au panier », ce qui fournit une alternative au glisser-déposer.

## 6. Interface

La page utilise des classes utilitaires Tailwind CSS pour la mise en page, notamment une grille qui adapte le nombre de colonnes à la largeur de l’écran. Le panier s’affiche dans un élément HTML `<dialog>`.

## 7. Modules JavaScript

Le projet utilise des modules ES avec `type="module"`, `import` et `export`. Les fonctions fléchées sont utilisées pour les gestionnaires d’événements et les traitements de tableaux. Dans les fichiers actuels, `filter()`, `find()` et `reduce()` servent notamment à filtrer les produits, retrouver un article et calculer le total.

## 8. Limites observées

- Le dépôt est une maquette front-end : aucune API serveur ni base de données n’est configurée.
- Le catalogue initial est rechargé depuis le JSON au démarrage ; les modifications de catalogue par l’administrateur ne sont pas implémentées.
- Le panier permet la suppression et l’ajout/incrément de quantité, mais pas encore une interface pour modifier directement la quantité.
- La pagination est fixée à 8 articles par page ; le choix 4/8/12 mentionné dans le brief n’est pas implémenté.
- Le changement grille/liste, le formulaire connecté à RandomUser et la tarification selon la taille ne sont pas présents dans le code observé.
- Pour que `fetch` fonctionne correctement, lancer la page via un serveur web local ou un hébergement, plutôt qu’en ouvrant directement le fichier HTML avec `file://`.

## 9. Pistes d’évolution

Les prochaines évolutions possibles sont un tableau de bord CRUD avec persistance cohérente, un sélecteur de taille et le calcul tarifaire associé, une pagination configurable, une vue grille/liste et l’intégration de l’API RandomUser sur un formulaire de contact.
