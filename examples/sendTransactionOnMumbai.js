require("dotenv").config();
const Web3 = require("web3");
const Ethers = require("ethers");

const mnemonic = process.env.MNEMONIC;
const wallet = Ethers.Wallet.fromMnemonic(mnemonic);
const privKey = wallet.privateKey;
const fromAddress = wallet.address;
const toAddress = "0xF1C37BC188643DF4Bf15Fd437096Eb654d30abc1";

const infuraId = process.env.INFURA_PROJECT_ID;
const infuraApi = "https://polygon-mumbai.infura.io/v3/" + infuraId;
let web3 = new Web3(infuraApi);

async function getAccountBalance(address) {
  let balanceWei = await web3.eth.getBalance(address);
  let balanceEth = web3.utils.fromWei(balanceWei);
  console.log(`The balance of ${address} is ${balanceEth}`);
  return balanceWei;
}

async function signAndSendEther(amount, fromAddress, toAddress, privKey) {
  if (amount < 0) {
    console.error("Please enter an amount >=0");
    return;
  }
  // Get the balances
  let account1_balance = await getAccountBalance(fromAddress);
  let account2_balance = await getAccountBalance(toAddress);
  console.log(`Account 1 balance is: ${account1_balance}`);
  console.log(`Account 2 balance is: ${account2_balance}`);
  // Create a transaction
  let tx = {
    from: fromAddress,
    to: toAddress,
    value: web3.utils.toWei(amount.toString(), "ether"),
    gas: 21000,
  };
  let signedTx = await web3.eth.accounts.signTransaction(tx, privKey);
  await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  account1_balance = await getAccountBalance(fromAddress);
  account2_balance = await getAccountBalance(toAddress);
  console.log("Transaction sent");
  console.log(`Account 1 balance is: ${account1_balance}`);
  console.log(`Account 2 balance is: ${account1_balance}`);
}

signAndSendEther(0.01, fromAddress, toAddress, privKey);
