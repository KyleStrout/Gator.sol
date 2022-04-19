export const content = `
## ERC20 Interface

Below is the interface of the ERC20 token.

<pre>
<code class="language-solidity">
interface IERC20 {
    function transfer(address recipient, uint amount) external returns (bool);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    function mint(uint amount) external;
    function burn(uint amount) external;

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}

</code>
</pre>

Let's dive into each of the methods before moving on.

1. transfer(address recipient, uint amount)
    - This method transfers the given amount of tokens from the sender to the given recipient.

2. approve(address spender, uint amount)
    - This method authorizes contract to spend the given amount of tokens on behalf of the sender.

3. transferFrom(address indexed from, address indexed to, uint value)
    - This method transfers the given amount of tokens from the given address to the given recipient,

4. mint(uint amount)
    - This method allows the sender to mint the given amount of tokens.

5. burn(uint amount)
    - This method allows the sender to burn the given amount of tokens.

7. event Transfer(address indexed from, address indexed to, uint value)
    - This event is triggered when a transfer is made.

8. event Approval(address indexed owner, address indexed spender, uint value)
    - This event is triggered when the allowance of tokens is changed.
`;
