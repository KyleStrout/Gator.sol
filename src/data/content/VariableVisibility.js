export const content = `
## Variable Visibility

### Keywords and Meaning

#### public

Any user can access the value of a state variable. Getter functions are automatically created for public state variables. You can see this in the interact panel 
by deploying the contract and clicking on the button associated with it's variable.

#### private

Can be accessed only in functions that are defined in the contract. 

#### external

Only functions can use the external modifier and thus "external" variables can only be accessed by external functions to get the value of the variable. More on this later.

#### internal

Can only be accessed by functions in this contract and related contracts. They are protected from the outside and state variables are internal by default.
`;
