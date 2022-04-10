import MetaMaskOnboarding from "@metamask/onboarding";
export const content = `## Wallet Setup

#### What is a wallet?

A wallet is a collection of private keys and public keys that can be used to sign transactions. It can also store cryptocurrencies, and can be used to send trasnactions. 

In order to interact with the blockchain, you need to have a wallet. So let's get you started. The button below will begin the onboarding process. 

**Come back to this page after completing the onboarding process!**

### Tutorial Video


<div style="height: 450px">
<iframe width="560" height="315"
src="https://www.youtube.com/embed/7p_9weX17xk" 
frameborder="0" 
allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
allowfullscreen></iframe>
</div>


## 1. Install MetaMask Extension and Create A MetaMask account

<button id="install-metamask">Install Metamask</button>

## 2. Connect your wallet to the website

Refresh the page. Click the "connect" button in the navbar to connect your wallet to this website. The metamask extension will open and ask for your signature. 

If you don't see the connect button, please make sure metamask is installed in your browser and refresh the page.
If you don't see it open, please check your extensions tab for the metamask extension to see if there is a pending request. 

## 3. Switch MetaMask Networks

With your MetaMask Extension opened, Click the drop down on top of the window, next to your profile icon. The drop down should say "Ethereum Mainnet" by default.
After clicking the drop down click "Show/hide test networks". This will bring you to an option to show test networks, you must turn this ON. After you turn this on
you can click the dropdown at the top of the MetaMask App again and select the Rinkeby Test Network.


## 4. Get test ETH to run smart contracts
Navigate to a Rinkeby Faucedt, Ex: https://rinkebyfaucet.com/

You then copy your wallet address by opening MetaMask and clicking the copy icon directly above the amount of ETH you have and below the account name. 

You should see a transaction in your metamask extension adding 0.1 ETH in a moment. This should be enough ether to complete the course.

#### Verifying that you are connected to the blockchain

Now you should be connected and you have aquired some test ether, you should see your public key in the top nav bar. If you don't, please try refreshing the page or restarting your browser. 

To make sure that you are connected to the blockchain, click the "Compile" and then the "Deploy" button on the right. This will deploy a contract on the blockchain.

If the contract deploys, you are connected! If not, please try following the instructions above again, or restarting your browser.

Feel free to move onto the next page if you are connected. If not, try redoing the instructions above or contact me at jdriscoll98@ufl.edu with the subject line "Wallet Setup help".`;

export const setupFn = () => {
  const installBtn = document.getElementById("install-metamask");

  // add click event
  installBtn.addEventListener("click", () => {
    const onboarding = new MetaMaskOnboarding();
    onboarding.startOnboarding();
  });
};
