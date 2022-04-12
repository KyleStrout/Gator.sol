export const content = `## Constructor

A constructor is an optional function that is executed upon contract creation.

Here are examples of how to pass arguments to constructors.

<div>
<pre><code class="language-solidity">
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
// Base contract X
contract X {
    string public name;
    constructor(string memory _name) {
        name = _name;
        surname = _surname;
    }
}
</code>
</pre>
</div>

Try out this code in the code editor on the right.

Add a string to the argument field and click deploy!

Once the contract deploys, you should be able to interact with it and see the value that you passed to the constructor. 

## Some notes about constructors:

The constructor is called when the contract is created.
    
A contract can have only one constructor.

A constructor code is executed once when a contract is created and it is used to initialize contract state.

After a constructor code executed, the final code is deployed to blockchain. This code include public functions and code reachable through public functions. Constructor code or any internal method used only by constructor are not included in final code.

A constructor can be either public or internal.

An internal constructor marks the contract as abstract.

In case, no constructor is defined, a default constructor is present in the contract.


`;
