/*====================================================
 BURGERMAN YOUR ORDER LIST
====================================================*/


const burgerMenu = [


{
id:101,
name:"Veg Supreme Burger",
category:"veg",
price:120,
image:"assets/veg-supreme.png"
},



{
id:102,
name:"Paneer Cheese Burger",
category:"veg",
price:150,
image:"assets/paneer-burger.png"
},



{
id:103,
name:"Classic Veg Burger",
category:"veg",
price:100,
image:"assets/cheese-burger.png"
},





{
id:104,
name:"Chicken Crispy Burger",
category:"nonveg",
price:180,
image:"assets/chicken-burger.png"
},



{
id:105,
name:"Spicy Chicken Burger",
category:"nonveg",
price:200,
image:"assets/crispy-chicken.png"
},



{
id:106,
name:"BBQ Chicken Burger",
category:"nonveg",
price:220,
image:"assets/bbq-chicken.png"
}


];





// Existing Cart
let cart =
JSON.parse(
localStorage.getItem("cart")
)
||
[];








// DISPLAY MENU


function displayMenu(type)
{


let container =
document.getElementById(
"burgerContainer"
);



if(!container)
return;



container.innerHTML="";



let items;



if(type=="all")
{

items=burgerMenu;

}

else
{

items =
burgerMenu.filter(
burger =>
burger.category==type
);

}






items.forEach(burger=>{


container.innerHTML +=`



<div class="burger-card">



<img src="${burger.image}">



<h2>

${burger.name}

</h2>



<p class="burger-price">

₹ ${burger.price}

</p>





<button class="add-cart-btn"

onclick="addToCart(${burger.id})">

ADD TO CART

</button>



</div>



`;



});



}










// ADD TO CART


function addToCart(id)
{


let selectedBurger =
burgerMenu.find(
item =>
item.id===id
);





let existing =
cart.find(
item =>
item.id===id
);





if(existing)
{

existing.quantity++;

}

else
{


cart.push({


id:selectedBurger.id,

name:selectedBurger.name,

image:selectedBurger.image,

price:selectedBurger.price,

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
document.getElementById(
"cartPopup"
);



if(popup)
{

popup.style.display="flex";

}


}





function closePopup()
{


document.getElementById(
"cartPopup"
)
.style.display="none";


}








// OPEN CART


function openCart()
{


window.location.href=
"cart.html";


}








// LOAD MENU WHEN PAGE OPENS


window.addEventListener(

"load",

()=>{


if(
document.getElementById(
"burgerContainer"
)
)

{

displayMenu("all");

}



}

);
/*====================================================
 CART PAGE FUNCTIONS
====================================================*/



function loadCart()
{


let body =
document.getElementById("cartBody");



if(!body)
return;



let cart =
JSON.parse(localStorage.getItem("cart")) || [];



body.innerHTML="";



let total=0;



cart.forEach((item,index)=>{


let amount =
item.price * item.quantity;



total += amount;



body.innerHTML +=`


<tr>


<td>
${index+1}
</td>



<td>

<img src="${item.image}">

</td>



<td>
${item.name}
</td>




<td>


<div class="quantity-box">


<button onclick="decreaseQty(${item.id})">
-
</button>



<span>
${item.quantity}
</span>



<button onclick="increaseQty(${item.id})">
+
</button>


</div>


</td>





<td>
₹ ${item.price}
</td>



<td>
₹ ${amount}
</td>



<td>

<button class="remove-btn"
onclick="removeItem(${item.id})">

Remove

</button>

</td>



</tr>


`;



});



document.getElementById("totalAmount")
.innerHTML =
"Total : ₹ "+total;



}





// INCREASE


function increaseQty(id)
{


let cart =
JSON.parse(localStorage.getItem("cart"));



let item =
cart.find(x=>x.id===id);



item.quantity++;



localStorage.setItem(
"cart",
JSON.stringify(cart)
);



loadCart();


}





// DECREASE


function decreaseQty(id)
{


let cart =
JSON.parse(localStorage.getItem("cart"));



let item =
cart.find(x=>x.id===id);



if(item.quantity>1)
{

item.quantity--;

}

else
{

cart =
cart.filter(
x=>x.id!==id
);

}



localStorage.setItem(
"cart",
JSON.stringify(cart)
);



loadCart();


}







// REMOVE


function removeItem(id)
{


let cart =
JSON.parse(localStorage.getItem("cart"));



cart =
cart.filter(
item=>item.id!==id
);



localStorage.setItem(
"cart",
JSON.stringify(cart)
);



loadCart();


}








// DELIVERY MODE


function changeDelivery()
{


let slider =
document.getElementById(
"deliverySlider"
);



let mode;



if(slider.value==1)
{

mode="Takeaway";

}

else
{

mode="Dine-In";

}




localStorage.setItem(
"deliveryMode",
mode
);



document.getElementById(
"deliveryText"
)
.innerHTML =
mode+" Selected";


}






function continueShopping()
{

window.location.href="menu.html";

}





function goPayment()
{


window.location.href="payment.html";


}






// LOAD CART AUTOMATICALLY


window.addEventListener(
"load",
loadCart
);
/*====================================================
 PAYMENT FUNCTIONS
====================================================*/


let selectedPayment="";




// SELECT PAYMENT METHOD


function selectPayment(method)
{


selectedPayment=method;



localStorage.setItem(
"paymentMethod",
method
);



let message =
document.getElementById(
"paymentMessage"
);




if(method==="UPI")
{


message.innerHTML = `


<p>
Scan QR Code To Pay
</p>


<img src="assets/upi-qr.png">


`;



}





else if(method==="CARD")
{


message.innerHTML = `


<p>
Insert Your Card In The Machine Below
</p>


`;



}





else if(method==="CASH")
{


message.innerHTML = `


<p>
Pay In Cash At The Counter
</p>


`;



}



}







// COMPLETE PAYMENT


function makePayment()
{


if(selectedPayment==="")
{

alert(
"Please Select Payment Method"
);

return;

}





localStorage.setItem(
"paymentStatus",
selectedPayment==="CASH"
?
"Pending"
:
"Paid"
);





window.location.href=
"receipt.html";



}
/*====================================================
 RECEIPT GENERATION
====================================================*/



function generateToken()
{


let number =
Math.floor(
1000 + Math.random()*9000
);



return "BG"+number;


}







function loadReceipt()
{


let box =
document.getElementById(
"receiptBox"
);



if(!box)
return;





let cart =
JSON.parse(
localStorage.getItem("cart")
)
|| [];




let payment =
localStorage.getItem(
"paymentMethod"
)
|| "Not Selected";





let status =
localStorage.getItem(
"paymentStatus"
)
|| "Pending";





let delivery =
localStorage.getItem(
"deliveryMode"
)
|| "Dine-In";





let token =
generateToken();





let total=0;



let rows="";





cart.forEach((item,index)=>{


let amount =
item.price * item.quantity;


total+=amount;



rows +=`


<tr>


<td>
${index+1}
</td>


<td>

<img src="${item.image}">

</td>


<td>
${item.name}
</td>


<td>
${item.quantity}
</td>


<td>
₹ ${amount}
</td>



</tr>


`;



});








box.innerHTML=`



<div class="receipt-container">



<div class="receipt-info">


<h2>
Token ID : ${token}
</h2>



<p>
Payment Mode :
${payment}
</p>



<p>
Payment Status :
${status}
</p>



<p>
Delivery Mode :
${delivery}
</p>



</div>






<table class="receipt-table">


<thead>

<tr>

<th>
Order No
</th>


<th>
Image
</th>


<th>
Burger
</th>


<th>
Units
</th>


<th>
Amount
</th>


</tr>


</thead>


<tbody>


${rows}


</tbody>



</table>





<h2 style="text-align:center;margin-top:30px">

Total Amount :
₹ ${total}

</h2>



</div>



`;






saveOrder(

token,

cart,

total,

payment,

status,

delivery

);






}





// SAVE ORDER FOR MANAGER


function saveOrder(
token,
cart,
total,
payment,
status,
delivery
)

{


let orders =
JSON.parse(
localStorage.getItem(
"burgerOrders"
)
)
|| [];





let order={


token:token,

items:cart,

total:total,

payment:payment,

status:status,

delivery:delivery,


time:
new Date()
.toLocaleString()


};





orders.push(order);





localStorage.setItem(

"burgerOrders",

JSON.stringify(orders)

);



}








// PRINT


function printReceipt()
{

window.print();

}








// NEW CUSTOMER ORDER


function newOrder()
{


localStorage.removeItem(
"cart"
);


localStorage.removeItem(
"paymentMethod"
);


localStorage.removeItem(
"paymentStatus"
);


localStorage.removeItem(
"deliveryMode"
);




window.location.href=
"index.html";


}








window.addEventListener(
"load",
loadReceipt
);
