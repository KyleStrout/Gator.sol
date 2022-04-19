export const content = `

## Visibility

Functions and state variables have to declare whether they are accessible by other contracts.

Functions can be declared as

-   \`public\`  - any contract and account can call
-   \`private\`  - can only be called from inside the contract that defines the function
-   \`internal\`-  can only be called from inside contract that inherits the  \`internal\`  function
-   \`external\`  - can only be called from other contracts and accounts

State variables can be declared as  \`public\`,  \`private\`, or  \`internal\`  but not  \`external\`.

Deploy the contract and you will be able to interact with only the public and external functions.

Can you find a way to interact with those methods? (Hint: add new methods to the contract OR use inheritance )`;
