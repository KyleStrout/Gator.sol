export const content = `
## Arrays

Arrays are a collection of values. The elements can be any type and the arrays can have a fixed size or a dynamic size. Luckily, they don't differ much from arrays in other languages.
Arrays in solidity are similar to arrays in JavaScript in that they have push, pop, and length functions associated with them.

### Syntax

<pre>
<code class="language-solidity">
type[] name;
type[] <b>name</b> = [<b>value</b>, <b>value</b>, ...];
type[fixedSize] name;
type[fixedSize] <b>name</b> = [<b>value</b>, <b>value</b>, ...];

name.push(value);
name.pop();
name.length;
name[index];

// create array in memory, only fixed size can be created
type[] name = new type[fixedSize];
</code>
</pre>

`;
