//VARIABLES
let paws = parseInt(localStorage.getItem("paws")) || 0;

let catTreeBought = false;

const bonus = {
    production: 1,
    price: 10,
};

const autoClicker = {
    speed: 2000,
    active: false,
    cost: 1,
    upgradeCost: 1,
    interval: null,
};
//
//
//
// Récupération des données récoltées depuis le localStorage
const pawSaved = parseInt(localStorage.getItem("paws"));

const bonusProductionSaved = parseInt(localStorage.getItem("bonus.production"));

const bonusPriceSaved = parseInt(localStorage.getItem("bonus.price"));

const autoclickerSaved = parseInt(localStorage.getItem("autoClicker.speed"))

const autoclickerActiveSaved = localStorage.getItem("autoClicker.active");

// Modification de l'affichage selon si l'autocliqueur a été acheté ou non
if (autoclickerActiveSaved === "true") {
    autoClickerActive = true;
    document.getElementById("autoClicker").innerHTML = "Autoclick: active!";
    document.getElementById("autoClickerPrice").style.display = "none";
    document.getElementById("button_buy_autoclicker").style.display = "none";
    document.getElementById("autoClickerUpgradeCost").style.display = "block";
    document.getElementById("autoClickerSpeed").style.display = "block";
    document.getElementById("button_upgrade_autoclicker").style.display = "inline-flex";
    startAutoClicker();
}

//Affichage sur l'interface des données récupérées précédemment (sorte de récupération de "sauvegarde")

if (!isNaN(pawSaved)) {
    paws = pawSaved;
    document.getElementById("paws").innerHTML = "Paws collected: " + paws;
}

if (!isNaN(bonusProductionSaved)) {
    bonus.production = bonusProductionSaved;
    document.getElementById("bonus").innerHTML = "Paws per click: " + bonus.production;
}

if (!isNaN(bonusPriceSaved)) {
    bonus.price = bonusPriceSaved;
    document.getElementById("cout_bonus").innerHTML = "Price: " + bonus.price;
}

const autoclickerSpeedSaved = parseFloat(localStorage.getItem("autoClickerSpeed"));
if (!isNaN(autoclickerSpeedSaved)) {
    autoClicker.speed = autoclickerSpeedSaved;
    document.getElementById("autoClickerSpeed").innerHTML = "Click every " + (autoClicker.speed / 1000).toFixed(1) + " seconds";
}

const autoclickerUpgradeCostSaved = parseInt(localStorage.getItem("autoClickerUpgradeCost"));
if (!isNaN(autoclickerUpgradeCostSaved)) {
    autoClicker.upgradeCost = autoclickerUpgradeCostSaved;
    document.getElementById("autoClickerUpgradeCost").innerHTML = "Upgrade cost: " + autoClicker.upgradeCost;
}

if (autoClicker.active) {
    startAutoClicker();
}


//-------------------------------------------- Fonctions qui updatent les bonus liés aux paws -------------------------------------------

function updateDisplay() {
    document.getElementById("paws").innerHTML = "Paws collected: " + paws;
    document.getElementById("bonus").innerHTML = "Paws per click: " + bonus.production;
    document.getElementById("cout_bonus").innerHTML = "Price: " + bonus.price;
}


//--------------------------------------------- Fonctions qui gèrent les clics sur le chat---------------------------------------------------
function clickCat() {
    paws += bonus.production;
    document.getElementById("paws").innerHTML = "Paws collected: " + paws;

    localStorage.setItem("paws", paws);

    document.getElementById("cat").style.display = "none";
    document.getElementById("catOnClick").style.display = "block";

    setTimeout(function() {
        document.getElementById("cat").style.display = "block";
        document.getElementById("catOnClick").style.display = "none";
    }, 150); // La durée en millisecondes avant que l'image "cat" ne réapparaisse
}

//fonction qui gère l'achat du bonus de pattes collectées


function buyMorePaws() {
    const price = bonus.price;
    if (paws >= price) {
        paws -= price;
        bonus.production += 1;
        bonus.price += 10;

        updateDisplay();

        localStorage.setItem("paws", paws);
        localStorage.setItem("bonusProduction", bonus.production);
        localStorage.setItem("bonusPrice", bonus.price);
    }
}

//------------------------------------- Fonctions qui gèrent l'achat et l'amélioration de l'autocliqueur---------------------------------------

// Fonction qui met à jour le display de l'autocliqueur une fois qu'on l'achète en retirant le bouton buy et en affichant le bouton upgrade

function updateAutoClickerDisplay() {
    document.getElementById("autoClicker").innerHTML = "Autoclick: " + (autoClicker.active ? "active" : "inactive");
    document.getElementById("autoClickerPrice").style.display = autoClicker.active ? "none" : "block";
    document.getElementById("button_buy_autoclicker").style.display = autoClicker.active ? "none" : "block";
    document.getElementById("autoClickerUpgradeCost").style.display = autoClicker.active ? "block" : "none";
    document.getElementById("autoClickerSpeed").style.display = autoClicker.active ? "block" : "none";
    document.getElementById("button_upgrade_autoclicker").style.display = autoClicker.active ? "inline-flex" : "none";
}

// Achat de l'autocliqueur

function buyAutoClicker() {
    if (paws >= autoClicker.cost && !autoClicker.active) {
        paws -= autoClicker.cost;
        autoClicker.active = true;

        updateDisplay();
        updateAutoClickerDisplay()

        localStorage.setItem("autoClickerActive", autoClicker.active);
        localStorage.setItem("paws", paws);
        startAutoClicker();
    }
}

// Mise à jour de l'autocliqueur en se basant sur ce qui a déjà été acheté

function upgradeAutoClicker() {
    if (paws >= autoClicker.upgradeCost) {
        paws -= autoClicker.upgradeCost;
        autoClicker.upgradeCost *= 2;
        autoClicker.speed *= 0.75;
        document.getElementById("paws").innerHTML = "Paws collected: " + paws;
        document.getElementById("autoClickerSpeed").innerHTML = "Click every " + (autoClicker.speed / 1000).toFixed(1) + " seconds";
        document.getElementById("autoClickerUpgradeCost").innerHTML = "Upgrade cost: " + autoClicker.upgradeCost;

        // cleat l'intervalle déjà présent et démarre l'autocliqueur avec le nouvel intervalle
        clearInterval(autoClicker.interval);
        startAutoClicker();

        localStorage.setItem("autoClickerSpeed", autoClicker.speed);
        localStorage.setItem("autoClickerUpgradeCost", autoClicker.upgradeCost);
        localStorage.setItem("paws", paws);

    }
}

//------------------------------------ Fonction qui gère l'achat et le bonus de l'arbre à chat ---------------------------------

function buyCatTree(multiplication) {
    if (!catTreeBought) {
        const treePrice = 10000000;
        if (paws >= treePrice) {
            paws -= treePrice;
            bonus.production *= multiplication;
            catTreeBought = true;

            updateDisplay();

            document.getElementById("catTree").style.display = "block";
        }
    }
}

//------------------------------------------------------Fonctions autocliqueur----------------------------------------------------------

// fonction qui gère le démarrage de l'autocliqueur en utilisant la vitesse de la variable autoClickerSpeed

function startAutoClicker() {
    autoClicker.interval = setInterval(function() {
        paws += bonus.production;
        document.getElementById("paws").innerHTML = "Paws collected: " + paws;
    }, autoClicker.speed);
}

function saveDataPeriodically() {
    localStorage.setItem("paws", paws);
    localStorage.setItem("autoClickerSpeed", autoClicker.speed);
    localStorage.setItem("autoClickerUpgradeCost", autoClicker.upgradeCost);
    localStorage.setItem("autoClickerActive", autoClicker.active);
    localStorage.setItem("autoClickerActive", autoClicker.interval);
    localStorage.setItem("autoClickerActive", autoClicker.cost);

    // Planifier manuellement la sauvegarde à nouveau après 5 secondes sinon trop de temps avant la sauvegarde
    setTimeout(saveDataPeriodically, 5000); // réglé sur 5 secondes
}

saveDataPeriodically();