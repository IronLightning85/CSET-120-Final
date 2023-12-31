// this file is strictly for displaying history
// menu.js is still called in history.html to make sure the user is still logged in etc...


// get info, array of date/time and items, user
let user = localStorage.getItem("user");
user = user + "|history"

userhistory = localStorage.getItem(user);

if(!userhistory)
{
  document.getElementsByClassName("purchase_history")[0].innerHTML = `<br><h2 class="section-header" style="font-size: 50px; display: block;">You have no history to display.</h2>`;
}
else
{
  userhistory = userhistory.split('*');//an array of purchases
  for(let i = 0; i < userhistory.length; i++)
  {
      purchase = userhistory[i].split(','); //an array of the items in a purchase

      startHTML = `<div class="purchase">
      <h2 class="section-header" style="font-size: 50px; display: block;">${purchase[0]}</h2>
      <div class="wrapping">`;
      endHTML = `</div>`;

      if (userhistory.length > 1 && i + 1 != userhistory.length)
      {
        endHTML += "</div><br><hr><br><br>"
      }

      middleHTML = ``;

      for(let j = 1; j < purchase.length; j++)
      {
          itemData = purchase[j].split('|');

          itemName = itemData[0];
          itemQuantity = itemData[1];
          itemPrice = itemData[2];
          img = itemData[3];

          middleHTML += `
          <div class="item">
          <span class="shop-item-title">${itemName}</span>
          <img class="shop-item-image" src=${img}>
          <div class="shop-item-details">
            <span class="shop-item-price" style="text-align: right;">${itemPrice}</span>
            <span class="shop-item-quantity" style="text-align: left;">Quantity: ${itemQuantity}</span>
          </div>
        </div>
        <br>`
      }
      
      finalHTML = startHTML + middleHTML + endHTML;

      //get location to append html
      var newItemBought = document.createElement("div");
      var appendlocation = document.getElementsByClassName("purchase_history")[0];

      newItemBought.innerHTML = finalHTML;
      appendlocation.append(newItemBought);
}
}
