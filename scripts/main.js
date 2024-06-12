const firebaseConfig = {
    apiKey: "AIzaSyDJeS59gVtp_I5xrvEsbKPqRQwXZTJb-eA",
    authDomain: "test-b216b.firebaseapp.com",
    databaseURL: "https://test-b216b-default-rtdb.firebaseio.com",
    projectId: "test-b216b",
    storageBucket: "test-b216b.appspot.com",
    messagingSenderId: "717181307024",
    appId: "1:717181307024:web:2c2e86176bbe3407d2f015"
  };

firebase.initializeApp(firebaseConfig);
let database = firebase.database();

const header = document.getElementById("header");
const main = document.getElementById("main");
const footer = document.getElementById("footer");

let n = null;
let a = null;
let p = null;
let valuePerson = 0;
let text = "";
let sum = 0;
let numberOfPizzas = 0;
let pizzaFromOrder = [];
let numberOfUsers = 0;

const wrapperLogoImg = document.createElement("div");
wrapperLogoImg.classList.add("wrapper-logo-img");
header.append(wrapperLogoImg);

const logoImg = document.createElement("img");
logoImg.classList.add("img-style");
logoImg.classList.add("logo-img");
logoImg.src = "img/p6-1.png";
logoImg.alt = "pizza drawing";
wrapperLogoImg.prepend(logoImg);

const logo = document.createElement("p");
logo.classList.add("logo");
logo.textContent = "Tasty pizza";
header.append(logo);

const logoText = document.createElement("p");
logoText.classList.add("logo-text");
logoText.textContent = "Delivery of the most delicious pizza in town.";
header.append(logoText);

const wrapperForm = document.createElement("div");
wrapperForm.classList.add("wrapper-form");
main.append(wrapperForm);

const name = document.createElement("p");
name.classList.add("wrapper-form__text");
name.textContent = "Enter your name";
wrapperForm.prepend(name);

const inputName = document.createElement("input");
inputName.classList.add("wrapper-form__input");
inputName.placeholder = "name";
inputName.focus();
wrapperForm.append(inputName);

const textErr = document.createElement("p");
textErr.classList.add("wrapper-form__textErr");
textErr.textContent = "";

let patternName = /(?=.*[a-z])(?=.*[A-Z])/g; 

inputName.addEventListener('input', onInputName);
function onInputName() {
    n = patternName.test(inputName.value);
    if (!n){
        inputName.classList.add("red");
        textErr.textContent = "At least one capital and one small letter of the Latin alphabet";
    } else{
        inputName.classList.remove("red");
        textErr.textContent = "";
    }

    if (a && p && n){
        buttonSave.removeAttribute("disabled");
    }
}

const password = document.createElement("p");
password.classList.add("wrapper-form__text");
password.textContent = "Enter your password";
wrapperForm.append(password);

const inputPassword = document.createElement("input");
inputPassword.classList.add("wrapper-form__input");
inputPassword.placeholder = "password";
wrapperForm.append(inputPassword);

let patternPassword = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
inputPassword.addEventListener('input', onInput);
function onInput() {
    p = patternPassword.test(inputPassword.value);
    if (!p){
        inputPassword.classList.add("red");
        textErr.textContent = "The password (minimum 6 characters) must contain at least one capital and small letter of the Latin alphabet, numbers and at least one symbol @#$%^&* ";
    } else{
        inputPassword.classList.remove("red");
        textErr.textContent = "";
    }
    if (a && p && n){
        buttonSave.removeAttribute("disabled");
    }
}

const address = document.createElement("p");
address.classList.add("wrapper-form__text");
address.textContent = "Enter your address";
wrapperForm.append(address);

const inputAddress = document.createElement("input");
inputAddress.classList.add("wrapper-form__input");
inputAddress.placeholder = "Street, house - flat";
wrapperForm.append(inputAddress);

let patternAddress = /(?=.*[0-9])(?=.*[-,])(?=.*[a-z])(?=.*[A-Z])/g;

inputAddress.addEventListener('input', onInputAddress);
function onInputAddress() {
    a = patternAddress.test(inputAddress.value);
    if (!a){
        inputAddress.classList.add("red");
        textErr.textContent = "The address must contain at least one capital and small letter of the Latin alphabet, numbers and a comma";
    } else{
        inputAddress.classList.remove("red");
        textErr.textContent = "";
    }

    if (a && p && n){
        buttonSave.removeAttribute("disabled");
    }
}

const buttonSave = document.createElement("button");
buttonSave.classList.add("button-form");
buttonSave.textContent = "Save";
buttonSave.setAttribute("disabled", "disabled");
wrapperForm.append(buttonSave);

wrapperForm.append(textErr);

let user = JSON.parse(localStorage.getItem('userNameForPizza'));
let previousOrder = JSON.parse(localStorage.getItem('pizzaFromOrder'));

const wrapperWelcom = document.createElement("div");
wrapperWelcom.classList.add("wrapper-welcom");
main.append(wrapperWelcom);

const welcome = document.createElement("p");
welcome.classList.add("text");
welcome.textContent =  `Hello my dear friend, ${user}! It's time to eat! Let's find the best option for you.`
wrapperWelcom.append(welcome);

const welcomeBtnOk = document.createElement("button");
welcomeBtnOk.classList.add("wrapper-welcom__button-ok");
welcomeBtnOk.textContent =  "Ok";
wrapperWelcom.append(welcomeBtnOk);

const welcomeBtnСhange = document.createElement("button");
welcomeBtnСhange.classList.add("wrapper-welcom__button-change");
welcomeBtnСhange.textContent =  "No, change user";
wrapperWelcom.append(welcomeBtnСhange);

buttonSave.onclick = function() {
    localStorage.setItem("userNameForPizza", JSON.stringify(inputName.value));
    localStorage.setItem("userPasswordForPizza", JSON.stringify(inputPassword.value));
    localStorage.setItem("userAddressPizza", JSON.stringify(inputAddress.value));
    user = inputName.value;
    welcome.textContent =  `Hello my dear friend, ${user}! It's time to eat! Let's find the best option for you.`
    wrapperWelcom.style.display = "block";
    wrapperForm.style.display = "none";
}

if (user) {
    wrapperWelcom.style.display = "block";
} else {
    wrapperForm.style.display = "block";
}

welcomeBtnСhange.onclick = function(){
    inputName.value = "";
    inputPassword.value = "";
    inputAddress.value = "";
    buttonSave.setAttribute("disabled", "disabled");
    wrapperForm.style.display = "block";
    wrapperWelcom.style.display = "none";
}

// блок для выбора количества едаков
const wrapperPersons = document.createElement("div");
wrapperPersons.classList.add("wrapper-persons");
main.append(wrapperPersons);

const personsText = document.createElement("p");
personsText.classList.add("text");
personsText.textContent = "Choose the number of people";
wrapperPersons.append(personsText);

const personsImg = document.createElement("div");
personsImg.classList.add("persons-img");
wrapperPersons.append(personsImg);

const wrapperThreePersons = document.createElement("div");
wrapperThreePersons.classList.add("wrapper-sale");
wrapperThreePersons.style.display = "none";
main.append(wrapperThreePersons);

const threePersonsText = document.createElement("p");
threePersonsText.classList.add("text-sale");
threePersonsText.textContent = "🍕 When ordering 5 pizzas or more, get a 15% discount 🕺💃🎉🍕";
wrapperThreePersons.append(threePersonsText);

const twoPersons = document.createElement("div");
twoPersons.classList.add("wrapper-sale");
twoPersons.style.display = "none";
main.append(twoPersons);

const twoPersonsText = document.createElement("p");
twoPersonsText.classList.add("text-sale");
twoPersonsText.textContent = "🍕 when ordering 2 pizzas, 7% discount  👫💖🍕";
twoPersons.append(twoPersonsText);

function nextStep(){
    wrapperPersons.style.display = "none";
    preferencesText.style.display = "block";
    pizzaToppings.style.display = "block";
    preferences.style.display = "block";
    showAllMenuBtn.style.display = "block";
    showSelectedMenuBtn.style.display = "block";
}

const onePersonImg = document.createElement("img");
onePersonImg.classList.add("img-persons");
onePersonImg.src = "img/oneperson.jpg";
onePersonImg.alt = "person";
personsImg.prepend(onePersonImg);
onePersonImg.addEventListener("click", function(){
    valuePerson = 1;
    console.log(valuePerson);
    nextStep();
});

const twoPersonImg = document.createElement("img");
twoPersonImg.classList.add("img-persons");
twoPersonImg.src = "img/twoperson.jpg";
twoPersonImg.alt = "two-person";
personsImg.prepend(twoPersonImg);
twoPersonImg.addEventListener("click", function(){
    valuePerson = 2;
    console.log(valuePerson);
    twoPersons.style.display = "block";
    nextStep();
});

const companyImg = document.createElement("img");
companyImg.classList.add("img-persons");
companyImg.src = "img/company.jpg";
companyImg.alt = "company";
personsImg.prepend(companyImg);
companyImg.addEventListener("click", function(){
    valuePerson = 3;
    console.log(valuePerson);
    wrapperThreePersons.style.display = "block";
    nextStep();
});

welcomeBtnOk.onclick = function(){
    wrapperWelcom.style.display = "none";
    wrapperPersons.style.display = "block";
};

const preferencesText = document.createElement("p");
preferencesText.classList.add("text-preferences");
preferencesText.textContent = "Drag and drop the toppings you like 😋";
preferencesText.style.display = "none";
main.append(preferencesText);

const pizzaToppings = document.createElement("div");
pizzaToppings.classList.add("pizza-toppings");
pizzaToppings.id = "pizzaToppings";
pizzaToppings.style.display = "none";
main.append(pizzaToppings);

const chickenImg = document.createElement("img");
chickenImg.classList.add("pizza-toppings__img");
chickenImg.src = "img/chicken.png";
chickenImg.alt = "chicken";
chickenImg.id = "chicken";
chickenImg.style.draggable="true";
pizzaToppings.append(chickenImg);

const pepperoniImg = document.createElement("img");
pepperoniImg.classList.add("pizza-toppings__img");
pepperoniImg.src = "img/pepperoni.png";
pepperoniImg.alt = "pepperoni";
pepperoniImg.id = "pepperoni";
pepperoniImg.style.draggable="true";
pizzaToppings.append(pepperoniImg);

const hamImg = document.createElement("img");
hamImg.classList.add("pizza-toppings__img");
hamImg.src = "img/ham.png";
hamImg.alt = "ham";
hamImg.id = "ham";
hamImg.style.draggable="true";
pizzaToppings.append(hamImg);

const baconImg = document.createElement("img");
baconImg.classList.add("pizza-toppings__img");
baconImg.src = "img/bacon.png";
baconImg.alt = "bacon";
baconImg.id = "bacon";
baconImg.style.draggable="true";
pizzaToppings.append(baconImg);

const sausagesImg = document.createElement("img");
sausagesImg.classList.add("pizza-toppings__img");
sausagesImg.classList.add("img-small");
sausagesImg.src = "img/sausages.png";
sausagesImg.alt = "sausages";
sausagesImg.id = "sausages";
sausagesImg.style.draggable="true";
pizzaToppings.append(sausagesImg);

const shrimpsImg = document.createElement("img");
shrimpsImg.classList.add("pizza-toppings__img");
shrimpsImg.classList.add("img-small");
shrimpsImg.src = "img/shrimps.png";
shrimpsImg.alt = "shrimps";
shrimpsImg.id = "shrimps";
shrimpsImg.style.draggable="true";
pizzaToppings.append(shrimpsImg);

const oliveImg = document.createElement("img");
oliveImg.classList.add("pizza-toppings__img");
oliveImg.classList.add("img-small");
oliveImg.src = "img/olive.png";
oliveImg.alt = "olive";
oliveImg.id = "olive";
oliveImg.style.draggable="true";
pizzaToppings.append(oliveImg);

const pepperImg = document.createElement("img");
pepperImg.classList.add("pizza-toppings__img");
pepperImg.classList.add("img-small");
pepperImg.src = "img/pepper.png";
pepperImg.alt = "pepper";
pepperImg.id = "pepper";
pepperImg.style.draggable="true";
pizzaToppings.append(pepperImg);

const pineappleImg = document.createElement("img");
pineappleImg.classList.add("pizza-toppings__img");
pineappleImg.classList.add("img-small");
pineappleImg.src = "img/pineapple.png";
pineappleImg.alt = "pineapplex";
pineappleImg.id = "pineapplex";
pineappleImg.style.draggable="true";
pizzaToppings.append(pineappleImg);

const pickledСucumbersImg = document.createElement("img");
pickledСucumbersImg.classList.add("pizza-toppings__img");
pickledСucumbersImg.classList.add("img-small");
pickledСucumbersImg.src = "img/pickled_cucumbers.png";
pickledСucumbersImg.alt = "pickled cucumbers";
pickledСucumbersImg.id = "pickled cucumbers";
pickledСucumbersImg.style.draggable="true";
pizzaToppings.append(pickledСucumbersImg);

const hotPeppersImg = document.createElement("img");
hotPeppersImg.classList.add("pizza-toppings__img");
hotPeppersImg.classList.add("img-small");
hotPeppersImg.src = "img/hotpeppers.png";
hotPeppersImg.alt = "hot peppers";
hotPeppersImg.id = "hot peppers";
hotPeppersImg.style.draggable="true";
pizzaToppings.append(hotPeppersImg);

const preferences = document.createElement("div");
preferences.classList.add("preferences");
preferences.style.display = "none";
main.append(preferences);

preferences.addEventListener("dragover", function(event) {
    event.preventDefault();
    this.classList.add("element-over");
});

preferences.addEventListener("drop", dropElement);

pizzaToppings.addEventListener("drop", dropElement);

const toppings = document.getElementsByClassName("pizza-toppings__img");
const favoriteToppings = {};

for (let i = 0; i < toppings.length; i++) {
    toppings[i].addEventListener("dragstart", function(event) {
        this.classList.add("dragging");
        event.dataTransfer.setData("text", event.target.id);
        event.dataTransfer.setData("content", event.target.alt);
    });

    toppings[i].addEventListener("dragend", function(event) {
        this.classList.remove("dragging");
    });
}

function dropElement(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let content = event.dataTransfer.getData("content");

    if (this === preferences && !(data in favoriteToppings)){
        favoriteToppings[data] = content;
    }

    this.append(document.getElementById(data));
}

const showSelectedMenuBtn = document.createElement("button");
showSelectedMenuBtn.classList.add("selected-menu-btn");
showSelectedMenuBtn.textContent =  "show selected menu";
showSelectedMenuBtn.style.display = "none";
main.append(showSelectedMenuBtn);

const showAllMenuBtn = document.createElement("button");
showAllMenuBtn.classList.add("all-menu-btn");
showAllMenuBtn.textContent =  "show all menu";
showAllMenuBtn.style.display = "none";
main.append(showAllMenuBtn);

const pizzaStorage = {     
    "pizza Venice": {"ingredients": ["chicken", "bacon", "leek", "fresh tomato", "pizza sauce", "cheese", "honey mustard dressing", "parsley"],
                    "price": {"small (1 lb)": "20",
                              "big (2 lb)": "37"},
                    "photo": "img/Venice.WEBP"}, 
    "pizza Diablo": {"ingredients": ["pepperoni", "hot peppers", "cheese", "pizza sauce", "oregano"],
                     "price": {"small (1 lb)": "18",
                               "big (2 lb)": "34"},
                     "photo": "img/Diablo.WEBP"},
    "pizza Hawaiian with ham": {"ingredients": ["ham", "hot peppers", "pineapplex", "cheese", "pizza sauce", "oregano"],
                                "price": {"small (1 lb)": "19",
                                          "big (2 lb)": "35"},
                                "photo": "img/Hawaiian.WEBP"},      
    "pizza Homemade": {"ingredients": ["ham", "bacon", "potatoes", "pickled cucumbers", "cheese", "mayonnaise", "garlic", "dill", "pizza sauce", "oregano"],
                       "price": {"small (1 lb)": "18",
                                 "big (2 lb)": "35"},
                       "photo": "img/Homemade.WEBP"},
    "pizza Hawaiian with chicken": {"ingredients": ["chicken", "pineapplex", "hot peppers", "cheese", "pizza sauce", "oregano"],
                                    "price": {"small (1 lb)": "19",
                                              "big (2 lb)": "35"}, 
                                    "photo": "img/Hawaiian with chicken.WEBP"     },
    "pizza Italy": {"ingredients": ["ham", "mushrooms", "dried tomatoes", "capers", "cheese", "pizza sauce", "oregano"],
                    "price": {"small (1 lb)": "21",
                              "big (2 lb)": "39"},
                    "photo": "img/Italy.WEBP"},
    "pizza Capricciosa": {"ingredients": ["ham", "mushrooms", "olive", "Mediterranean herbs", "cheese", "pizza sauce"],
                          "price": {"small (1 lb)": "21",
                                    "big (2 lb)": "39"},
                          "photo": "img/Capricciosa.WEBP"},
    "pizza Verona": {"ingredients": ["ham", "bacon", "honey", "tomatoes", "cheese", "pizza sauce"],
                     "price": {"small (1 lb)": "20",
                               "big (2 lb)": "38"},
                     "photo": "img/Verona.WEBP"},
    "pizza Carbonara": {"ingredients": ["ham", "egg", "hard cheese", "cheese", "pizza sauce"],
                        "price": {"small (1 lb)": "18",
                                  "big (2 lb)": "34"},
                        "photo": "img/Carbonara.WEBP"},
    "pizza Mario": {"ingredients": ["chicken", "mushrooms", "pickled cucumbers", "burger sauce", "cheese", "pizza sauce", "pepper mixture", "Mediterranean herbs"],
                    "price": {"small (1 lb)": "19",
                              "big (2 lb)": "37"},
                    "photo": "img/Mario.WEBP"},
    "pizza Margherita": {"ingredients": ["cherry tomatoes", "cheese", "pizza sauce", "basil", "oregano"],
                         "price": {"small (1 lb)": "19",
                                   "big (2 lb)": "37"},
                         "photo": "img/Margherita.WEBP"},
    "pizza Terra": {"ingredients": ["ham", "pepperoni", "pepper", "cheese", "blue cheese", "pizza sauce", "Mediterranean herbs"],
                    "price": {"small (1 lb)": "20",
                              "big (2 lb)": "38"},
                    "photo": "img/Terra.WEBP"},
    "pizza with seafood": {"ingredients": ["shrimps", "salmon", "squid", "onion", "marinated capers", "cherry tomatoes", "lemon", "cheese", "pizza sauce"],
                           "price": {"small (1 lb)": "21",
                                     "big (2 lb)": "40"},
                           "photo": "img/with seafood.WEBP"},
    "pizza Edam": {"ingredients": ["ham", "bacon", "sausages", "tomatoes", "smoked cheese", "cheese", "pizza sauce", "Mediterranean herbs"],
                   "price": {"small (1 lb)": "20",
                             "big (2 lb)": "39"},
                   "photo": "img/Edam.WEBP"},            
};
//тень для модального окошка

const shadow = document.createElement("div");
shadow.classList.add("shadow");
main.append(shadow);

// модальное окошко
const modal = document.createElement("div");
modal.classList.add("modal");
main.append(modal);
//
const wrapperModalHeader = document.createElement("div");
wrapperModalHeader.classList.add("modal__wrapper");
modal.append(wrapperModalHeader);

const modalHeader = document.createElement("h2");
modalHeader.classList.add("modal-headep");
modalHeader.textContent = "Your order:"
wrapperModalHeader.append(modalHeader);

const closeModalWindowBtn = document.createElement("button");
closeModalWindowBtn.classList.add("modal-close-btn");
closeModalWindowBtn.textContent = "❌";
closeModalWindowBtn.onclick = function(){
    modal.classList.remove("modal_open");
    shadow.classList.remove("shadow_open");
}
wrapperModalHeader.append(closeModalWindowBtn);

let order = document.createElement("p");
order.classList.add("order-text");
order.textContent = text;
modal.append(order);

let totalPayable = document.createElement("p");
totalPayable.classList.add("total-payable");
totalPayable.textContent = `Total payable: ${sum}`;
modal.append(totalPayable);

const wrapperModalFooter = document.createElement("div");
wrapperModalFooter.classList.add("modal__wrapper");
modal.append(wrapperModalFooter);

const plusPizzaBtn = document.createElement("button");
plusPizzaBtn.classList.add("plus-pizza-btn");
plusPizzaBtn.textContent = "+ pizza";
plusPizzaBtn.onclick = function(){
    modal.classList.remove("modal_open");
    shadow.classList.remove("shadow_open");
}
wrapperModalFooter.append(plusPizzaBtn);

let clickAudio = new Audio("http://hsvensson.com/x/LJUDFILER/LJUDEFFEKTER/MOTOR.WAV");
clickSoundInit();

function clickSoundInit() {
    clickAudio.play(); 
    clickAudio.pause(); 
}

function clickSound() {
    clickAudio.currentTime=0;
    clickAudio.play();
}

const wrapperСonfirmationOfOrder = document.createElement("div");
wrapperСonfirmationOfOrder.classList.add("confirmation-wrapper");
main.append(wrapperСonfirmationOfOrder);

const confirmationOfOrder = document.createElement("p");
confirmationOfOrder.classList.add("confirmation-text");
confirmationOfOrder.textContent = "Your order has been placed, expect delivery within 45 minutes.";
wrapperСonfirmationOfOrder.append(confirmationOfOrder);

const men = document.createElement("img");
men.classList.add("men__img");
men.src = "img/Food-Delivery.png";
men.alt = "men";
men.id = "men";
wrapperСonfirmationOfOrder.append(men);

const finalOkBtn = document.createElement("button");
finalOkBtn.classList.add("final-Ok-btn");
finalOkBtn.textContent = "OK";
finalOkBtn.onclick = function(){
    modal.classList.remove("modal_open");
    shadow.classList.remove("shadow_open");
    wrapperСonfirmationOfOrder.style.display = "none";
    text = "";
    sum = 0;
    numberOfPizzas = 0;
}
wrapperСonfirmationOfOrder.append(finalOkBtn);

const orderBtn = document.createElement("button");
orderBtn.classList.add("order-btn");
orderBtn.textContent = "order";
orderBtn.onclick = function(){
    clickSound();
    wrapperСonfirmationOfOrder.style.display = "block";
    modal.classList.remove("modal_open");
}
wrapperModalFooter.append(orderBtn);

const clearOrderBtn = document.createElement("button");
clearOrderBtn.classList.add("clear-order-btn");
clearOrderBtn.textContent = "clear order";
clearOrderBtn.onclick = function(){
    modal.classList.remove("modal_open");
    shadow.classList.remove("shadow_open");
    text = "";
    sum = 0;
    numberOfPizzas = 0;
}
wrapperModalFooter.append(clearOrderBtn);

// отображение отсортированных пицц
showSelectedMenuBtn.onclick = function() {
    event.preventDefault();
    let pizzaList = document.createElement("div");
    pizzaList.classList.add("pizzaList");
    main.append(pizzaList);

    let arrChoice = [];
    let counter = 0;

    for (let y in favoriteToppings) {
        arrChoice[counter] = favoriteToppings[y];
        counter++;
    }

    let yourСhoiceHead = document.createElement('h1');
    yourСhoiceHead.classList.add("menu-head");
    yourСhoiceHead.textContent = `Your Сhoice (${String(arrChoice).replace(/,/g,", ")})`;
    pizzaList.before(yourСhoiceHead);
    
    let selectedPizzas = {};

    for (let key in pizzaStorage) {
        let arr = pizzaStorage[key]["ingredients"];

        for (let i in favoriteToppings){
            let a = arr.includes(favoriteToppings[i]);
            if (a && !(pizzaStorage[key] in selectedPizzas)){
                selectedPizzas[key] = pizzaStorage[key];
            }
        }
    }

    for (let key in selectedPizzas) {
        
        let somePizza = document.createElement("div");
        somePizza.classList.add("pizza-description");
        somePizza.addEventListener("click", makeAnOrder);
        pizzaList.append(somePizza);

        let somePizzaImg = document.createElement("img");
        somePizzaImg.classList.add("pizza-description__img");
        somePizzaImg.src = pizzaStorage[key]["photo"];
        somePizzaImg.alt = "pizza";
        somePizza.prepend(somePizzaImg);

        let somePizzaName = document.createElement("p");
        somePizzaName.classList.add("pizza-description__name");
        somePizzaName.textContent = key;
        somePizza.append(somePizzaName);

        let somePizzaIngredients = document.createElement("p");
        somePizzaIngredients.classList.add("pizza-description__ingredients");
        somePizzaIngredients.textContent = String(pizzaStorage[key]["ingredients"]).replace(/,/g,", ");
        somePizza.append(somePizzaIngredients);

        let somePizzaPrice = document.createElement("p");
        somePizzaPrice.classList.add("pizza-description__price");
        somePizzaPrice.textContent = "small (1 lb)" + ": " + pizzaStorage[key]["price"]["small (1 lb)"] + "; " + "big (2 lb)" + ": " + pizzaStorage[key]["price"]["big (2 lb)"] ;
        somePizza.append(somePizzaPrice);

        let somePizzaBtnSm = document.createElement("button");
        somePizzaBtnSm.classList.add("pizza-description__opder-sm");
        somePizzaBtnSm.textContent =  "order small";
        somePizza.append(somePizzaBtnSm);

        let somePizzaBtnBig = document.createElement("button");
        somePizzaBtnBig.classList.add("pizza-description__opder-big");
        somePizzaBtnBig.textContent =  "order big";
        somePizza.append(somePizzaBtnBig);

        function makeAnOrder(event){
            event.preventDefault();
            let target = event.target;
            if (target.textContent ===  "order small"){
                numberOfPizzas += 1;
                pizzaFromOrder[numberOfPizzas-1] = key;
                text = text + key + ": " + pizzaStorage[key]["price"]["small (1 lb)"] +"; ";
                order.textContent = text;
                sum = sum + Number(pizzaStorage[key]["price"]["small (1 lb)"]);
                if (numberOfPizzas == 2) {
                    totalPayable.textContent = `Total payable: ${(sum*0.93).toFixed(2)} Sale 7%`;
                } else if (numberOfPizzas >= 5) {
                    totalPayable.textContent = `Total payable: ${(sum*0.85).toFixed(2)} Sale 15%`;
                } else {
                    totalPayable.textContent = `Total payable: ${sum.toFixed(2)}`;
                    textSale = "";
                }

                shadow.classList.add("shadow_open");
                modal.classList.add("modal_open");
            }
            if (target.textContent ===  "order big"){
                numberOfPizzas += 1;
                pizzaFromOrder[numberOfPizzas-1] = key;
                text = text + key + ": " + pizzaStorage[key]["price"]["big (2 lb)"] +"; ";
                order.textContent = text;
                sum = sum + Number(pizzaStorage[key]["price"]["big (2 lb)"]);
                if (numberOfPizzas == 2) {
                    totalPayable.textContent = `Total payable: ${(sum*0.93).toFixed(2)} Sale 7%`;
                } else if (numberOfPizzas >= 5) {
                    totalPayable.textContent = `Total payable: ${(sum*0.85).toFixed(2)} Sale 15%`;
                } else {
                    totalPayable.textContent = `Total payable: ${sum.toFixed(2)}`;
                }

                shadow.classList.add("shadow_open");
                modal.classList.add("modal_open");
            }
        }
    }
}

// отображение всех пицц    

showAllMenuBtn.onclick = function(event) {
    event.preventDefault();
    let pizzaList = document.createElement("div");
    pizzaList.classList.add("pizzaList");
    main.append(pizzaList);

    let allMenuHead = document.createElement('h1');
    allMenuHead.classList.add("menu-head");
    allMenuHead.textContent = "All menu";
    pizzaList.before(allMenuHead);

    for (let key in pizzaStorage) {
        let somePizza = document.createElement("div");
        somePizza.classList.add("pizza-description");
        somePizza.addEventListener("click", makeAnOrder);
        pizzaList.append(somePizza);

        let somePizzaImg = document.createElement("img");
        somePizzaImg.classList.add("pizza-description__img");
        somePizzaImg.src = pizzaStorage[key]["photo"];
        somePizzaImg.alt = "pizza";
        somePizza.prepend(somePizzaImg);

        let somePizzaName = document.createElement("p");
        somePizzaName.classList.add("pizza-description__name");
        somePizzaName.textContent = key;
        somePizza.append(somePizzaName);

        let somePizzaIngredients = document.createElement("p");
        somePizzaIngredients.classList.add("pizza-description__ingredients");
        somePizzaIngredients.textContent = String(pizzaStorage[key]["ingredients"]).replace(/,/g,", ");
        somePizza.append(somePizzaIngredients);

        let somePizzaPrice = document.createElement("p");
        somePizzaPrice.classList.add("pizza-description__price");
        somePizzaPrice.textContent = "small (1 lb)" + ": " + pizzaStorage[key]["price"]["small (1 lb)"] + "; " + "big (2 lb)" + ": " + pizzaStorage[key]["price"]["big (2 lb)"] ;
        somePizza.append(somePizzaPrice);

        let somePizzaBtnSm = document.createElement("button");
        somePizzaBtnSm.classList.add("pizza-description__opder-sm");
        somePizzaBtnSm.textContent =  "order small";
        somePizza.append(somePizzaBtnSm);

        let somePizzaBtnBig = document.createElement("button");
        somePizzaBtnBig.classList.add("pizza-description__opder-big");
        somePizzaBtnBig.textContent =  "order big";
        somePizza.append(somePizzaBtnBig);

        function makeAnOrder(event){
            event.preventDefault();
            let target = event.target;
            if (target.textContent ===  "order small"){
                numberOfPizzas += 1;
                pizzaFromOrder[numberOfPizzas-1] = key;
                text = text + key + ": " + pizzaStorage[key]["price"]["small (1 lb)"] +"; ";
                order.textContent = text;
                sum = sum + Number(pizzaStorage[key]["price"]["small (1 lb)"]);
                if (numberOfPizzas == 2) {
                    totalPayable.textContent = `Total payable: ${(sum*0.93).toFixed(2)} Sale 7%`;
                } else if (numberOfPizzas >= 5) {
                    totalPayable.textContent = `Total payable: ${(sum*0.85).toFixed(2)} Sale 15%`;
                } else {
                    totalPayable.textContent = `Total payable: ${sum.toFixed(2)}`;
                }

                shadow.classList.add("shadow_open");
                modal.classList.add("modal_open");
            }
            if (target.textContent ===  "order big"){
                numberOfPizzas += 1;
                pizzaFromOrder[numberOfPizzas-1] = key;
                text = text + key + ": " + pizzaStorage[key]["price"]["big (2 lb)"] +"; ";
                order.textContent = text;
                sum = sum + Number(pizzaStorage[key]["price"]["big (2 lb)"]);
                if (numberOfPizzas == 2) {
                    totalPayable.textContent = `Total payable: ${(sum*0.93).toFixed(2)} Sale 7%`;
                } else if (numberOfPizzas >= 5) {
                    totalPayable.textContent = `Total payable: ${(sum*0.85).toFixed(2)} Sale 15%`;
                } else {
                    totalPayable.textContent = `Total payable: ${sum.toFixed(2)}`;
                }

                shadow.classList.add("shadow_open");
                modal.classList.add("modal_open");
            }
        }
    }
}

const footerText = document.createElement("p");
footerText.classList.add("footer-text");
footerText.textContent = `2023 © Tasty pizza, Gersey City. All rights reserved.`;
footer.append(footerText);


