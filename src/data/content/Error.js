export const content = `## Error

An error will undo all changes made to the state during a transaction.

You can throw an error by calling  \`require\`,  \`revert\`  or  \`assert\`.

-   \`require\`  is used to validate inputs and conditions before execution.
-   \`revert\`  is similar to  \`require\`. See the code below for details.
-   \`assert\`  is used to check for code that should never be false. Failing assertion probably means that there is a bug.

Use custom error to save gas.

### How to use: require

Simply pass a conditino 
    require(condition, message)



<pre>
<code class="language-solidity">
pragma solidity ^0.8.10;
contract Error {
    function testRequire(uint _i) public pure {
        // add a require statement here to throw an error
    }
}
</code></pre>

### When to use: require

Use require when you want to make sure that a condition is met before executing any code. 

One example might be that you only wish the owner of the contract to be able to execute a function.

Add the following code and make it so only you can call the funciotn

<pre>
<code class="language-solidity">
pragma solidity ^0.8.10;
contract Error {
    address owner;
    constructor() public {
        owner = msg.sender;
    }
    function testRequire(uint _i) public pure {
       // how would you use require to
       // make sure that the owner is only 
       // allowed to execute this function?
    }
}
</code></pre>

## How to use: revert

Simply add a revert(message) statement to your function. If it reaches here, it will always rever the transaction. 

## When to use: revert

Revert is useful when the condition to check is complex.

<pre>
<code class="language-solidity">
pragma solidity ^0.8.10;
contract Error {
    address owner;
    constructor() public {
        owner = msg.sender;
    }
    function testRequire(uint _i) public {
       if (_i != 1 && msg.sender != owner) {
           revert("Only owner can call this function with _i != 1");
       }
    }
}
</code></pre>


## How to use: assert

Just add assert(condition) to your function. If it reaches here, it will always revert the transaction.

## When to use: assert

Use assert when a condition should never be false. This can be used to check for bugs.

<pre>
<code class="language-solidity">
pragma solidity ^0.8.10;
contract Error {
   
    function test(uint _i) public pure {
     // try to use an assert statement here
    }
}
</code></pre>




`;
