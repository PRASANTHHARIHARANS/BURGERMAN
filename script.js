/*=========================================================
 BURGERMAN SELF ORDERING KIOSK

 script.js

 PART 1A

 Global Variables
 Storage Keys
 Burger Database

=========================================================*/



/*=========================================================
 LOCAL STORAGE KEYS
=========================================================*/


const CART_KEY = "cart";


const ORDER_KEY = "burgerOrders";


const DELIVERY_KEY = "deliveryMode";


const PAYMENT_KEY = "paymentMethod";


const TOKEN_KEY = "currentToken";





/*=========================================================
 APPLICATION CONSTANTS
=========================================================*/


const GST_RATE = 0.05;





/*=========================================================
 GLOBAL VARIABLES
=========================================================*/


let cart = [];


let burgerOrders = [];


let deliveryMode = "Dine-In";


let paymentMethod = "";



let currentCategory = "all";






/*=========================================================
 BURGER MENU DATABASE

 category values:

 veg
 non-veg

=========================================================*/


const burgers = [



{
    id:1,

    name:"Classic Veg Burger",

    category:"veg",

    price:180,

    image:"image/veg-burger.jpg",

    description:
    "Fresh vegetable patty with lettuce, tomato and special sauce."

},



{
    id:2,

    name:"Cheese Veg Burger",

    category:"veg",

    price:200,

    image:"image/cheese-veg-burger.jpg",

    description:
    "Loaded cheese burger with crispy vegetables."

},




{
    id:3,

    name:"Paneer Supreme Burger",

    category:"veg",

    price:240,

    image:"image/paneer-burger.jpg",

    description:
    "Grilled paneer patty with spicy mint sauce."

},




{
    id:4,

    name:"Mushroom Swiss Burger",

    category:"veg",

    price:440,

    image:"image/Mushroom-Swiss-Burger.jpg",

    description:
    "Premium mushroom burger with cheese and herbs."

},




{
    id:5,

    name:"Vegan BBQ Tofu Burger",

    category:"veg",

    price:420,

    image:"image/tofu-burger.jpg",

    description:
    "Healthy tofu patty with smoky BBQ flavour."

},


{
    id:6,

    name:"Egg-Humus Veggie Burger",

    category:"veg",

    price:420,

    image:"image/Egg-Plant-Burger.jpg",

    description:
    "Healthy Egg Plant cheese filled with garlic flavour."

},

{
    id:7,

    name:"Portobello Burger",

    category:"veg",

    price:480,

    image:"image/portobello.jpg",

    description:
    "Grill Thrill Vegan Style"

},

{
    id:1,

    name:"Classic Chicken Burger",

    category:"non-veg",

    price:220,

    image:"image/classic-chicken-burger.jpg",

    description:
    "Juicy chicken patty with fresh vegetables."

},




{
    id:2,

    name:"Grilled Chicken Burger",

    category:"non-veg",

    price:260,

    image:"image/grilled-chicken.jpg",

    description:
    "Grilled chicken with cheese and signature sauce."

},




{
    id:3,

    name:"Double Chicken Burger",

    category:"non-veg",

    price:320,

    image:"image/double-chicken.jpg",

    description:
    "Double chicken patties with extra cheese."

},





{
    id:4,

    name:"Chicken Kebab Burger",

    category:"non-veg",

    price:300,

    image:"image/chicken-kebab-burger.jpg",

    description:
    "Tandoori kebab style chicken burger."

},





{
    id:5,

    name:"Fish Burger",

    category:"non-veg",

    price:320,

    image:"image/Fish-burger.jpg",

    description:
    "Crispy fish fillet burger with mayo."

},




{
    id:6,

    name:"Smash Burger",

    category:"non-veg",

    price:360,

    image:"image/smash-burger.jpg",

    description:
    "Premium smashed patty with cheddar cheese."

}


];






/*=========================================================
 END OF PART 1A
=========================================================*/
/*=========================================================
 BURGERMAN SELF ORDERING KIOSK

 script.js

 PART 1B

 Local Storage
 Cart Management
 Quantity Controls

=========================================================*/





/*=========================================================
 LOAD APPLICATION DATA
=========================================================*/


function loadStorage(){

   let cart = [];
   


    burgerOrders =
    JSON.parse(
        localStorage.getItem("burgerOrders")
    ) || [];


    deliveryMode =
    localStorage.getItem("deliveryMode")
    || "Dine-In";


    paymentMethod =
    localStorage.getItem("paymentMethod")
    || "";

}








/*=========================================================
 SAVE CART
=========================================================*/


function saveCart(){


    localStorage.setItem(

        CART_KEY,

        JSON.stringify(cart)

    );

showCartDialog(
    name + " added to your cart"
);
}








/*=========================================================
 SAVE ORDERS
=========================================================*/


function saveOrders(){


    localStorage.setItem(

        ORDER_KEY,

        JSON.stringify(burgerOrders)

    );


}








/*=========================================================
 SAVE DELIVERY MODE
=========================================================*/


function saveDeliveryMode(){


    localStorage.setItem(

        DELIVERY_KEY,

        deliveryMode

    );


}








/*=========================================================
 SAVE PAYMENT METHOD
=========================================================*/


function savePaymentMethod(){


    localStorage.setItem(

        PAYMENT_KEY,

        paymentMethod

    );


}








/*=========================================================
 ADD TO CART

 Called from menu cards

 addToCart(name,price)

=========================================================*/


/*=========================================
 ADD TO CART
 Stores image + name + price + quantity
=========================================*/


/*=========================================
 ADD TO CART - FINAL SYNCHRONIZED VERSION
=========================================*/


/*=========================================
 FINAL ADD TO CART FUNCTION
 Compatible with menu.html
=========================================*/


function addToCart(id){


    let burger;



    // If ID is received from dynamic cards

    if(typeof id === "number"){


        burger = burgers.find(

            item => item.id === id

        );


    }



    // Compatibility with old manual cards

    else{


        burger = burgers.find(

            item => item.name === id

        );


    }





    if(!burger){


        console.log(
            "Burger data missing"
        );


        return;


    }






    let existing = cart.find(

        item => item.id === burger.id

    );





    if(existing){


        existing.quantity++;


    }

    else{


        cart.push({


            id:burger.id,


            name:burger.name,


            price:burger.price,


            image:burger.image,


            quantity:1


        });


    }





    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );






    alert(

        burger.name +

        " added to your cart"

    );



}



/*=========================================
 CART SUCCESS DIALOG
=========================================*/


function showCartDialog(message){


    const dialog =
    document.createElement("div");


    dialog.className =
    "cart-dialog";



    dialog.innerHTML = `


    <div class="dialog-box">


        <h3>

        ✅ Success

        </h3>



        <p>

        ${message}

        </p>



        <button

        onclick="closeCartDialog(this)">


        OK


        </button>


    </div>


    `;



    document.body.appendChild(dialog);



}





function closeCartDialog(button){


    const dialog =

    button.closest(".cart-dialog");



    if(dialog){

        dialog.remove();

    }


}





/*=========================================================
 INCREASE QUANTITY
=========================================================*/


function increaseQuantity(index){



    cart[index].quantity += 1;



    saveCart();



    renderCart();



}








/*=========================================================
 DECREASE QUANTITY
=========================================================*/


function decreaseQuantity(index){



    cart[index].quantity -= 1;




    if(cart[index].quantity <=0){



        cart.splice(

            index,

            1

        );


    }




    saveCart();



    renderCart();



}








/*=========================================================
 REMOVE CART ITEM
=========================================================*/


function removeItem(index){



    cart.splice(

        index,

        1

    );





    saveCart();



    renderCart();



}








/*=========================================================
 CLEAR CART
=========================================================*/


function clearCart(){



    cart = [];



    saveCart();



}








/*=========================================================
 CART COUNT
=========================================================*/


function getCartCount(){



    return cart.reduce(

        function(total,item){



            return total +

            item.quantity;



        },

        0

    );



}








/*=========================================================
 TOAST MESSAGE

 Replacement for alert popup

=========================================================*/


function showToast(message){



    let oldToast =

    document.querySelector(

        ".toast"

    );





    if(oldToast){


        oldToast.remove();


    }







    let toast =

    document.createElement(

        "div"

    );





    toast.className =

    "toast";





    toast.innerText =

    message;





    document.body.appendChild(

        toast

    );







    setTimeout(

        function(){


            toast.remove();


        },

        2000

    );



}









/*=========================================================
 END OF PART 1B
=========================================================*/
/*=========================================================
 BURGERMAN SELF ORDERING KIOSK

 script.js

 PART 2A

 Menu Rendering
 Category Filtering
 Burger Cards

=========================================================*/






/*=========================================================
 CREATE BURGER CARD
=========================================================*/


function createBurgerCard(burger){



    return `



    <div class="card ${burger.category}">





        <img

        src="${burger.image}"

        class="burger-image"

        alt="${burger.name}">






        <div class="card-body">






            <h3>

            ${burger.name}

            </h3>






            <p>

            ${burger.description}

            </p>








            <div class="price">

            ₹${burger.price}

            </div>








            <button

            class="add-cart-btn"

            onclick="addToCart('${burger.id})">



                Add To Cart



            </button>







        </div>





    </div>



    `;



}









/*=========================================================
 RENDER MENU

 category:

 all
 veg
 non-veg

=========================================================*/


function renderMenu(category="all"){





    const menuGrid =

    document.getElementById(

        "menuGrid"

    );






    if(!menuGrid)

    return;






    menuGrid.innerHTML = "";







    let menuItems = burgers;









    if(category !== "all"){



        menuItems =

        burgers.filter(



            burger =>

            burger.category === category



        );



    }







    if(menuItems.length === 0){



        menuGrid.innerHTML = `



        <div class="empty-menu">


            <h2>

            No Burgers Available

            </h2>



            <p>

            Please select another category

            </p>



        </div>



        `;



        return;



    }









    menuItems.forEach(



        burger=>{



            menuGrid.innerHTML +=



            createBurgerCard(burger);



        }



    );



}









/*=========================================================
 CATEGORY BUTTON ACTIVE STATE
=========================================================*/


function setActiveCategory(button){



    const buttons =

    document.querySelectorAll(

        ".category-btn"

    );





    buttons.forEach(

        btn=>{


            btn.classList.remove(

                "active"

            );


        }

    );







    button.classList.add(

        "active"

    );



}









/*=========================================================
 FILTER MENU

 Called from menu.html buttons

 Example:

 filterMenu('veg',this)

=========================================================*/


function filterMenu(category,button){





    currentCategory = category;





    renderMenu(

        category

    );







    if(button){



        setActiveCategory(

            button

        );



    }



}









/*=========================================================
 INITIALIZE MENU PAGE
=========================================================*/


function initializeMenu(){



    renderMenu(

        currentCategory

    );



}









/*=========================================================
 MENU PAGE AUTO LOAD
=========================================================*/


document.addEventListener(

"DOMContentLoaded",



function(){





    loadStorage();






    if(

    document.getElementById(

        "menuGrid"

    )

    ){



        initializeMenu();



    }






}

);








/*=========================================================
 END OF PART 2A
=========================================================*/
/*=========================================================
 BURGERMAN SELF ORDERING KIOSK

 script.js

 PART 2B

 Cart Rendering
 Cart Calculation
 Cart Page Functions

=========================================================*/







/*=========================================================
 CALCULATE SUBTOTAL
=========================================================*/


function calculateSubtotal(){



    return cart.reduce(



        (total,item)=>



        total +

        (

            item.price *

            item.quantity

        ),



        0



    );



}








/*=========================================================
 CALCULATE GST
=========================================================*/


function calculateGST(){



    return (

        calculateSubtotal()

        *

        GST_RATE

    );



}








/*=========================================================
 CALCULATE GRAND TOTAL
=========================================================*/


function calculateTotal(){



    return (

        calculateSubtotal()

        +

        calculateGST()

    );



}









/*=========================================================
 RENDER CART PAGE
=========================================================*/


function renderCart(){





    const cartBody =

    document.getElementById(

        "cartTableBody"

    );






    if(!cartBody)

    return;








    cartBody.innerHTML="";







    if(cart.length===0){





        cartBody.innerHTML = `



        <tr>


            <td colspan="6">


                Your cart is empty



            </td>



        </tr>



        `;





        updateCartTotals();



        return;



    }








    cart.forEach(



        (item,index)=>{





        cartBody.innerHTML += `




        <tr>






            <td>



                <img



                src="${item.image || 'images/default-burger.png'}"



                class="cart-image"



                alt="${item.name}">



            </td>







            <td>



                ${item.name}



            </td>







            <td>



                ₹${item.price}



            </td>







            <td>



                <div class="quantity-box">





                <button



                class="qty-btn"



                onclick="decreaseQuantity(${index})">


                −


                </button>







                <span class="qty-value">


                ${item.quantity}


                </span>








                <button



                class="qty-btn"



                onclick="increaseQuantity(${index})">


                +


                </button>






                </div>



            </td>








            <td>



            ₹${

            item.price *

            item.quantity

            }



            </td>









            <td>



            <button



            class="remove-btn"



            onclick="removeItem(${index})">



            Remove



            </button>



            </td>








        </tr>





        `;




    }



    );






    updateCartTotals();



    updateCartBadge();



}









/*=========================================================
 UPDATE CART TOTAL DISPLAY
=========================================================*/


function updateCartTotals(){





    const subtotalElement =

    document.getElementById(

        "subtotal"

    );






    const gstElement =

    document.getElementById(

        "gst"

    );






    const totalElement =

    document.getElementById(

        "grandTotal"

    );









    if(subtotalElement){



        subtotalElement.innerText =



        "₹" +

        calculateSubtotal()

        .toFixed(2);



    }







    if(gstElement){



        gstElement.innerText =



        "₹" +

        calculateGST()

        .toFixed(2);



    }








    if(totalElement){



        totalElement.innerText =



        "₹" +

        calculateTotal()

        .toFixed(2);



    }



}









/*=========================================================
 UPDATE CART BADGE
=========================================================*/


function updateCartBadge(){



    const badge =

    document.getElementById(

        "cartBadge"

    );






    if(badge){



        badge.innerText =

        getCartCount();



    }



}









/*=========================================================
 CART PAGE INITIALIZATION
=========================================================*/


function initializeCart(){





    loadStorage();





    renderCart();





}









/*=========================================================
 AUTO LOAD CART PAGE
=========================================================*/


document.addEventListener(



"DOMContentLoaded",



function(){





    if(

    document.getElementById(

        "cartTableBody"

    )

    ){



        initializeCart();



    }





}

);








/*=========================================================
 END OF PART 2B
=========================================================*/
/*=========================================================
 BURGERMAN SELF ORDERING KIOSK

 script.js

 PART 3A

 Delivery Mode
 Payment Handling
 Order Preparation

=========================================================*/







/*=========================================================
 DELIVERY MODE
=========================================================*/



function setDeliveryMode(mode){



    deliveryMode = mode;





    saveDeliveryMode();






    updateDeliveryDisplay();



}









/*=========================================================
 UPDATE DELIVERY DISPLAY
=========================================================*/


function updateDeliveryDisplay(){





    const deliveryText =

    document.getElementById(

        "deliveryMode"

    );







    if(deliveryText){



        deliveryText.innerText =

        deliveryMode;



    }





}









/*=========================================================
 PAYMENT METHOD
=========================================================*/


function selectPayment(method){



    paymentMethod = method;





    savePaymentMethod();






    showToast(

        method +

        " selected"

    );






    togglePaymentSection(

        method

    );



}









/*=========================================================
 SHOW PAYMENT SECTION
=========================================================*/


function togglePaymentSection(method){





    const upi =

    document.getElementById(

        "upiSection"

    );





    const card =

    document.getElementById(

        "cardSection"

    );






    if(upi){



        upi.style.display="none";


    }






    if(card){



        card.style.display="none";


    }









    if(method==="UPI" && upi){



        upi.style.display="block";


    }








    if(method==="Card" && card){



        card.style.display="block";


    }




}









/*=========================================================
 LOAD PAYMENT SUMMARY
=========================================================*/


function loadPaymentSummary(){





    const paymentItems =

    document.getElementById(

        "paymentItems"

    );






    if(!paymentItems)

    return;






    paymentItems.innerHTML="";








    cart.forEach(item=>{



        paymentItems.innerHTML += `



        <div class="payment-item">



            <span>


            ${item.name}

            x ${item.quantity}


            </span>





            <span>


            ₹${

            item.price *

            item.quantity

            }


            </span>





        </div>



        `;



    });








    const totalElement =

    document.getElementById(

        "payAmount"

    );







    if(totalElement){



        totalElement.innerText =



        calculateTotal()

        .toFixed(2);



    }



}









/*=========================================================
 RESET ORDER SETTINGS
=========================================================*/


function resetOrderSettings(){



    deliveryMode =

    "Dine-In";




    paymentMethod =

    "";




    saveDeliveryMode();




    savePaymentMethod();




}









/*=========================================================
 PAYMENT PAGE INITIALIZATION
=========================================================*/


function initializePayment(){





    loadStorage();






    loadPaymentSummary();






    updateDeliveryDisplay();





}









/*=========================================================
 AUTO LOAD PAYMENT PAGE
=========================================================*/


document.addEventListener(



"DOMContentLoaded",



function(){





    if(

    document.getElementById(

        "paymentItems"

    )

    ){



        initializePayment();



    }




}

);








/*=========================================================
 END OF PART 3A
=========================================================*/
/*=========================================================
 BURGERMAN SELF ORDERING KIOSK

 script.js

 PART 3B

 Order Processing
 Token Generation
 Manager Data Sync

=========================================================*/







/*=========================================================
 GENERATE ORDER TOKEN
=========================================================*/


function generateToken(){



    let orders =



    JSON.parse(

        localStorage.getItem(ORDER_KEY)

    ) || [];







    let number =

    orders.length + 1;







    return (

        "BM" +

        String(number)

        .padStart(3,"0")

    );



}









/*=========================================================
 CURRENT DATE AND TIME
=========================================================*/


function getDateTime(){



    return new Date()

    .toLocaleString(

        "en-IN",

        {

            day:"2-digit",

            month:"2-digit",

            year:"numeric",

            hour:"2-digit",

            minute:"2-digit",

            second:"2-digit",

            hour12:true

        }

    );



}









/*=========================================================
 CREATE ORDER OBJECT
=========================================================*/


function createOrder(){



    let token =

    generateToken();






    let order = {



        token:token,



        items:[...cart],





        deliveryMode:



        deliveryMode,





        paymentMethod:



        paymentMethod,





        paymentStatus:



        "Paid",





        deliveryStatus:



        "Preparing",





        total:



        Number(

            calculateTotal()

        .toFixed(2)

        ),





        dateTime:



        getDateTime()



    };






    return order;



}









/*=========================================================
 PLACE ORDER
=========================================================*/


function placeOrder(){





    if(cart.length===0){



        showToast(

            "Cart is empty"

        );



        return;



    }









    if(paymentMethod===""){



        showToast(

            "Select payment method"

        );



        return;



    }








    let order =



    createOrder();








    burgerOrders.push(

        order

    );







    saveOrders();







    localStorage.setItem(



        TOKEN_KEY,



        order.token



    );








    clearCart();







    resetOrderSettings();








    window.location.href =

    "receipt.html";





}









/*=========================================================
 LOAD LAST ORDER
=========================================================*/


function getLastOrder(){



    let orders =



    JSON.parse(

        localStorage.getItem(ORDER_KEY)

    ) || [];







    if(orders.length===0)

    return null;







    return orders[

        orders.length-1

    ];



}









/*=========================================================
 RECEIPT PAGE DATA
=========================================================*/


function loadReceipt(){



    let order =



    getLastOrder();






    if(!order)

    return;









    let tokenElement =



    document.getElementById(

        "receiptToken"

    );






    if(tokenElement){



        tokenElement.innerText =

        order.token;



    }









    let itemsElement =



    document.getElementById(

        "receiptItems"

    );







    if(itemsElement){



        itemsElement.innerHTML="";








        order.items.forEach(item=>{



            itemsElement.innerHTML += `



            <div class="receipt-item">


                <span>

                ${item.name}

                x ${item.quantity}

                </span>




                <span>

                ₹${

                item.price *

                item.quantity

                }

                </span>



            </div>



            `;



        });



    }








    let totalElement =



    document.getElementById(

        "receiptTotal"

    );






    if(totalElement){



        totalElement.innerText =



        "₹" +

        order.total;



    }





}









/*=========================================================
 RECEIPT PAGE INITIALIZATION
=========================================================*/


document.addEventListener(



"DOMContentLoaded",



function(){





    if(

    document.getElementById(

        "receiptToken"

    )

    ){



        loadReceipt();



    }





}

);









/*=========================================================
 END OF PART 3B
=========================================================*/
/*=========================================================
 BURGERMAN SELF ORDERING KIOSK

 script.js

 PART 4

 Navigation
 Common Functions
 Final Initialization

=========================================================*/







/*=========================================================
 PAGE NAVIGATION
=========================================================*/



function goToHome(){


    window.location.href =

    "index.html";


}








function goToMenu(){


    window.location.href =

    "menu.html";


}








function goToCart(){


    window.location.href =

    "cart.html";


}








function goToPayment(){


    window.location.href =

    "payment.html";


}








function goToReceipt(){


    window.location.href =

    "receipt.html";


}








function goToManager(){


    window.location.href =

    "manager.html";


}








function goBackManager(){


    window.location.href =

    "manager.html";


}









/*=========================================================
 CART EMPTY CHECK
=========================================================*/


function cartIsEmpty(){


    return cart.length === 0;


}









/*=========================================================
 FORMAT CURRENCY
=========================================================*/


function formatCurrency(amount){


    return (

        "₹" +

        Number(amount)

        .toFixed(2)

    );


}









/*=========================================================
 UPDATE CART BADGE

 Used on menu/cart pages

=========================================================*/


function updateCartBadge(){



    const badge =



    document.getElementById(

        "cartBadge"

    );






    if(!badge)

    return;








    badge.innerText =



    getCartCount();



}









/*=========================================================
 RESET PAYMENT
=========================================================*/


function resetPayment(){



    paymentMethod="";



    savePaymentMethod();



}









/*=========================================================
 RESET DELIVERY
=========================================================*/


function resetDelivery(){



    deliveryMode="Dine-In";



    saveDeliveryMode();



}









/*=========================================================
 INITIAL APPLICATION LOAD
=========================================================*/


document.addEventListener(



"DOMContentLoaded",



function(){






    loadStorage();







    updateCartBadge();








    /*
       Menu Page
    */


    if(

    document.getElementById(

        "menuGrid"

    )

    ){


        initializeMenu();


    }








    /*
       Cart Page
    */


    if(

    document.getElementById(

        "cartTableBody"

    )

    ){


        initializeCart();


    }








    /*
       Payment Page
    */


    if(

    document.getElementById(

        "paymentItems"

    )

    ){


        initializePayment();


    }








    /*
       Receipt Page
    */


    if(

    document.getElementById(

        "receiptToken"

    )

    ){


        loadReceipt();


    }





});








/*=========================================================
 END OF SCRIPT.JS

 ALL PARTS COMPLETE

=========================================================*/