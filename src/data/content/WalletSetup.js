import MetaMaskOnboarding from "@metamask/onboarding";
export const content = `## Wallet Setup

#### What is a wallet?

A wallet is a collection of private keys and public keys that can be used to sign transactions. It can also store cryptocurrencies, and can be used to send trasnactions. 

In order to interact with the blockchain, you need to have a wallet. So let's get you started. The button below will begin the onboarding process. 

**Come back to this page after completing the onboarding process!**

<button id="install-metamask">Install Metamask</button>

#### Connecting your wallet to this website

Congrats! You now have a  wallet. You can now connect it to this website.

Click the "connect" button in the navbar to connect your wallet to this website. The metamask extension will open and ask for your signature. 

If you don't see the connect button, please make sure metamask is installed in your browser and refresh the page.
If you don't see it open, please check your extensions tab for the metamask extension to see if there is a pending request. 

#### Getting test ether.

TBD

#### Verifying that you are connected to the blockchain

Now you should be connected and you have aquired some test ether, you should see your public key in the top nav bar. If you don't, please try refreshing the page or restarting your browser. 

To make sure that you are connected to the blockchain, click the "Deploy" button on the right. This will deploy a contract on the blockchain.

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
