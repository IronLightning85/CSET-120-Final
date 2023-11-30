// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

//sends user to log in page if they are not logged in and new page is loaded
if(localStorage.getItem("isLoggedIn") != "true")
{
    window.location.href = "log_in.html"
}

//sets menu at start
if(!localStorage.getItem("count"))
{
    localStorage.setItem("count", 1);
    localStorage.setItem("menu", "Veggie Cream Soup|$3.00|images/food/Creamy Soup.JPG|This creamy soup showcases the sweetness of vegetables in a veritable taste explosion.*Nut Cake|$4.00|images/food/Nut Cake.jpeg|Forest nuts give this cake a pleasant texture and a simple, understated sweetness.*Monster Rice Balls|$3.50|images/food/BotW Monster Rice Ball.jpeg|Rice balls flavored with monster extract. Their unique aroma is not for everyone.*Mud Cookies|$2.00|images/food/mudcookie_08_copy.jpg|Despite it's inappetizing appearance, consuming it is known to give one a burst of energy and a wonderful sweet taste for hours.*Cheesy Tomatoes|$2.00|images/food/cheesyTomato_01.png|A simple dish of Hylian tomato topped with delicious Hateno cheese. A perfect snack.*Monster Lasagna|$6.00|images/food/monsterLasagna_01.jpg|A deviously flavored dish with a hint of monster meat. It's harsh ingredients arn't for the faint of stomach.*Firecap Soup|$3.50|images/food/01_FirecapSoup.jpg|Boiled and stirred to perfection, firecap soup will make the coldest days seem warm with it's iconic flaming hot sensation.*Mango Rice|$2.75|images/food/mangoRice_01.jpg|Bland and sweet. A perfect mix to make your taste buds go wild. With a mango topping there is greatness in every bite.");
}

// displays manager button
if(localStorage.getItem("isManager") == "true")
{
    let newButtonDiv = document.createElement("div");
    let location = document.getElementsByClassName("topnav")[0];
    let buttonContents = '<a href="editMenu.html"><button>Edit Menu</button></a>';
    newButtonDiv.innerHTML = buttonContents;
    location.append(newButtonDiv);
}


if(document.getElementsByClassName("shop-items")[0])
{
    showMenu();
}

if(document.getElementsByClassName("receipt")[0])
{
    // display qr codes fin receipt
    var receiptID = "20180613T130518.512Z";
    var receiptQRID = "4#4s1Fs"

    JsBarcode("#barcode", receiptID, {
        format: "code128",
        width: 1.3,
        height: 30,
        marginLeft: 0,
        displayValue: false
    });

    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: "https://gg.bronyhouse.com/r/"+receiptQRID,
        colorDark : "#000000",
        colorLight : "#ffffff",
        width : 100,
        height : 100,
        correctLevel : QRCode.CorrectLevel.H,
    }); 

    // do math in the receipt
    //get receipt
    var overallPrice = 0;
    var itemsBought1 = localStorage.getItem("currentReciept");
    itemsBought1 = itemsBought1.split("*");
    itemsBought1.pop();

    //remove duplicates(first item always appears 4 times)
    let itemsBought = [...new Set(itemsBought1)]
    console.log(itemsBought);

    for(let i = 0; i < itemsBought.length; i++)//iterate through items bought 
    {
        var newItemBought = document.createElement("div");
        newItemBought.classList.add("item")
        var appendLocaction = document.getElementsByClassName("items")[0]

        //get values to be inputted into html
        itemValues = itemsBought[i].split("|");
        var itemName = itemValues[0];
        var quantity = itemValues[1];
        var price = itemValues[2];

        // get total price or that item and add to total
        priceEdited = Number(price.replace("$", ""));
        var totalItemPrice = priceEdited * Number(quantity);
        overallPrice += totalItemPrice;
        totalItemPrice = formatter.format(totalItemPrice)

        //add to html
        newItemBoughtContents = `<div class="itemRow">
        <div class="itemName">${itemName}</div>
        <div class="itemPrice itemTaxable">${price}</div>
      </div>
      
      <div class="itemRow">
        <div class="itemColor"></div>
        <div class="itemData1">DNC-P01</div>
        <div class="itemData2">Quantity</div>
        <div class="itemData3 itemQuantity">${quantity}</div>
      </div>
      
      <div class="itemRow">
        <div class="itemColor"></div>
        <div class="itemData1">Print</div>
        <div class="itemData2">Item Total</div>
        <div class="itemData3">${totalItemPrice}</div>
      </div>`

      newItemBought.innerHTML = newItemBoughtContents;
      appendLocaction.append(newItemBought);
    }

    //get subtotal, tax and total and add to receipt
    document.getElementById("subtotal").innerHTML = formatter.format(overallPrice);
    document.getElementById("tax").innerHTML = formatter.format(overallPrice * 0.06);
    document.getElementById("total").innerHTML = formatter.format(overallPrice + overallPrice * 0.06);

}

//displays the items in the local storage menu in the menu page and edi menu page
function showMenu()
{
    menu = localStorage.getItem("menu");
    menuArr = menu.split('*');
    for(let i = 0; i < menuArr.length; i++)
    {
        item = menuArr[i].split("|");
        addItem(item[0], item[1], item[2], item[3]);
    }
}

//called by showMenu function for each item that needs to be displayed. It displays a single item with its name, image, price, and item info
function addItem(itemName, price, imgLink, itemInfo) // FIX TO NOT PUT UNDEFINED
{
    if (localStorage.getItem("menu").length > 0)
    {
        if (item != undefined && item != '')
        {
        var menuRow = document.createElement("div")
        menuRow.classList.add("menu-row")
        var newItem = document.getElementsByClassName("shop-items")[0]
        var menuRowContents = `
            <div class="shop-item">
                <span class="shop-item-title">${itemName}</span>
                <img class="shop-item-image" src="${imgLink}">
                <div class="shop-item-details">
                    <span class="shop-item-price">${price}</span>
                    <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
                </div>
                <div class="shop-item-details2">
                    <p class="shop-item-info">${itemInfo}</p>
                </div>
            </div>
        `;
          
        menuRow.innerHTML = menuRowContents;
        newItem.append(menuRow);
        menuRow.getElementsByClassName("btn-primary")[0].addEventListener('click', () => {addToCart(itemName, price, imgLink)});
        }
    }
}

//adds the item to the user's cart when the user clicks on the add to cart button
function addToCart(itemName, price, imgLink)
{
    let cartItems = document.getElementsByClassName("cart-items")[0];
    let inCartFlag = false;

    //iterate through cart to determine if item is in cart
    for (let i = 0; i < cartItems.getElementsByClassName("cart-row").length; i++)
    {
        
        let currentObject = cartItems.getElementsByClassName("cart-row")[i];

        if (itemName == currentObject.getElementsByClassName("cart-item-title")[0].innerHTML)
        {
            alert("Item already in cart");
            inCartFlag = true;
        }
    }

    //if item isnt in cart, add item to cart
    if (!inCartFlag)
    {
        var cartRow = document.createElement("div");
        cartRow.classList.add("cart-row");
        var cartItem = document.getElementsByClassName("cart-items")[0];
        var cartRowContents = `
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${imgLink}">
                <span class="cart-item-title">${itemName}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1" min=0>
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
        `;
        cartRow.innerHTML = cartRowContents;
        cartItem.append(cartRow);
        
        //add event listeners for change in quantity of items and remove items button
        cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', updatePrice);
        cartRow.getElementsByClassName("btn-danger")[0].addEventListener('click', () => {removeItem(itemName)});
    }

    updatePrice();
}

function purchaseClicked() // remove all items from cart and stores them into local storage for receipt page
{
    if(document.getElementsByClassName("cart-item-title")[0])
    {
        alert("Your order has been placed");
        var cartItems = document.getElementsByClassName("cart-items")[0];
        var itemsBought = ""; //a string wih values seperated by | and items seperated by *
        while (cartItems.hasChildNodes())
        {
            count = cartItems.getElementsByClassName("cart-quantity-input")[0].value;
            item = cartItems.getElementsByClassName("cart-item-title")[0].innerHTML;
            price = cartItems.getElementsByClassName("cart-price")[0].innerHTML;
            itemsBought += item + "|" + count + "|" + price + "*";

            cartItems.removeChild(cartItems.firstChild);
            
        }

        localStorage.setItem("currentReciept", itemsBought);
        updatePrice();
        
        window.location.href = "reciept.html";
    }
    else
    {
        alert("Please add an item to your cart");
    }
}

//removes item from the local storage menu
function removeItem(itemName)
{
    for(let i = 1; i < document.getElementsByClassName("cart-row").length; i++)
    {
        let x = document.getElementsByClassName("cart-row")[i];
        
        if(x.getElementsByClassName("cart-item-title")[0].innerHTML === itemName)
        {
            let cartItems = document.getElementsByClassName("cart-items")[0];
            cartItems.removeChild(cartItems.getElementsByClassName("cart-row")[i - 1]);
        }
    }

    updatePrice();
}

//updates total price in cart
function updatePrice()
{
    let finalPrice = 0;
    let cartItems = document.getElementsByClassName("cart-items")[0];

    if (cartItems.getElementsByClassName("cart-row").length == 0) // If no elements set price to 0
    {
        document.body.getElementsByClassName("cart-total-price")[0].innerHTML = "$0.00";
    }

    for (let i = 0; i < cartItems.getElementsByClassName("cart-row").length; i++) // Goes through each element and totals their cost
    {
        let currentObject = cartItems.getElementsByClassName("cart-row")[i]; // GETS PRICE OF THING
        let price = currentObject.getElementsByTagName("span")[1].innerHTML; // GETS PRICE
        let quantity = currentObject.getElementsByTagName("input")[0].value; // GETS QUANTITY

        if (quantity == 0)
        {
            removeItem(currentObject.getElementsByClassName("cart-item-title")[0].innerHTML);
        }

        finalPrice += parseFloat(price.replace("$", "") * quantity); // REMOVE THE $ SIGN AND MULTIPLY BY QUANTITY
        document.body.getElementsByClassName("cart-total-price")[0].innerHTML = formatter.format(finalPrice);
    }
}

// manager page js

//set form html
//changes innerhtml to add item
function addItemForm()
{
    let setForm = document.getElementsByClassName("formInputs")[0];
    setForm.innerHTML = '<form><label>Item Name: </label>  <input id="newItemName" name="newItemName" type="text" placeholder="Veggie Soup...." required=""><br><br><label>Price: </label>  <input id="newItemPrice" name="newItemPrice" type="text" placeholder="3.75..." required=""><br><br><label>Image Link: </label>  <input id="newItemLink" name="newItemLink" type="text" placeholder="image.jpg..." required=""><br><br><label>Item Description: </label>  <input id="newItemDesc" name="newItemDesc" type="text" placeholder="A warm soup made with..." required=""><br><br><button onclick="addItemSubmit()">Submit</button></form>';
}

//changes innerhtml to edit item
function editItemForm()
{
    let setForm = document.getElementsByClassName("formInputs")[0];
    setForm.innerHTML = '';
}

//changes innerhtml to remove item
function removeItemForm()
{
    let setForm = document.getElementsByClassName("formInputs")[0];
    setForm.innerHTML = '';
    if (localStorage.getItem("menu").length > 0)
    {
        menu = localStorage.getItem("menu");
        menuArr = menu.split('*');
        for(let i = 0; i < menuArr.length; i++)
        {
            item = menuArr[i].split("|");
            if (item != undefined && item != '')
            {
                addManagerItem(item[0], item[1], item[2], item[3]);
            }
        }
    }
}

//adds item to local storage
function addItemSubmit()
{
    itemName = document.getElementById("newItemName").value;
    itemPrice = document.getElementById("newItemPrice").value;
    itemLink = document.getElementById("newItemLink").value;
    itemDesc = document.getElementById("newItemDesc").value;

    itemPrice = formatter.format(itemPrice);

    menu = localStorage.getItem("menu");
    menu += '*'+ itemName + '|' + itemPrice + '|'+ itemLink +'|' + itemDesc;
    localStorage.setItem("menu", menu);
    alert("New Item Added!");
}

//displays items like showMenu() but is different because it has a remove button not add to cart
function addManagerItem(itemName, price, imgLink, itemInfo)
{
    if (localStorage.getItem("menu").length > 0)
    {
        var menuRow = document.createElement("div");
        menuRow.classList.add("menu-row");
        var newItem = document.getElementsByClassName("formInputs")[0];
        var menuRowContents = `
            <div class="shop-item">
                <span class="shop-item-title">${itemName}</span>
                <img class="shop-item-image" src="${imgLink}">
                <div class="shop-item-details">
                    <span class="shop-item-price">${price}</span>
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>
                <div class="shop-item-details2">
                    <p class="shop-item-info">${itemInfo}</p>
                </div>
            </div>
        `;
        menuRow.innerHTML = menuRowContents;
        newItem.append(menuRow);
        
        //add event listener to all remove buttons that calls removeManagerItem
        menuRow.getElementsByClassName("btn-danger")[0].addEventListener('click', () => {removeManagerItem(itemName)});
    }
}

//removes element from page and local storage
function removeManagerItem(itemName)
{
    let setForm = document.getElementsByClassName("formInputs")[0];
    setForm.innerHTML = '';
    let currentItem = "";
    let finalString = "";

    menu = localStorage.getItem("menu");
    menuArr = menu.split('*');
    for(let i = 0; i < menuArr.length; i++)
    {
        currentItem = menuArr[i].split("|");
        if (itemName != currentItem[0] && currentItem != undefined && currentItem != '')
        {
            finalString += currentItem[0] + "|" + currentItem[1] + "|" + currentItem[2] + "|" + currentItem[3] + "*";
        }
        
        if (i + 1 == menuArr.length)
        {
            finalString = finalString.replace(/.$/,"");
        }
    }

    for(let v = 0; v < document.getElementsByClassName("menu-row").length; v++)
    {
        document.getElementsByClassName("menu-row")[v].innerHTML = "";
    }

    // SET MENU IN LOCALSTORAGE
    localStorage.setItem("menu", finalString)
    
    //resets page html so that the removed element is removed
    setForm = document.getElementsByClassName("formInputs")[0];
    setForm.innerHTML = '';
    if (localStorage.getItem("menu").length > 0)
    {
        menu = localStorage.getItem("menu");
        menuArr = menu.split('*');

        for(let i = 0; i < menuArr.length; i++)
        {
            item = menuArr[i].split("|");
            addManagerItem(item[0], item[1], item[2], item[3]);
        }
    }
}
