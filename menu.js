let menu = '{ "Menu" : [' +
    '{"name":"Veggie Cream Soup", "price":"TBD", "url":"images/food/Creamy Soup.JPG"},' +
    '{"name":"Nut Cake", "price":"TBD", "url":"images/food/Nut Cake.jpeg"}, ' +
    '{"name":"Monster Rice Balls", "price":"TBD", "url":"images/food/BotW Monster Rice Ball.jpeg"}, ' +
    '{"name":"Mud Cookie", "price":"TBD", "url":"images/food/mudcookie_08_copy.jpg"}, ' +
    '{"name":"Cheesy Tomato", "price":"TBD", "url":"images/food/cheesyTomato_01.png"}, ' +
    '{"name":"Monster Lasagna", "price":"TBD", "url":"images/food/monsterLasagna_01.jpg"}, ' +
    '{"name":"Firecap Soup", "price":"TBD", "url":"images/food/01_FirecapSoup.jpg"}, ' +
    '{"name":"Mango Rice", "price":"TBD", "url":"images/food/mangoRice_01.jpg"}, ]}';

function addItem(itemName, price, imgLink)
{
    var menuRow = document.createElement("div")
    menuRow.classList.add("menu-row")
    var newItem = document.getElementsByClassName("new-items")[0]
    var menuRowContents = `
        <div class="shop-item">
            <span class="shop-item-title">${itemName}</span>
            <img class="shop-item-image" src="${imgLink}">
            <div class="shop-item-details">
                <span class="shop-item-price">${price}</span>
                <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
        </div>
    `
    menuRow.innterHTML = menuRowContents
    newItem.append(menuRow)
}