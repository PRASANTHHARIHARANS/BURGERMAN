/* =====================================
   BURGERMAN MANAGER MODULE
   manager.js
===================================== */


// Load manager dashboard when page opens

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadDashboard();

    }
);



// ===============================
// Get Orders
// ===============================

function getOrders(){

    return JSON.parse(
        localStorage.getItem("burgerOrders")
    ) || [];

}



// ===============================
// Dashboard Loading
// ===============================

function loadDashboard(){


    const orders = getOrders();


    let totalSales = 0;

    let pending = 0;

    let completed = 0;



    orders.forEach(order => {


        totalSales += Number(order.total) || 0;



        if(
            order.deliveryStatus === "Completed"
        ){

            completed++;

        }
        else{

            pending++;

        }


    });



    document.getElementById(
        "totalOrders"
    ).innerText = orders.length;



    document.getElementById(
        "totalSales"
    ).innerText =
    "₹" + totalSales;



    document.getElementById(
        "pendingOrders"
    ).innerText = pending;



    document.getElementById(
        "completedOrders"
    ).innerText = completed;



    loadRecentOrders();


}




// ===============================
// Recent Orders Table
// ===============================

function loadRecentOrders(){


    const tbody =
    document.getElementById(
        "recentOrdersBody"
    );


    if(!tbody)
        return;



    tbody.innerHTML = "";



    const orders = getOrders();



    orders
    .slice()
    .reverse()
    .slice(0,5)
    .forEach(order => {



        let itemList = "";



        order.items.forEach(item => {


            itemList +=
            `${item.name} x ${item.quantity}<br>`;


        });



        tbody.innerHTML += `


        <tr>

            <td>
                ${order.token}
            </td>


            <td>
                ${itemList}
            </td>


            <td>
                ${order.deliveryMode}
            </td>


            <td>
                ${order.paymentMethod}
            </td>


            <td>
                ₹${order.total}
            </td>


            <td>
                ${order.deliveryStatus}
            </td>


        </tr>


        `;


    });


}




// ===============================
// Open Order Page
// ===============================

function openOrders(){

    window.location.href =
    "order.html";

}



// ===============================
// Open Transaction Page
// ===============================

function openTransactions(){

    window.location.href =
    "transaction.html";

}



// ===============================
// Refresh Dashboard
// ===============================

function refreshManagerData(){

    loadDashboard();

    alert(
        "Manager data refreshed"
    );

}




// ===============================
// Update Order Status
// ===============================

function updateOrderStatus(
    token,
    newStatus
){



    let orders = getOrders();



    orders =
    orders.map(order => {



        if(
            order.token === token
        ){

            order.deliveryStatus =
            newStatus;

        }



        return order;


    });



    localStorage.setItem(
        "burgerOrders",
        JSON.stringify(orders)
    );



}




// ===============================
// Transaction Data
// ===============================

function loadTransactions(){


    return getOrders()
    .map(order => ({


        token:
        order.token,


        paymentMethod:
        order.paymentMethod,


        paymentStatus:
        order.paymentStatus,


        total:
        order.total,


        dateTime:
        order.dateTime



    }));


}




// ===============================
// Logout
// ===============================

function logoutManager(){


    window.location.href =
    "index.html";


}