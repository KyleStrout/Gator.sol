export const content = `## ERC20 - Part 4

In this section, we will implement the transfer, approve and transferFrom functions.

After this, you should be able to transfer tokens to another user, approve tokens to be transferred to another user, and transfer tokens from one user to another.

Here are some examples of how to implement these functions:

<pre>
<code class="language-solidity">

function transfer(address recipient, uint amount) external returns (bool) {
    balanceOf[msg.sender] -= amount;
    balanceOf[recipient] += amount;
    emit Transfer(msg.sender, recipient, amount);
    return true;
}

function approve(address spender, uint amount) external returns (bool) {
    allowance[msg.sender][spender] = amount;
    emit Approval(msg.sender, spender, amount);
    return true;
}

function transferFrom(
    address sender,
    address recipient,
    uint amount
) external returns (bool) {
    allowance[sender][msg.sender] -= amount;
    balanceOf[sender] -= amount;
    balanceOf[recipient] += amount;
    emit Transfer(sender, recipient, amount);
    return true;
}
</code></pre>

### Note: These methods do not use any security such as checking balances or verifying the sender. Can you think of a way to implement these functions to ensure that they are secure?`;
