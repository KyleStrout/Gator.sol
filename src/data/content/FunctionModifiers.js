export const content = `
## Function Modifiers

Modifiers are used to modify the behaviour of functions. They can be run before and/or after a function is called.

They are useful for when you want to validate inputs, restrict access, and guard against reentrancy attacks.

### Syntax

<pre>
<code class="language-solidity">
modifier <b>name</b>(<b>inputs</b>) {
    // code here
    // identifier is required and replaces itself with the function code that is called
    _;
}
</code>
</pre>




`;
