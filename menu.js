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
    localStorage.setItem("menu", "Veggie Cream Soup,$3.00,images/food/Creamy Soup.JPG*Nut Cake,$4.00,images/food/Nut Cake.jpeg*Monster Rice Balls,$3.50,images/food/BotW Monster Rice Ball.jpeg*Mud Cookies,$2.00,images/food/mudcookie_08_copy.jpg*Cheesy Tomatoes,$2.00,images/food/cheesyTomato_01.png*Monster Lasagna,$6.00,images/food/monsterLasagna_01.jpg*Firecap Soup,$3.50,images/food/01_FirecapSoup.jpg*Mango Rice,$2.75,images/food/mangoRice_01.jpg");
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



showMenu();

function showMenu()
{
    menu = localStorage.getItem("menu");
    menuArr = menu.split('*');
    for(let i = 0; i < menuArr.length; i++)
    {
        item = menuArr[i].split(",");
        addItem(item[0], item[1], item[2]);
    }
}

function addItem(itemName, price, imgLink)
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
    `
    menuRow.innerHTML = menuRowContents
    newItem.append(menuRow)
    //console.log("BUTTON EDITED:", menuRow.getElementsByClassName("btn-primary")[0])
    menuRow.getElementsByClassName("btn-primary")[0].addEventListener('click', () => {addToCart(itemName, price, imgLink)})
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

function purchaseClicked()
{
    alert("Your order has been placed")
    var cartItems = document.getElementsByClassName("cart-items")[0]
    while (cartItems.hasChildNodes())
    {
        cartItems.removeChild(cartItems.firstChild)
    }

    updatePrice()
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

