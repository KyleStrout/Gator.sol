export const content = `
## Message object


-   \`msg.data\`  — The complete  \`calldata\`  which is a non-modifiable, non-persistent area where function arguments are stored and behave mostly like  \`memory\`
-   \`msg.sig\`  — The first four bytes of the calldata for a function that specifies the function to be called (i.e., it’s function identifier)
-   \`msg.value\`  — The amount of wei sent with a message to a contract (wei is a denomination of ETH)

Deprecated:
-   \`msg.gas\`  — Returns the available gas remaining for a current transaction (you can learn more about gas in Ethereum  [here](https://www.cryptocompare.com/coins/guides/what-is-the-gas-in-ethereum/))

Instead, use the "gasleft()" function to get the amount of gas left

### Actions

Call each of the methods on the right to view the message object in action.

For "value",view the transaction on etherscan.io to see the amount of ETH sent with the message.`;
