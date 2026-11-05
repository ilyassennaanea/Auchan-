import { appi } from "./api.js";
import { afficher } from "./products.js";

appi()
  .then((products) => afficher(products))
 
