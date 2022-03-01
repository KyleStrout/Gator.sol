const course = {
  chapters: [
    {
      title: "Course Introduction",
      url: "course-introduction",
      sections: [
        {
          title: "Course Overview",
          url: "course-overview",
          contentUrl: "CourseOverview.js",
          hasCodeEditor: false,
          defaultCode: "",
        },
        {
          title: "Wallet setup",
          url: "wallet-setup",
          contentUrl: "WalletSetup.js",
          hasCodeEditor: true,
          defaultCode:
            'pragma solidity ^0.8.10;\n\ncontract HelloWorld {\n\tstring public greet = "Hello World!";\n}\n\n\n',
        },
      ],
    },
    {
      title: "Blockchain Concepts",
      url: "blockchain-concepts",
      // editor="true",
      sections: [
        {
          title: "What is Blockchain",
          url: "what-is-blockchain",
          hasCodeEditor: false,
          defaultCode: "",
        },
        {
          title: "Pillars of Blockchain",
          url: "pillars-of-blockchain",
          hasCodeEditor: false,
          defaultCode: "",
        },
        {
          title: "Types of Blockchain",
          url: "types-of-blockchain",
          defaultCode: "",
        },
        {
          title: "What is Blockchain",
          url: "what-is-blockchain",
          hasCodeEditor: false,
          defaultCode: "",
        },
      ],
    },
    {
      title: "Smart Contracts",
      url: "smart-contracts",
      sections: [
        {
          title: "What is a Smart Contract",
          url: "what-is-a-smart-contract",
          hasCodeEditor: false,
          defaultCode: "",
        },
        {
          title: "and more...",
          url: "and-more",
          hasCodeEditor: false,
          defaultCode: "",
        },
      ],
    },
    {
      title: "Solidity Basics",
      url: "solidity-basics",
      sections: [
        {
          title: "Hello World",
          url: "solidity-basic",
          contentUrl: "SolidityBasic.js",
          hasCodeEditor: true,
          defaultCode:
            'pragma solidity ^0.8.10;\n\ncontract HelloWorld {\n\tstring public greet = "Hello World!";\n}\n\n\n',
        },
        {
          title: "...and more",
          url: "and-more",
        },
      ],
    },
    {
      title: "Solidity Advanced",
      url: "solidity-advanced",
      sections: [
        {
          title: "Hello World",
          url: "solidity-advanced",
          hasCodeEditor: true,
          defaultCode:
            "// SPDX-License-Identifier: GPL-3.0\n\npragma solidity >=0.7.0 <0.9.0;\n\n/**\n * @title Storage\n * @dev Store & retrieve value in a variable\n */\ncontract Storage {\n\n    uint256 number;\n\n    /**\n     * @dev Store value in variable\n     * @param num value to store\n     */\n    function store(uint256 num) public {\n        number = num;\n    }\n\n    /**\n     * @dev Return value \n     * @return value of 'number'\n     */\n    function retrieve() public view returns (uint256){\n        return number;\n    }\n}",
        },
        {
          title: "...and more",
          url: "and-more",
        },
      ],
    },
  ],
};

export default course;
