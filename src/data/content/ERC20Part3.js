export const content = `## ERC20 - Part 3

Next, we will be adding the "mint" and "burn" functions to our contract.

Our mint function will allow us to create new tokens and give them to a user. 

You can define the logic however, you want, but you should increase the balance of the sender by the amount of tokens minted and also increase the total supply by the amount of tokens minted.

Here is an example of how you could implement mint and burn functions: 

<pre>
<code class="language-solidity"> 
function mint(uint amount) external {
    balanceOf[msg.sender] += amount;
    totalSupply += amount;
    emit Transfer(address(0), msg.sender, amount);
}

function burn(uint amount) external {
    balanceOf[msg.sender] -= amount;
    totalSupply -= amount;
    emit Transfer(msg.sender, address(0), amount);
}
</code>
</pre>`;
