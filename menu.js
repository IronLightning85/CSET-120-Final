function addItem(itemName, price, imgLink)
{
    console.log("TRIGGERED")
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
    console.log("BUTTON EDITED:", menuRow.getElementsByClassName("btn-primary")[0])
    menuRow.getElementsByClassName("btn-primary")[0].addEventListener('click', () => {addToCart(itemName, price, imgLink)})
}

function addToCart(itemName, price, imgLink)
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
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `
    cartRow.innerHTML = cartRowContents
    cartItem.append(cartRow)
    console.log("BUTTON EDITED:", cartRow.getElementsByClassName("btn-danger")[0])
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener('click', () => {removeItem(itemName, price, imgLink)})
}

function purchaseClicked()
{
    alert("Your order has been placed")
    var cartItems = document.getElementsByClassName("cart-items")[0]
    while (cartItems.hasChildNodes())
    {
        cartItems.removeChild(cartItems.firstChild)
    }
}

function removeItem(itemName, price, imgLink)
{
    console.log("removeItem Activated:", itemName, price, imgLink)
}