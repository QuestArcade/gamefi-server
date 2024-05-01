function checkMetaMaskConnection() {
    if (typeof window.ethereum !== 'undefined') {
        ethereum.request({ method: 'eth_accounts' })
        .then(accounts => {
            if (accounts.length === 0) {
                window.location.href = '/../index.html';
            } else {
                console.log('User is connected to MetaMask');
            }
        })
        .catch(err => {
            console.error('Error:', err);
        });
    } else {
        console.log('MetaMask is not installed');
    }
  }

  setInterval(checkMetaMaskConnection, 2000);
  checkMetaMaskConnection();