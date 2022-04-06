export const content = `## Primitive Data Types

Primitive data types are often "value types" in which the data of the type is stored directly in the memory owned by it. 
Therefore, variables for these types are passed by value and not by reference. 

### Some solidity primitive data types
* int
* uint
* bool
* address
* bytes1 to bytes32 (fixed-size byte arrays)
* string (not a value-type)
* bytes (not a value-type, dynamically sized)

There are a few more than this, but we will start with these for now. It's also worth noting that "undefined" and "null" does not exist in solidity.

### int

Can go from int8 to int256. The default size for int is int256. The size of the int is determined by the number of bits and this can be useful if you want to optimize perfomance.

### uint

Can go from uint8 to uint256. The only difference from int is that uint is unsigned. This means it can only go from 0 to 2^256 and therefore cannot be negative.

### bool

Possible values are true and false. This is self explanatory.

### address

Holds a 20 byte value which is the size of an ethereum address. Must always be prefixed with a 0x.

### bytes1 to bytes32

These value types hold a sequence of bytes from one up to 32 bytes. They are fixed size so they are passed by value and not by reference.

### string

Dynamically sized UTF-8-encoded string. Not a value type.

### bytes

Dynamically sized byte array. Not a value type.






`;
