const Web3 = require('web3');

let web3 = new Web3('ws://localhost:8546');

const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');

ethereumButton.addEventListener('click', () => {
  getAccount();
});

async function getAccount() {
  const accounts = await web3.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  showAccount.innerHTML = account;
}