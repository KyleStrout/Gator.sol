export const content = `## Payable

Functions and addresses declared  \`payable\`  can receive  \`ether\`  into the contract.

In this lesson, we'll be building a payable contract to deposit and withdrawal ether. Think of this as your own personal ETH bank account.

First, we have to set an your address in the contract. 

<pre>
<code class="language-solidity">
// Payable address can receive Ether
address payable public owner;
</code></pre>

Next, we need a payable contract to add money on deployment. 

<pre>
<code class="language-solidity">
// Payable constructor can receive Ether
constructor() payable {
    owner = payable(msg.sender);
}
</code></pre>

Now, we need a payable function to deposit ether.

<pre>
<code class="language-solidity">
function deposit() public payable {}
</code></pre>


<strong>You may ask, why is this function empty? Well, since we're paying the contract directly, we don't need any logic to store the ether. The contract itself will hold the funds. </strong>

Lastly, we need a payable function to withdraw ether. We haven't gone over "call" yet, but its a way to call a function from another contract. In this case, our self. 

<pre>
<code class="language-solidity">
// Function to withdraw all Ether from this contract.
function withdraw() public {
    // get the amount of Ether stored in this contract
    uint amount = address(this).balance;

    // send all Ether to owner
    // Owner can receive Ether since the address of owner is payable
    (bool success, ) = owner.call{value: amount}("");
    require(success, "Failed to send Ether");
}
</code>
</pre>

`;
