export const content = `
# How does a Smart Contract Work?

## Compilation

Smart contracts on Solidity have a few requirements. They must be compiled before being deployed. 
This needs to occur so the Ethereum Virtual Machine (EVM) can actually understand the contract. A smart 
contract starts with code that should look familiar, there is an example on the right side of the 
page. Compilation turns this code into byte code. The compiler then produce the ABI, or Application 
Binary Interface, which is where important information about the contract is stored.

## Ethereum Virtual Machine (EVM)

As mentioned above, the EVM needs to understand the contract. The EVM is a software platform that allows 
developers to create Ethereum programs. A virtual machine state is used in order to create a level of 
abstraction for the users. The machine is made up of multiple computers across the network communicating with each other.

## Gas

There is a cost for creating and interacting with smart contracts known as gas. This is because certain 
programs are more complex for others. For example, image a very complex program that has an endless while 
loop. This program would incur a greater gas fee than a very simple 'hello world' program, because less 
time and computing power is needed. Many operations would use real Ethereum as a way of paying for gas, 
but since this is a tutorial course, the free Rinkeby test network will be used instead.

The example on the right is a very simple example of a smart contract. After clicking "compile" view the "output" 
tab. This is some of the information that is stored in the contract; at the very end, there is a bytecode 
string, similar to what the EVM would be reading.

`;