export const content = `
## Functions

Like other languages, functions in Solidity are reusable bits of code that can be run whenenver you want simply by calling the function name. 
They can be called anywhere in your contracts code and can be used to perform any task you want. 

### Syntax

<pre>
<code class="language-solidity">
function <b>name</b>(<b>inputs</b>) <b>scope</b> <b>returns</b> (<b>outputs</b>) {
    // code
}
</code>
</pre>

### Calling functions

To call a function and invoke its code, you must write the functions name and pass in the inputs you want to use later in the contract. Additionally, you can also
invoke functions from the interaction panel.

### Function Parameters

Solidity supports functions with zero, one, or multiple parameters. Multiple parameters are passed in by comma separated values. 

<pre>
<code class="language-solidity">
function <b>name</b>(uint num, string memory myString) <b>scope</b> <b>returns</b> (<b>outputs</b>) {
    // code
}
</code>
</pre>

### Return statements

Functions in Solidity can optionally have return statements. If a function has a return statement, it will return the value of the return statement.
Solidity also supports returning multiple values.

<pre>
<code class="language-solidity">
function <b>name</b>(inputs) <b>scope</b> <b>returns</b> (uint, bool, uint) {
    return (10, false, 4);
}
</code>
</pre>


Returns values can optionally be named and can be returned by name as shown in the example below.

<pre>
<code class="language-solidity">
function <b>name</b>(inputs) <b>scope</b> <b>returns</b> (uint num, bool success) {
    num = 5;
    success = true;
}
</code>
</pre>

## View and Pure Functions

A <b>view</b> function declares that no state changes will be made when the function is called.

A <b>pure</b> function declares that no state variable will be changed or read.




`;
