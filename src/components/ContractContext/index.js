import React from "react";

// Thinking something like
/*
    {
        "section-url": {
            "compilerData": [],
            "transactionHistory": [],
        },
        for each section...
    }
*/
// key for every url
// value is the compiler data and the transaction history
const ContractContext = React.createContext({});

export const ContractProvider = ContractContext.Provider;

export default ContractContext;
