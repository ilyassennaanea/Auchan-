# Présentation du projet Auchan

## Contexte
Auchan- est une maquette de catalogue e-commerce réalisée côté client. Elle permet de consulter des produits chargés depuis un fichier JSON, de les rechercher ou filtrer par catégorie, puis de les ajouter à un panier.

## Fonctionnalités présentes
- Affichage du catalogue de produits avec leur nom, prix, catégorie, stock et image lorsqu’elle est disponible.
- Recherche par nom et filtre par catégorie.
- Pagination de 8 produits par page.
- Ajout d’un article au panier avec un bouton ou par glisser-déposer.
- Consultation du panier, suppression d’un article et calcul du total.
- Conservation du panier dans le stockage local du navigateur.

## Technologies
HTML, JavaScript ES Modules (ES6+) et Tailwind CSS. Les données de démonstration sont fournies dans `data/data.json`.

## Périmètre
La version actuelle est une application front-end de démonstration. Elle ne comporte pas encore de serveur, de paiement, de compte utilisateur ni de tableau de bord administrateur CRUD.
