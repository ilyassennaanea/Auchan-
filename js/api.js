export async function appi() {
  const response = await fetch("./data/data.json");
  if (!response.ok) throw new Error(`Erreur chargement produits : ${response.status}`);
  const data = await response.json();
  localStorage.setItem("data", JSON.stringify(data));
  return data;
}
