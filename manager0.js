/*====================================================
 BURGERMAN MANAGER SCRIPT
====================================================*/


let orders =
JSON.parse(
localStorage.getItem(
"burgerOrders"
)
)
|| [];






// CURRENT ORDERS


function loadOrders()
{


let table =
document.getElementById(
"orderTable"
);



if(!table)
return;



table.innerHTML="";





orders.forEach((order,index)=>{


let items="";



order.items.forEach(item=>{


items +=
item.name+
" x "+
item.quantity+
"<br>";


});





table.innerHTML +=`


<tr>


<td>

${order.token}

</td>



<td>

${items}

</td>



<td>

${order.delivery}

</td>



<td>


<select class="status-select"
onchange="updatePayment(${index},this.value)">



<option
${order.status=="Paid"?
"selected":""}
>

Paid

</option>



<option
${order.status=="Pending"?
"selected":""}
>

Pending

</option>



</select>



<br>

${order.payment}



</td>




<td>

${order.status}

</td>




<td>


<button class="dispatch-btn"

onclick="dispatchOrder(${index})">

Dispatch Order

</button>


</td>


</tr>



`;




});


}









// CHANGE PAYMENT STATUS


function updatePayment(index,value)
{


orders[index].status=value;



localStorage.setItem(

"burgerOrders",

JSON.stringify(orders)

);


loadOrders();


}








// DISPATCH ORDER


function dispatchOrder(index)
{


orders[index].status=
"Completed";



localStorage.setItem(

"burgerOrders",

JSON.stringify(orders)

);



alert(
"Order Dispatched Successfully"
);



loadOrders();


}








// TRANSACTIONS


function loadTransactions()
{


let table =
document.getElementById(
"transactionTable"
);



if(!table)
return;



table.innerHTML="";





orders.forEach(order=>{


table.innerHTML +=`


<tr>


<td>
${order.token}
</td>



<td>
${order.time}
</td>



<td>
₹ ${order.total}
</td>



<td>
${order.payment}
</td>



<td>
${order.status}
</td>



</tr>


`;



});


}








function filterTransactions()
{


let option =
document.getElementById(
"filterDate"
).value;




let table =
document.getElementById(
"transactionTable"
);



table.innerHTML="";




let now =
new Date();




orders.forEach(order=>{


let orderDate =
new Date(order.time);




if(option==="day")
{


if(
orderDate.toDateString()
!=
now.toDateString()
)

return;


}







if(option==="month")
{


if(
orderDate.getMonth()
!=
now.getMonth()
)

return;


}







table.innerHTML +=`


<tr>


<td>
${order.token}
</td>


<td>
${order.time}
</td>


<td>
₹ ${order.total}
</td>


<td>
${order.payment}
</td>


<td>
${order.status}
</td>


</tr>


`;



});


}







window.addEventListener(
"load",
()=>{


loadOrders();

loadTransactions();


});
