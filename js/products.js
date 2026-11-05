function lirePanier() {
  try { return JSON.parse(localStorage.getItem("cart") || "[]"); }
  catch { return []; }
}

function afficherPanier() {
  const itemsContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");
  if (!itemsContainer || !totalElement) return;

  const cart = lirePanier();
  itemsContainer.innerHTML = "";
  if (cart.length === 0) {
    itemsContainer.textContent = "Votre panier est vide.";
  }
  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "flex items-center justify-between gap-3 rounded border p-3";
    const label = document.createElement("span");
    label.textContent = `${item.name} × ${item.quantity}`;
    const price = document.createElement("span");
    price.textContent = `${(Number(item.price) * item.quantity).toFixed(2)}`;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Supprimer";
    remove.className = "text-red-600 underline";
    remove.addEventListener("click", () => {
      localStorage.setItem("cart", JSON.stringify(lirePanier().filter((product) => product.id !== item.id)));
      afficherPanier();
      console.log()
    });
    row.append(label, price, remove);
    itemsContainer.append(row);
  });
  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  totalElement.textContent = total.toFixed(2);
}
function ajouterAuPanier(product) {
  const cart = lirePanier();
  const id = product.id ?? product.name;
  const existing = cart.find((item) => String(item.id) === String(id));
  if (existing) existing.quantity++;
  else cart.push({ id, name: product.name, price: Number(product.price) || 0, quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  afficherPanier();
}
export function afficher(products) {
  const itemsPerPage = 8;
  let currentPage = 1;
  const container = document.getElementById("catalogue-products");
  const btnNext = document.getElementById("scrol-next");
  const btnBack = document.getElementById("scrol-back");
  const numberPage = document.getElementById("number-page");
  const select = document.getElementById("cataloge");
  const nameProduct = document.getElementById("NameRecherche");
  const cartItems = document.getElementById("cart-items")

  if (!container || !btnNext || !btnBack || !numberPage || !select || !nameProduct || !cartItems) {
    console.error("Element HTML manque. Vérifie les IDs du catalogue.");
    return;
  }

  function render() {
    const category = select.value;
    const search = nameProduct.value.trim().toLowerCase();
    const filtered = products.filter((product) => {
      return (!category || category === "all" || product.category === category) &&
        String(product.name ?? "").toLowerCase().startsWith(search);
    });
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    if (totalPages > 0 && currentPage > totalPages) currentPage = totalPages;
    container.innerHTML = "";

    if (filtered.length === 0) {
      container.textContent = "Aucun produit trouvé.";
    } else {
      filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).forEach((product) => {
        const card = document.createElement("article");
        card.className = "rounded-lg border bg-red-100 p-4";
        const title = document.createElement("h2");
        title.className = "font-semibold";
        title.textContent = product.name ?? "Produit";
        const price = document.createElement("p");
        price.textContent = `Prix : ${product.price ?? "—"}`;
        const categoryText = document.createElement("p");
        categoryText.textContent = `Catégorie : ${product.category ?? "—"}`;
        const stock = document.createElement("p");
        stock.textContent = `Stock : ${product.stock ?? "—"}`;
        card.append(title, price, categoryText, stock);
        if (product.image) {
          const image = document.createElement("img");
          image.className = "mt-3 h-40 w-full rounded-lg object-contain";
          image.src = product.image;
          image.alt = product.name ?? "";
          card.append(image);
        }
        card.draggable = true;
        card.addEventListener("dragstart", (event) => {
          event.dataTransfer.setData("productId", String(product.id ?? product.name))
        })
        
        const add = document.createElement("button");
        add.type = "button";
        add.className = "mt-3 rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700";
        add.textContent = "Ajouter au panier";
        add.addEventListener("click", () => {
         ajouterAuPanier(product)
        });
        card.append(add);
        container.append(card);
      });
    }
    numberPage.textContent = totalPages ? `${currentPage} / ${totalPages}` : "0 / 0";
    btnBack.disabled = currentPage <= 1;
    btnNext.disabled = currentPage >= totalPages;
  }

  function handleProductDrop(event) {
    event.preventDefault();
    const productId = event.dataTransfer.getData("productId");
    const product = products.find((item) => String(item.id ?? item.name) === productId);
    if (!product) return;
    ajouterAuPanier(product);
    dialog?.showModal();
  }

  const dialog = document.getElementById("panier");
  const openPanier = document.getElementById("openPanier");
  [cartItems, openPanier, dialog].filter(Boolean).forEach((dropZone) => {
    dropZone.addEventListener("dragover", (event) => event.preventDefault());
    dropZone.addEventListener("drop", handleProductDrop);
  });
  btnBack.addEventListener("click", () => { if (currentPage > 1) { currentPage--; render(); } });
  btnNext.addEventListener("click", () => {
    const category = select.value;
    const search = nameProduct.value.trim().toLowerCase();
    const count = products.filter((p) => (!category || category === "all" || p.category === category) && String(p.name ?? "").toLowerCase().includes(search)).length;
    if (currentPage < Math.ceil(count / itemsPerPage)) { currentPage++; render(); }
  });
  select.addEventListener("change", () => { currentPage = 1; render(); });
  nameProduct.addEventListener("input", () => { currentPage = 1; render(); });
  render();
  afficherPanier();
  openPanier.addEventListener("click", () => dialog.showModal());
  document.getElementById("ClosePanier").addEventListener("click", () => dialog.close());
  
}






