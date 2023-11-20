//sets menu at start
if(!localStorage.getItem("count"))
{
    localStorage.setItem("count", 1)
    localStorage.setItem("menu", "Veggie Cream Soup,$3.00,images/food/Creamy Soup.JPG*Nut Cake,$4.00,images/food/Nut Cake.jpeg*Monster Rice Balls,$3.50,images/food/BotW Monster Rice Ball.jpeg*Mud Cookies,$2.00,images/food/mudcookie_08_copy.jpg*Cheesy Tomatoes,$2.00,images/food/cheesyTomato_01.png*Monster Lasagna,$6.00,images/food/monsterLasagna_01.jpg*Firecap Soup,$3.50,images/food/01_FirecapSoup.jpg*Mango Rice,$2.75,images/food/mangoRice_01.jpg");
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
}