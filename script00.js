/*====================================================
 BURGERMAN CUSTOMER SCRIPT
 PART 2 - MENU AND CART
====================================================*/



let burgers = [


{
id:1,
name:"Veg Supreme Burger",
category:"veg",
price:120,
image:"assets/veg-supreme.png"
},


{
id:2,
name:"Paneer Cheese Burger",
category:"veg",
price:150,
image:"assets/paneer-burger.png"
},


{
id:3,
name:"Classic Cheese Burger",
category:"veg",
price:130,
image:"assets/cheese-burger.png"
},



{
id:4,
name:"Chicken Crispy Burger",
category:"nonveg",
price:180,
image:"assets/chicken-burger.png"
},


{
id:5,
name:"Spicy Chicken Burger",
category:"nonveg",
price:200,
image:"assets/crispy-chicken.png"
},


{
id:6,
name:"BBQ Chicken Burger",
category:"nonveg",
price:220,
image:"assets/bbq-chicken.png"
}


];





let cart = JSON.parse(localStorage.getItem("cart")) || [];





// LOAD MENU

window.onload=function()
{

if(document.getElementById("burgerContainer"))
{

displayMenu("all");

}

};







function displayMenu(type)
{


let container =
document.getElementById("burgerContainer");


container.innerHTML="";



let filtered;



if(type==="all")
{

filtered=burgers;

}

else
{

filtered =
burgers.filter(
item=>item.category===type
);

}






filtered.forEach(item=>{


container.innerHTML +=`


<div class="burger-card">


<img src="${item.image}">


<h2>
${item.name}
</h2>


<p class="burger-price">
₹ ${item.price}
</p>


<button class="add-cart-btn"

onclick="addToCart(${item.id})">

ADD TO CART

</button>


</div>


`;



});


}





// ADD TO CART


function addToCart(id)
{


let burger =
burgers.find(
item=>item.id===id
);



let existing =
cart.find(
item=>item.id===id
);



if(existing)
{


existing.quantity++;

}

else
{


cart.push({

id:burger.id,

name:burger.name,

image:burger.image,

price:burger.price,

quantity:1

});


}



localStorage.setItem(
"cart",
JSON.stringify(cart)
);



showPopup();


}





// POPUP


function showPopup()
{

let popup =
document.getElementById("cartPopup");


popup.style.display="flex";


}



function closePopup()
{

document.getElementById("cartPopup")
.style.display="none";


}




// OPEN CART


function openCart()
{

window.location.href="cart.html";


}
