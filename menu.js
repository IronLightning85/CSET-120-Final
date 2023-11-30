// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

//sets menu at start
if(!localStorage.getItem("count"))
{
    localStorage.setItem("count", 1)
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

function showMenu()
{
    menu = localStorage.getItem("menu");
    menuArr = menu.split('*');
    for(let i = 0; i < menuArr.length; i++)
    {
        item = menuArr[i].split("|");
        //console.log(item)
        addItem(item[0], item[1], item[2], item[3]);
    }
}

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
        `
        menuRow.innerHTML = menuRowContents
        newItem.append(menuRow)
        //console.log("BUTTON EDITED:", menuRow.getElementsByClassName("btn-primary")[0])
        menuRow.getElementsByClassName("btn-primary")[0].addEventListener('click', () => {addToCart(itemName, price, imgLink)})
        }
    }
}

function addToCart(itemName, price, imgLink)
{
    let cartItems = document.getElementsByClassName("cart-items")[0];
    let inCartFlag = false;

    for (let i = 0; i < cartItems.getElementsByClassName("cart-row").length; i++) // Goes through each element and totals their cost
    {
        
        let currentObject = cartItems.getElementsByClassName("cart-row")[i]
        console.log("Current object:", currentObject)

        if (itemName == currentObject.getElementsByClassName("cart-item-title")[0].innerHTML)
        {
            alert("Item already in cart")
            inCartFlag = true;
        }
    }

    if (!inCartFlag)
    {
        console.log("addToCart Activated", itemName, price, imgLink)
        var cartRow = document.createElement("div")
        cartRow.classList.add("cart-row")
        var cartItem = document.getElementsByClassName("cart-items")[0]
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
        `
        cartRow.innerHTML = cartRowContents
        cartItem.append(cartRow)
        //console.log("BUTTON EDITED:", cartRow.getElementsByClassName("btn-danger")[0])
        cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', updatePrice)
        cartRow.getElementsByClassName("btn-danger")[0].addEventListener('click', () => {removeItem(itemName)})
    }

    updatePrice()
}

function purchaseClicked() // remove items from cart and stores them into local storage for reciet page
{
    if(document.getElementsByClassName("cart-item-title")[0])
    {
        alert("Your order has been placed")
        var cartItems = document.getElementsByClassName("cart-items")[0]
        var itemsBought = "" //a string wih values seperated by | and items seperated by *
        while (cartItems.hasChildNodes())
        {
            count = cartItems.getElementsByClassName("cart-quantity-input")[0].value;
            item = cartItems.getElementsByClassName("cart-item-title")[0].innerHTML;
            price = cartItems.getElementsByClassName("cart-price")[0].innerHTML;
            itemsBought += item + "|" + count + "|" + price + "*";

            cartItems.removeChild(cartItems.firstChild)
            
        }

        localStorage.setItem("currentReciept", itemsBought);
        updatePrice()
        
        window.location.href = "reciept.html";
    }
    else
    {
        alert("Please add an item to your cart");
    }
}

function removeItem(itemName)
{
    //console.log("removeItem Activated:", itemName, price, imgLink)
    for(let i = 1; i < document.getElementsByClassName("cart-row").length; i++)
    {
        // console.log("CURRENT ELELMENT:", document.getElementsByClassName("cart-row")[i].innerHTML)
        let x = document.getElementsByClassName("cart-row")[i]
        // console.log("X ELEMENT:", x.getElementsByClassName("cart-item-title")[0].innerHTML)
        
        if(x.getElementsByClassName("cart-item-title")[0].innerHTML === itemName)
        {
            let cartItems = document.getElementsByClassName("cart-items")[0]
            // console.log("THING TO REMOVE:", document.getElementsByClassName("cart-row")[i])
            // console.log("CART ITEMS:", cartItems.getElementsByClassName("cart-row"))
            cartItems.removeChild(cartItems.getElementsByClassName("cart-row")[i - 1])
        }
    }

    updatePrice()
}

function updatePrice()
{
    let finalPrice = 0
    //console.log("ITEMS:", document.getElementsByClassName("cart-items")[0])
    let cartItems = document.getElementsByClassName("cart-items")[0]
    //console.log(cartItems.getElementsByClassName("cart-row"))

    if (cartItems.getElementsByClassName("cart-row").length == 0) // If no elements set price to 0
    {
        document.body.getElementsByClassName("cart-total-price")[0].innerHTML = "$0.00"
    }

    for (let i = 0; i < cartItems.getElementsByClassName("cart-row").length; i++) // Goes through each element and totals their cost
    {

        let currentObject = cartItems.getElementsByClassName("cart-row")[i] // GETS PRICE OF THING
        //console.log("Current object:", currentObject)

        let price = currentObject.getElementsByTagName("span")[1].innerHTML // GETS PRICE
        //console.log("Current price:", price)

        let quantity = currentObject.getElementsByTagName("input")[0].value // GETS QUANTITY
        //console.log("Current quantity:", quantity)

        if (quantity == 0)
        {
            removeItem(currentObject.getElementsByClassName("cart-item-title")[0].innerHTML)
        }

        finalPrice += parseFloat(price.replace("$", "") * quantity) // REMOVE THE $ SIGN AND MULTIPLY BY QUANTITY
        console.log("FINAL:", finalPrice)

        document.body.getElementsByClassName("cart-total-price")[0].innerHTML = formatter.format(finalPrice)
    }
}

// manager page js

//set form html
function addItemForm()
{
    let setForm = document.getElementsByClassName("formInputs")[0];
    setForm.innerHTML = '<form><label>Item Name: </label>  <input id="newItemName" name="newItemName" type="text" placeholder="Veggie Soup...." required=""><br><br><label>Price: </label>  <input id="newItemPrice" name="newItemPrice" type="text" placeholder="3.75..." required=""><br><br><label>Image Link: </label>  <input id="newItemLink" name="newItemLink" type="text" placeholder="image.jpg..." required=""><br><br><label>Item Description: </label>  <input id="newItemDesc" name="newItemDesc" type="text" placeholder="A warm soup made with..." required=""><br><br><button onclick="addItemSubmit()">Submit</button></form>'
}

function editItemForm()
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
                addEditorItem(item[0], item[1], item[2], item[3]);
            }
        }
    }
}

function addEditorItem(itemName, price, imgLink, itemInfo) //Puts the item in an editor format for the manager
{
    if (localStorage.getItem("menu").length > 0)
    {
        var menuRow = document.createElement("div")
        menuRow.classList.add("edit-row")
        var newItem = document.getElementsByClassName("formInputs")[0]
        var menuRowContents = `
            <div class = "smallWordDiv">
                <h2>${itemName}</h2>
                <img class="mini-Image" src="${imgLink}">
                <br>
                <p>${price}<p>
                <br>
                <p>${itemInfo}<p>
            </div>
            <br>
            <form onsubmit = "return false"><label>Item Name: </label>  <input id="newItemName" name="newItemName" type="text" placeholder="Item name...">
            <br><br>
            <label>Price: </label>  <input id="newItemPrice" name="newItemPrice" type="text" placeholder=${price}>
            <br><br>
            <label>Image Link: </label>  <input id="newItemLink" name="newItemLink" type="text" placeholder="Image Link...">
            <br><br>
            <label>Item Description: </label>  <input id="newItemDesc" name="newItemDesc" type="text" placeholder="Description...">
            <br><br>
            <button class="editButton">Save Changes</button></form>
            <br><br>
        `
        menuRow.innerHTML = menuRowContents
        newItem.append(menuRow)
        menuRow.getElementsByClassName("editButton")[0].addEventListener('click', () => {editItem(itemName)})
    }
}

function editItem(itemName) //Searches though the menu localstorage data too look at the item
{
    if (localStorage.getItem("menu").length > 0)
    {
        menu = localStorage.getItem("menu")
        menuSplit = menu.split('*')
        //console.log(menuArr, itemName)

        menuEditItem(itemName, menuSplit)
    }
}

function menuEditItem(itemName, menuSplit)
{
    let currentElement = ''
    let finalMenu = ''
    let newName = ''
    let newPrice = ''
    let newLink = ''
    let newDesc = ''

    for (let i = 0; i < document.getElementsByClassName("edit-row").length; i++)
    {
        currentElement = document.getElementsByClassName("edit-row")[i]
        //console.log(currentElement, currentElement.getElementsByTagName("h2")[0].innerHTML)

        if (itemName == currentElement.getElementsByTagName("h2")[0].innerHTML)
        {
            newName = currentElement.getElementsByTagName("input")[0].value
            newPrice = currentElement.getElementsByTagName("input")[1].value
            newLink = currentElement.getElementsByTagName("input")[2].value
            newDesc = currentElement.getElementsByTagName("input")[3].value
        }
    }

    for (let i = 0; i < menuSplit.length; i++)
    {

        if (menuSplit[i].split("|")[0] == itemName)
        {
            console.log("Found food!")
            
            if (newName != '')
            {
                finalMenu += newName + "|"
            }

            else
            {
                finalMenu += menuSplit[i].split("|")[0] + "|"
            }

            if (newPrice != '')
            {
                finalMenu += formatter.format(newPrice) + "|"
            }

            else
            {
                finalMenu += menuSplit[i].split("|")[1] + "|"
            }

            if (newLink != '')
            {
                finalMenu += newLink + "|"
            }

            else
            {
                finalMenu += menuSplit[i].split("|")[2] + "|"
            }

            if (newDesc != '')
            {
                finalMenu += newDesc + "|"
            }

            else
            {
                finalMenu += menuSplit[i].split("|")[3] + "*"
            }
        }

        else
        {
            finalMenu += menuSplit[i].split("|")[0] + "|" + menuSplit[i].split("|")[1] + "|" + menuSplit[i].split("|")[2] + "|" + menuSplit[i].split("|")[3] + "*"
        }
        
    }

    finalMenu = finalMenu.replace(/.$/,"")
    localStorage.setItem("menu", finalMenu)
    editItemForm()
}

function removeItemForm()
{
    let setForm = document.getElementsByClassName("formInputs")[0];
    setForm.innerHTML = '';
    console.log("MENU:", localStorage.getItem("menu"))
    if (localStorage.getItem("menu").length > 0)
    {
        menu = localStorage.getItem("menu");
        menuArr = menu.split('*');
        for(let i = 0; i < menuArr.length; i++)
        {
            item = menuArr[i].split("|");
            console.log(item)
            if (item != undefined && item != '')
            {
                addManagerItem(item[0], item[1], item[2], item[3]);
            }
        }
    }
}

function addManagerItem(itemName, price, imgLink, itemInfo)
{
    if (localStorage.getItem("menu").length > 0)
    {
        var menuRow = document.createElement("div")
        menuRow.classList.add("menu-row")
        var newItem = document.getElementsByClassName("formInputs")[0]
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
        `
        menuRow.innerHTML = menuRowContents
        newItem.append(menuRow)
        //console.log("BUTTON EDITED:", menuRow.getElementsByClassName("btn-primary")[0])
        menuRow.getElementsByClassName("btn-danger")[0].addEventListener('click', () => {removeManagerItem(itemName)})
    }
}

function removeManagerItem(itemName) // REMOVES ELEMENT FROM PAGE
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
        //console.log(currentItem)
        //console.log(i, "==", menuArr.length, "|", itemName, "!=", currentItem[0], "IS", itemName != currentItem[0])
        if (itemName != currentItem[0] && currentItem != undefined && currentItem != '')
        {
            finalString += currentItem[0] + "|" + currentItem[1] + "|" + currentItem[2] + "|" + currentItem[3] + "*"
        }
        
        if (i + 1 == menuArr.length)
        {
            finalString = finalString.replace(/.$/,"")
        }

        //console.log("FINAL STRING:", finalString)
    }

    for(let v = 0; v < document.getElementsByClassName("menu-row").length; v++)
    {
        document.getElementsByClassName("menu-row")[v].innerHTML = "";
    }

    // SET MENU IN LOCALSTORAGE
    //console.log(finalString)
    localStorage.setItem("menu", finalString)
    
    setForm = document.getElementsByClassName("formInputs")[0];
    setForm.innerHTML = '';

    console.log("MENU:", localStorage.getItem("menu"))
    if (localStorage.getItem("menu").length > 0)
    {
        menu = localStorage.getItem("menu");
        menuArr = menu.split('*');

        for(let i = 0; i < menuArr.length; i++)
        {
            item = menuArr[i].split("|");
            //console.log(item)
            addManagerItem(item[0], item[1], item[2], item[3]);
        }
    }
}

//form submits
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
    alert("New Item Added!")
}