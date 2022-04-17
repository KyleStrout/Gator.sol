export const content = `
# Key Blockchain Components:

## Node:
 A participant computer in a blockchain network that is connected to peers and is capable of validating and propagating new blocks. In the Ethereum network, these nodes run something referred to as “client” software. A client is an implementation of the Ethereum network that verifies all transactions in each block.

## Consensus Algorithm: 
The process by which distinct sections of a network determine a single correct ledger. These are used to establish agreement regarding which blocks are to be added to the chain and which nodes are valid. Ethereum and Blockchain both currently use a proof-of-work consensus algorithm, although Ethereum is expected to update to a proof-of-stake algorithm.

## Decentralized Applications: 
A decentralized application (dapp) is an application built on a decentralized network that combines a smart contract and a frontend user interface. On Ethereum, smart contracts are accessible and transparent – like open APIs – so your dapp can even include a smart contract that someone else has written.

  

These decentralized apps are considered the next generation of web apps (moving away from centralized hosting), here are some attributes of dapps:

### Benefits:

-   Decentralized - dapps operate on Ethereum, an open public decentralized platform where no one person or group has control (For instance, Twitter would be unable to censor tweets if the system was run on a decentralized network, because no one entity would have control to make changes)
    
-   Deterministic - dapps perform the same function irrespective of the environment in which they get executed
    
-   Turing complete - dapps can perform any action given the required resources
    
-   Isolated - dapps are executed in a virtual environment known as Ethereum Virtual Machine so that if the smart contract has a bug, it won’t hamper the normal functioning of the blockchain network
 



### Drawbacks:

-   Maintenance – Dapps can be harder to maintain because the code and data published to the blockchain are harder to modify. It’s hard for developers to make updates to their dapps (or the underlying data stored by a dapp) once they are deployed - even if bugs or security risks are identified in an old version.
    
-   Performance overhead – There is a huge performance overhead, and scaling is really hard. To achieve the level of security, integrity, transparency, and reliability that Ethereum aspires to, every node runs and stores every transaction. On top of this, proof-of-work takes time as well. A back-of-the-envelope calculation puts the overhead at something like 1,000,000x that of standard computation currently. This can be addressed by switching to a proof-of-stake consensus algorithm, although these are still being developed and are not widely tested like proof-of-work is.
    

  
  

## Ledger: 
A series (or chain) of blocks on which transaction details are recorded. All blocks are added to the ledger after suitable authentication and verification by the designated network participants.

  

  

## Mining: 
The process by which an actor in the blockchain network verifies and submits new blocks to the chain is called mining. Which miner is allowed to produce a specific block may be predetermined or, more commonly, miners may simultaneously compete to add the next block to the chain. Miners are rewarded with crypto currency in public networks as payment for the work the machines must do to verify blocks. Once a block is mined, meaning it was verified by a miner, it is propagated throughout the network to all the nodes.

## How it all works:

If you are more interested in the math and more theory of blockchain technology, please check out this youtube video for a great introduction into the inner workings of a proof-of-work blockchain network like bitcoin and ethereum:


<div style= "height: 450px">
<iframe width="560" height="315"
src="https://www.youtube.com/embed/bBC-nXj3Ng4" 
frameborder="0" 
allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
allowfullscreen></iframe>
</div>
`;