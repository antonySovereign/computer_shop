let shoppingCart = document.querySelector("#shoppingCart");
let closeCart1 = document.querySelector("#close1");
let closeCart2 = document.querySelector("#close2");
let sendOrder = document.querySelector("#sendOrder");
let clearAll = document.querySelector("#clearAll");


let btns = document.querySelectorAll(".btn2Cart");
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", add2Cart);
}

function add2Cart() {
    this.disabled = true;
    let cartData = getCartData() || {},
        itemID = this.dataset.id,
        itemName = this.dataset.name,
        itemPrice = this.dataset.price;

    if (cartData.hasOwnProperty(itemID)) {
        cartData[itemID][2] += 1;
    } else {
        cartData[itemID] = [itemName, itemPrice, 1];
    }

    if (!setCartData(cartData)) {
        this.disabled = false;
        alert("товар " + itemName.toUpperCase() + " добавлен в корзину");
        shoppingCart.style.display = "block";
    }
    return cartData;
}

function checkCart() {
    if (localStorage.getItem("cart") != null) {
        shoppingCart.style.display = "block";
    } else {
        shoppingCart.style.display = "none";
    }
}

checkCart();

shoppingCart.onclick = () => {
    shoppingCart.style.display = "none";
    openCart();
    closeWind(false);
}

closeCart1.onclick = () => {
    closeWind(true);
}

closeCart2.onclick = () => {
    closeWind(true);
}

function setCartData(a) {
    localStorage.setItem("cart", JSON.stringify(a));
    return false;
}

function getCartData() {
    return JSON.parse(localStorage.getItem("cart"));
}

function closeWind(x) {
    if (x == false) {
        document.getElementById("windowcart").style.display = "block";
        document.querySelector("body").classList.add("body-lock");
    } else if (x == true) {
        document.getElementById("windowcart").style.display = "none";
        document.querySelector("body").classList.remove("body-lock");
        checkCart();
    }
}

function openCart() {
    let cartData = getCartData(),
        totalItems = '',
        totalSum = 0,
        cartInfo = '';
    if (cartData != null) {
        totalItems = `<table class="mytable" cellpadding=7><tr><th width=48%>Наименование</th><th width=20%>Цена</th><th width=12% colspan=3>Кол-во</th></tr>`;

        for (let items in cartData) {
            totalItems += "<tr>";
            for (let i = 0; i < cartData[items].length; i++) {
                totalItems += `<td>${cartData[items][i]}</td>`;
                cartInfo += `${cartData[items][i]}\t`;
            }

            cartInfo += "\n";
            totalSum += Number(String(cartData[items][1]).split(",").join("")) * cartData[items][2];
            totalItems += "<td width=10% class='column-del' onclick = deleteItem(" + items + ")>-</td>";
            totalItems += "<td width=10% class='column-del' onclick = addItem(" + items + ")>+</td></tr>";
        }

        totalItems += "</table>";

        document.getElementById("table").innerHTML = totalItems;
        document.getElementById("cost").innerHTML = `Общая стоимость: ${totalSum} руб.`;
        document.getElementById("hiddenCartItem").value = cartInfo + `Общая стоимость: ${totalSum} руб.`;
    }
    return totalSum;
}

function deleteItem(itemID) {
    let cartData = getCartData();
    if (cartData[itemID][2] == 1) {
        delete cartData[itemID];
    } else {
        cartData[itemID][2] -= 1;
    }

    setCartData(cartData);

    if (openCart() == 0) {
        localStorage.removeItem("cart");
        shoppingCart.style.display = "none";
        alert("Корзина очищена");
        closeWind(true);
    }
}

function addItem(itemID) {
    let cartData = getCartData();
    cartData[itemID][2] += 1;
    setCartData(cartData);
    openCart();
}

sendOrder.addEventListener("click", send);
clearAll.addEventListener("click", clearEverything);

function clearEverything() {
    if (confirm("Вы точно хотите очистить корзину?")) {
        localStorage.removeItem("cart");
        alert("Корзина очищена");
        shoppingCart.style.display = "none";
        closeWind(true);
    }
}

function send() {
    alert("Запрос удалён");
    clearEverything();
}
