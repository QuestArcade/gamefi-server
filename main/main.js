var address = "0xEc5487A41c1128401Be766e44A5E88fD3358cc6c";
var apiUrl = "https://api.bttcscan.com/api?module=account&action=txlist&address=" + address + "&startblock=1&endblock=99999999&sort=asc&apikey=YourApiKeyToken";

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        checkTransactions(data.result);
    })
    .catch(error => {
        console.error('Error:', error);
    });

function checkTransactions(transactions) {
    var premiumWeekThreshold = 21000;
    var premiumMonthThreshold = 30000;
    var hasPremiumWeekTransactions = false;
    var hasPremiumMonthTransactions = false;

    transactions.forEach(transaction => {
        var value = transaction.value / 1000000000000000000;
        if (value >= premiumWeekThreshold && value < premiumMonthThreshold) {
            hasPremiumWeekTransactions = true;
        } else if (value >= premiumMonthThreshold) {
            hasPremiumMonthTransactions = true;
        }
    });

    if (hasPremiumWeekTransactions || hasPremiumMonthTransactions) {
        document.getElementById("premiumUser").style.display = "block";
        document.getElementById("premiuminfo").style.display = "none";
    } else {
        document.getElementById("premiumUser").style.display = "none";
        document.getElementById("premiuminfo").style.display = "block";

        var gameLinks = document.querySelectorAll(".game-link");
        gameLinks.forEach(link => {
            link.style.display = "none";
        });
    }
}

window.onload = checkTransactions;



function isMetaMaskInstalled() {
    return typeof window.ethereum !== 'undefined';
}

function isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
}

function isOpera() {
    return /OPR/.test(navigator.userAgent) && /Opera/.test(navigator.vendor);
}

function isFirefox() {
    return /Firefox/.test(navigator.userAgent);
}

function isEdge() {
    return /Edge/.test(navigator.userAgent);
}

function isSafari() {
    return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
}

function isWeb3Supported() {
    return typeof window.web3 !== 'undefined';
}

function performBrowserSpecificActions() {
    if (isMetaMaskInstalled()) {
        fetchPremiumStatus();
    } else {
        
    }

    if (isChrome()) {
        
    } else if (isOpera()) {
        
    } else if (isFirefox()) {
        
    } else if (isEdge()) {
        
    } else if (isSafari()) {
        
    }

    if (isWeb3Supported()) {
        
    } else {
        
    }
}

window.onload = performBrowserSpecificActions;
