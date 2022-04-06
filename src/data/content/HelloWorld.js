export const content = `## Hello World Contract

This is a simple Hello World contract meant to get you familiarized with our code editor and UI. Follow the instructions below to learn how to compile, deploy, and interact with your contract.

### Compile and Output Panel

<div>
<pre><code class="language-solidity">// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.10;
contract HelloWorld {
	string greeting = "Hello World!";
	function setGreeting(string memory greet) public {
		greeting = greet;
	}
	function getGreeting() public view returns (string memory){
		return greeting;
	}
}
</code></pre>
</div>


To compile the code, click the "Compile" button and refer to the output panel to check for abi information or any compilation errors. Smart contracts can't be deployed without a valid abi. 

### Deploy

After a succesful compilation, you will be able to deploy your smart contract to the blockchain by clicking the "Deploy" button and then accepting the transaction through Metamask.

### Interaction Panel

In the interaction panel you can interact with your contract by clicking the "getGreeting" button to invoke the function. You can also type in your own greeting in the text field below the "greet" variable and then click the "setGreeting" button to update the greeting. 
You will notice that calling some functions will ask you to accept a new transaction on the blockchain. For example, "setGreeting" requires you to accept a new transaction.

### Transaction History Panel

This panel shows all transactions that have been made on the blockchain. You can click on a transaction to see the details of the transaction.


`;
