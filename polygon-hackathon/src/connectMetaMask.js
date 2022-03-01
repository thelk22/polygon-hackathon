import React, {useState} from 'react'
import {ethers} from 'ethers'
import { WebBundlr } from "@bundlr-network/client";

import './connectMetaMask.css'
import './App.css'

const ConnectMetaMask = () => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
				getAccountBalance(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	const uploadHandler = () => {

		const initialiseBundlr = async () => {
			currencyName = "matic"
			const bundlr = new WebBundlr("https://node1.bundlr.network", "matic", window.ethereum);
			await bundlr.ready();
			return bundlr; // done!
		}

		const bundlr = initialiseBundlr();

		const data = "string";
		const tags = [{name: "Content-Type", value: "text/plain"}];
		const transaction = bundlr.createTransaction(data, { tags });

		transaction.sign();
		transaction.upload();

		// after uploading 
		const id = (transaction.upload).data.id;

		alert(id);
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		getAccountBalance(newAccount.toString());
	}

	const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance));
		})
		.catch(error => {
			setErrorMessage(error.message);
		});
	};

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}


	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);
	window.ethereum.on('chainChanged', chainChangedHandler);
	
	return (
		<div className='connectMetaMask' class="center_middle">
		<h4> {"Wallet Pay DApp"} </h4>
			<button class = "button" onClick={connectWalletHandler}>{connButtonText}</button>
			<div className='accountDisplay'>
				<h3>Address: {defaultAccount}</h3>
			</div>
			<div className='balanceDisplay'>
				<h3>Balance: {userBalance} MATIC </h3>
			<button class = "button" onClick={uploadHandler}> Upload to Bundlr</button>
			</div>
			{errorMessage}
		</div>
	);
}

export default ConnectMetaMask;

