export const content = `
## Inheritance

Solidity supports multiple inheritance. Contracts can inherit other contract by using the  \`is\`  keyword.

Function that is going to be overridden by a child contract must be declared as  \`virtual\`.

Function that is going to override a parent function must use the keyword  \`override\`.

Order of inheritance is important.

You have to list the parent contracts in the order from “most base-like” to “most derived”.

Create a structure of contracts like the following

\`\`\`
Graph of inheritance 
        A 
       / \\ 
      B   C 
\`\`\`

Contracts can be inherited by using the "is" keyword. For example

\`\`\`contract B is A {}\`\`\`


Try to override foo in one of the contracts!
`;
