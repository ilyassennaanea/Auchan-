import {api} from "./api.js"

const itemsPerPage=8;
let currentPage=1;
const contaire = document.getElementById('catalogue')
const btnNext= document.getElementById('scrol-next')
const bntBack = document.getElementById('scrol-back')
const NumberPage= document.getElementById('number-page')
const select = document.getElementById('cataloge')
const NameProduct= document.getElementById('NameRecherche')
 
const data = JSON.parse(localStorage.getItem('data'))||[];
export function afficher(){
function render (){
      contaire.innerHTML=''
      const start=(currentPage-1)*itemsPerPage;
      let filtredProducts= FiltrerProducts(data,select.value )
      filtredProducts= RechercherProducts(filtredProducts,NameProduct.value);
      const pageItems=filtredProducts.slice(start,start+itemsPerPage)

      pageItems.map(product =>{
         let card = document.createElement('div');
         card.innerHTML = ` <h2>${product.name}</h2>
                 <p>le prix: ${product.price}</p>
                <p>la catègory: ${product.category}</p>
                 <p>la quantité en stock: ${product.stock}</p>
                <img class=' w-50' src="${product.image}" alt="">
               `
          card.setAttribute("", "democlass"); 
               card.classList.add("border", "m-4", "p-4", "bg-red-100", "w-fit")
              contaire.append(card)
      })
      let totalpage = 
    NumberPage.textContent=currentPage;
    bntBack.disabled = currentPage===1;
    btnNext.disabled = currentPage >= Math.ceil(data.length/itemsPerPage)   
    }
    bntBack.addEventListener('click',()=>{
      if(currentPage>1){
        currentPage--
        render()
      }
    })
    btnNext.addEventListener('click',()=>{
        if (currentPage < Math.ceil(data.length / itemsPerPage)){
        currentPage++
        render()
    }

})
    select.addEventListener("change",()=>{
        currentPage =1
        render()
    } )
    NameProduct.addEventListener('input',()=>{
      currentPage=1;
      render();
    })
render()
}
api()
function FiltrerProducts(data,category){
return data.filter((produit)=>{
    return category==='all'|| category===produit.category;
})
}
function RechercherProducts(data,search){
return data.filter((produit)=>{
  return produit.name.toLowerCase().startsWith(search.toLowerCase())
})
}
const cardPanier=document.getElementById('Panier');
const ButtonClosePanier=document.getElementById('ClosePanier')
const ButtonPanier= document.getElementById('openPanier');
ButtonPanier.addEventListener('click',()=>{
    cardPanier.show()
})
ButtonClosePanier.addEventListener('click',()=>{
  cardPanier.close()
})
