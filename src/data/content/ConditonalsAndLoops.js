export const content = `
## Conditionals

Like other common languages, Solidity supports conditional statements <b>if</b>, <b>else if</b>, and <b>else</b>.
Additionally, Solidity supports the logical operators <b>&&</b> (AND), <b>||</b> (OR), and <b>!</b> (NOT).

Solidity also includes a ternary operator, which is a shorthand for an if-else statement.

More info can be found on operators [here](https://www.tutorialspoint.com/solidity/solidity_operators.htm). 

## Loops

Solidity includes loops such as <b>for</b>, <b>while</b>, and <b>do while</b>.

Be careful using loops because an infinite loop can cause your contract to hit the gas limit which will cause the transaction to fail.

### Syntax

<pre>
<code class="language-solidity">
for (int i = 0; i < 10; i++) {
    // do something
 }

 while (condition) {
    // do something
  }

do {
    // do something
} while (condition);
</code>
</pre>

`;
