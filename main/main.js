function displayTransactionInfo() {
    const provider = window.ethereum;

    if (typeof provider !== 'undefined') {
        provider.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                const userAddress = accounts[0]; 
                document.getElementById('transactionInfo').innerHTML = `Connected MetaMask Address: ${userAddress}<br><br>`;

                const now = new Date();
                const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
                
                const apiUrlForValue2 = `https://api.bttcscan.com/api?module=account&action=txlist&address=${userAddress}&startblock=1&endblock=99999999&sort=asc&apikey=YourApiKeyToken&startdatetimestamp=${Math.round(oneMonthAgo.getTime() / 1000)}`;
                const apiUrlForValue1 = `https://api.bttcscan.com/api?module=account&action=txlist&address=${userAddress}&startblock=1&endblock=99999999&sort=asc&apikey=YourApiKeyToken&startdatetimestamp=${Math.round(oneWeekAgo.getTime() / 1000)}`;

                fetch(apiUrlForValue2)
                    .then(response => response.json())
                    .then(data => {
                        let checkValue = 0;
                        data.result.forEach(transaction => {
                            if (transaction.to.toLowerCase() === '0xEc5487A41c1128401Be766e44A5E88fD3358cc6c'.toLowerCase()) {
                                const transactionValue = (transaction.value / 1e18).toFixed(1); 
                                if (transactionValue > 1000) {
                                    checkValue = "Premium mode: Active"; 
                                }
                                document.getElementById('transactionInfo').innerHTML += `Transaction Amount: ${transactionValue} BTTC<br>`;
                                document.getElementById('transactionInfo').innerHTML += `Transaction Date: ${new Date(transaction.timeStamp * 1000).toLocaleString()}<br><br>`;
                            }
                        });
                        document.getElementById('check').textContent = checkValue; 
                        activateElements(checkValue); 
                    })
                    .catch(error => {
                        console.error('Error fetching transaction data:', error);
                    });

                fetch(apiUrlForValue1)
                    .then(response => response.json())
                    .then(data => {
                        let checkValue = parseInt(document.getElementById('check').textContent); 
                        data.result.forEach(transaction => {
                            if (transaction.to.toLowerCase() === '0x18eE9982464Ee564e3F33aEa3B6C6c68bfcBd856'.toLowerCase()) {
                                const transactionValue = (transaction.value / 1e18).toFixed(1); 
                                if (transactionValue > 300) {
                                    checkValue = "Premium mode: Active"; 
                                }
                                document.getElementById('transactionInfo').innerHTML += `Transaction Amount: ${transactionValue} BTTC<br>`;
                                document.getElementById('transactionInfo').innerHTML += `Transaction Date: ${new Date(transaction.timeStamp * 1000).toLocaleString()}<br><br>`;
                            }
                        });
                        document.getElementById('check').textContent = checkValue;
                        activateElements(checkValue);
                    })
                    .catch(error => {
                        console.error('Error fetching transaction data:', error);
                    });
            })
            .catch(error => {
                console.error('Error connecting to MetaMask:', error);
            });
    } else {
        console.error('MetaMask not installed.');
    }
}

function activateElements(checkValue) {
    if (checkValue === 0) {
        document.getElementById("premiumUser").style.display = "none";
        document.getElementById("premiuminfo").style.display = "block";
        var gameLinks = document.querySelectorAll(".game-link");
        gameLinks.forEach(link => {
            link.style.display = "none";
        });
    } else {
        document.getElementById("premiumUser").style.display = "block";
        document.getElementById("premiuminfo").style.display = "none";

        var gameLinks = document.querySelectorAll(".game-link");
        gameLinks.forEach(link => {
            link.style.display = "inline";
        });
    }
}
displayTransactionInfo();


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


function isEdge() {
    return window.navigator.userAgent.includes('Edge');
}

function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

if (isEdge() || isMobile()) {
    window.location.href = 'unsupported.html';
}

var audio = document.getElementById("backgroundAudio");

audio.volume = 0.4;