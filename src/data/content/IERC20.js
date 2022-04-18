export const content = `
## ERC20 Interface

Below is the interface of the ERC20 token.

<pre>
<code class="language-solidity">
interface IERC20 {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}

</code>
</pre>

Let's dive into each of the methods before moving on.

1. totalSupply()

    - This method returns the total amount of tokens in existence.

2. balanceOf(address account)
    - This method returns the balance of a given account.

3. transfer(address recipient, uint amount)
    - This method transfers the given amount of tokens from the sender to the given recipient.

4. allowance(address owner, address spender)
    - This method returns the amount of tokens that the given owner is allowed to spend on behalf of the given spender.

5. approve(address spender, uint amount)
    - This method authorizes contract to spend the given amount of tokens on behalf of the sender.

6. transferFrom(address indexed from, address indexed to, uint value)
    - This method transfers the given amount of tokens from the given address to the given recipient,

7. event Transfer(address indexed from, address indexed to, uint value)
    - This event is triggered when a transfer is made.

8. event Approval(address indexed owner, address indexed spender, uint value)
    - This event is triggered when the allowance of tokens is changed.
`;
