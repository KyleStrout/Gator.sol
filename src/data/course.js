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
          contentUrl: "WhatIsBlockchain.js",
          hasCodeEditor: false,
          defaultCode: "",
        },
        {
          title: "Types of Blockchain",
          url: "types-of-blockchain",
          contentUrl: "TypesofBlockchain.js",
          hasCodeEditor: false,
          defaultCode: "",
        },
        {
          title: "Pillars of Blockchain",
          url: "pillars-of-blockchain",
          contentUrl: "PillarsOfBlockChain.js",
          hasCodeEditor: false,
          defaultCode: "",
        },
        {
          title: "Key Blockchain Components",
          url: "key-blockchain-components",
          hasCodeEditor: false,
          contentUrl: "KeyBlockchainComponents.js",
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
          contentUrl: "SmartContracts.js",
          hasCodeEditor: false,
          defaultCode: "",
        },
        {
          title: "How it Works",
          url: "how-it-works",
          contentUrl: "HowItWorks.js",
          hasCodeEditor: true,
          defaultCode:
            '// SPDX-License-Identifier: GPL-3.0\npragma solidity >=0.7.0 <0.9.0;\ncontract HelloWorld {\n    string greeting = "Hello World!";\n    function setGreeting(string memory greet) public {\n        greeting = greet;\n    }\n    function getGreeting() public view returns (string memory){\n        return greeting;\n    }\n}',
        },
        {
          title: "Web3.js",
          url: "web3",
          contentUrl: "SCWeb.js",
          hasCodeEditor: false,
          defaultCode: "",
        },
        {
          title: "Real World Uses",
          url: "real-world-uses",
          contentUrl: "RealUses.js",
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
          contentUrl: "HelloWorld.js",
          hasCodeEditor: true,
          defaultCode: "",
        },
        {
          title: "Primitive Data Types",
          url: "primitive-data-types",
          contentUrl: "PrimitiveDataTypes.js",
          hasCodeEditor: true,
          defaultCode:
            '// SPDX-License-Identifier: GPL-3.0\npragma solidity >=0.7.0 <0.9.0;\n\ncontract DataTypes {\n    // Integer data types\n    int public signedInteger = -1;\n    uint public unsignedInteger = 1;\n    uint8 public unsignedInteger8 = 1;\n\n    // Bool and address data types\n    bool public myBool = true;\n    address public myAddress = 0x26Dc8a529E05ea3cDb1d77079959F28Cd3342A09;\n\n    // Fixed size bytes and string data types\n    bytes32 public myBytes32 = "Hello World!";\n    string public myString = "Hello World!";\n    \n}',
        },
        {
          title: "Variables",
          url: "variables",
          contentUrl: "Variables.js",
          hasCodeEditor: true,
          defaultCode:
            '// SPDX-License-Identifier: GPL-3.0\npragma solidity >=0.7.0 <0.9.0;\n\ncontract Variables {\n    // State variables\n    uint stateNum = 10;\n    // Public state variables automatically come with a getter function\n    // This can be seen in the interact panel\n    string public myString = "State variable";\n\n    function getLocalVariable() public view returns(uint) {\n        // Local variables\n        uint localNum = 20;\n        return localNum;\n    }\n\n    function updateStateVariable(uint newValue) public {\n        // Update state variable\n        stateNum = newValue;\n    }\n\n    function getStateVariable() public view returns(uint) {\n        // Return state variable\n        return stateNum;\n    }\n\n    function globalVariables() public {\n        // Example of global variables\n        address sender = msg.sender;\n        uint timestamp = block.timestamp;\n    }\n}',
        },
        {
          title: "Constants",
          url: "constants",
          contentUrl: "Constants.js",
          hasCodeEditor: true,
          defaultCode:
            '// SPDX-License-Identifier: GPL-3.0\npragma solidity >=0.7.0 <0.9.0;\n\ncontract Constants {\n    string public constant greeting = "Hello World!";\n    uint public constant num = 1;\n    address public constant myAddress = 0xb42515a694854b3eF7c7ebf8db0B475C4EfcC436;\n}',
        },
        {
          title: "Variable Visibility",
          url: "variable-visibility",
          contentUrl: "VariableVisibility.js",
          hasCodeEditor: true,
          defaultCode:
            '// SPDX-License-Identifier: GPL-3.0\npragma solidity >=0.7.0 <0.9.0;\n\ncontract VariableVisibility {\n    string public greeting = "Hello World!";\n    uint private num = 1;\n    // These two are the same since the default for state variables is internal\n    uint defaultNum = 1;\n    uint internal internalNum = 1;\n\n\n    function externalFunction() external view returns (uint) {\n        uint num2 = 1;\n        return num2;\n    }\n}',
        },
        {
          title: "Arrays",
          url: "arrays",
          contentUrl: "Arrays.js",
          hasCodeEditor: true,
          defaultCode:
            '// SPDX-License-Identifier: GPL-3.0\npragma solidity >=0.7.0 <0.9.0;\n\ncontract Arrays {\n    // init array of unsigned integers\n    uint[] public arr;\n    // init array of strings\n    string[] public stringArr = ["apple", "banana", "carrot"];\n\n    function getElementAtIndex(uint i) public view returns (uint) {\n        // access element at index i\n        // since the arrays are public, you can also access elements by index\n        // in the interaction panel\n        return arr[i];\n    }\n\n    function addElement(uint i) public {\n        // push value to end of array\n        arr.push(i);\n    }\n\n    function removeLastElement() public {\n        // remove last element of array\n        arr.pop();\n    }\n\n    function getLength() public view returns (uint) {\n        // get arrary length\n        return arr.length;\n    }\n}',
        },
        {
          title: "Structs",
          url: "structs",
          contentUrl: "Structs.js",
          hasCodeEditor: true,
          defaultCode:
            '// SPDX-License-Identifier: GPL-3.0\npragma solidity >=0.7.0 <0.9.0;\n\ncontract Structs {\n    // init a Car struct that holds data for the make, model, and year manufactured\n    struct Car {\n        string make;\n        string model;\n        uint year;\n    }\n\n    // create a new Car called myCar\n    Car public myCar = Car("Honda", "Civic", 1998);\n\n    function accessMyCarDetails() public view returns (string memory, string memory, uint) {\n        // Another way to access details\n        return (myCar.make, myCar.model, myCar.year);\n    }\n\n    function createNewCar(string memory _make, string memory _model, uint _year) public view returns (string memory, string memory, uint) {\n        // Create newCar in memory\n        Car memory newCar;\n        // assign values\n        newCar.make = _make;\n        newCar.model = _model;\n        newCar.year = _year;\n        // return newCar\n        return (newCar.make, newCar.model, newCar.year);\n    }\n}',
        },
        {
          title: "Mappings",
          url: "mappings",
          contentUrl: "Mappings.js",
          hasCodeEditor: true,
          defaultCode:
            '// SPDX-License-Identifier: GPL-3.0\npragma solidity >=0.7.0 <0.9.0;\n\ncontract Mapping {\n    // init mapping with uint key and string values\n    mapping(uint => string) public names;\n\n    // init mapping with uint key and Person values\n    mapping(uint => Car) public cars;\n\n    // init nested mapping that holds cars that a user owns\n    mapping(address => mapping(uint => Car)) public myCars;\n\n    struct Car {\n        string make;\n        string model;\n    }\n\n    function addCar(uint _id, string memory _make, string memory _model) public {\n        // Normal mapping\n        cars[_id] = Car(_make, _model);\n    }\n\n    function addMyCar(uint _id, string memory _make, string memory _model) public {\n        // msg.sender gets address from person calling the function\n        /* After calling myCars in the interaction panel, you can get your address\n         from the history panel in Mapping.(addMyCar) next to "from:"\n         to use it as the address for myCars in the interaction panel.\n         Or if you\'re connected Metamask, you can get it from the extension. */\n        myCars[msg.sender][_id] = Car(_make, _model);\n    }\n}',
        },
        {
          title: "Enums",
          url: "enums",
          contentUrl: "Enums.js",
          hasCodeEditor: true,
          defaultCode:
            "// SPDX-License-Identifier: GPL-3.0\npragma solidity >=0.7.0 <0.9.0;\n\ncontract BasicEnums {\n    // define enum with possible choices/states\n    enum Status {\n        OFF, \n        ON\n    }\n\n    // default is automatically set to the first member (0)\n    Status public status;\n\n    // Set enum member by providing a uint (either 0 or 1)\n    function setStatus(Status _status) public {\n        status = _status;\n    }\n\n    // Returns uint\n    // OFF - 0\n    // ON - 1\n    function getStatus() view public returns (Status) {\n        return status;\n    }\n\n    function resetStatus() public {\n        // resets the status back to default member\n        delete status;\n    }\n\n}\n\ncontract AdvancedEnums {\n    // define enum with possible choices/states\n    enum Role {\n        Member,\n        Premium,\n        Moderator,\n        Admin\n    }\n\n    // define user struct with associated role\n    struct User {\n        string name;\n        Role role;\n    }\n\n    // mapping with key: id and value: User \n    mapping(uint => User) public users;\n\n    function createUser(uint _id, string memory _name, Role _role) public {\n        users[_id] = User(_name, _role);\n    }\n\n    function updateUserRole(uint _id, Role _role) public {\n        // updates user role and returns the new role\n        users[_id].role = _role;\n    }\n\n    // Returns uint\n    // Member - 0\n    // Premium - 1\n    // Moderator - 2\n    // Admin - 3\n    function getUserRole(uint _id) public view returns (Role) {\n        return users[_id].role;\n    }\n\n}",
        },
        {
          title: "Conditionals and Loops",
          url: "conditionals-loops",
          contentUrl: "ConditonalsAndLoops.js",
          hasCodeEditor: true,
          defaultCode:
            "// SPDX-License-Identifier: GPL-3.0\npragma solidity >=0.7.0 <0.9.0;\n\ncontract ConditionalsAndLoops {\n    function ifElseIfElse(uint num) public view returns (uint) {\n        if (num < 5) {\n            return 0;\n        }\n        else if (num > 5) {\n            return 1;\n        }\n        else {\n            return 2;\n        }\n    }\n\n    function ternaryOperator(uint num) public view returns (uint) {\n        // If num > 5 return 1, else return 2\n        return num > 5 ? 1 : 2;\n    }\n\n    function loops() public {\n        // continue; and break; can also be used inside loops\n        for (uint i = 0; i < 10; i++) {\n            // do something\n        }\n\n        uint x = 0;\n        while (x < 10) {\n            x++;\n        }\n    } \n}",
        },
        {
          title: "Functions",
          url: "functions",
          contentUrl: "Functions.js",
          hasCodeEditor: true,
          defaultCode:
            '// SPDX-License-Identifier: GPL-3.0\npragma solidity >=0.7.0 <0.9.0;\n\ncontract Functions {\n\n    function basicFunction() public {\n        // do something\n    }\n\n    function functionWithParameters(uint num, string memory name) public {\n        num = 2;\n        name = "John";\n    }\n\n    function functionWithReturn() public view returns (uint, string memory) {\n        return (2, "John");\n    }\n\n    function functionWithNamedReturn() \n        public \n        view \n        returns (\n            uint num,\n            bool success\n        ) \n    {\n        num = 5;\n        success = true;\n    }\n\n}',
        },
        {
          title: "Function Modifiers",
          url: "function-modifiers",
          contentUrl: "FunctionModifiers.js",
          hasCodeEditor: true,
          defaultCode:
            '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.10;\n\ncontract FunctionModifier {\n    // We will use these variables to demonstrate how to use\n    // modifiers.\n    address public owner;\n    uint public x = 5;\n    bool public locked;\n\n    constructor() {\n        // Set the transaction sender as the owner of the contract.\n        owner = msg.sender;\n    }\n\n    // Modifier to check that the caller is the owner of\n    // the contract.\n    modifier onlyOwner() {\n        require(msg.sender == owner, "Not owner");\n        // Underscore is a special character only used inside\n        // a function modifier and it tells Solidity to\n        // execute the rest of the code.\n        _;\n    }\n\n    // Modifiers can take inputs. This modifier checks that the\n    // address passed in is not the zero address.\n    modifier validAddress(address _addr) {\n        require(_addr != address(0), "Not valid address");\n        _;\n    }\n\n    function changeOwner(address _newOwner) public onlyOwner validAddress(_newOwner) {\n        owner = _newOwner;\n    }\n\n    // Modifiers can be called before and / or after a function.\n    // This modifier prevents a function from being called while\n    // it is still executing.\n    modifier noReentrancy() {\n        require(!locked, "No reentrancy");\n\n        locked = true;\n        _;\n        locked = false;\n    }\n\n    function decrement(uint i) public noReentrancy {\n        x -= i;\n\n        if (i > 1) {\n            decrement(i - 1);\n        }\n    }\n}',
        },
      ],
    },
    {
      title: "Solidity Advanced",
      url: "solidity-advanced",
      sections: [
        {
          title: "Message Object",
          url: "msg-object",
          contentUrl: "messageObject.js",
          hasCodeEditor: true,
          defaultCode:
            "pragma solidity ^0.8.11;\ncontract Message {\n    function data() public pure returns (bytes calldata) {\n        return msg.data;\n    }\n\n    function gas() public view returns (uint) {\n        return gasleft();\n    }\n\n    function sig() public view returns (bytes4) {\n        return msg.sig;\n    }\n\n    \n    function value() payable public returns (uint) {\n        return msg.value;\n    }\n}",
        },
        {
          title: "Data Locations",
          url: "solidity-advanced",
          contentUrl: "DataLocations.js",
          hasCodeEditor: true,
          defaultCode:
            "pragma solidity ^0.8.10;\ncontract DataLocations {\n    uint[] public arr;\n    mapping(uint => address) map;\n    struct MyStruct {\n        uint foo;\n    }\n    mapping(uint => MyStruct) myStructs;\n    function f() public {\n        // call _f with state variables\n        _f(arr, map, myStructs[1]);\n\n        // get a struct from a mapping\n        MyStruct storage myStruct = myStructs[1];\n        // create a struct in memory\n        MyStruct memory myMemStruct = MyStruct(0);\n    }\n    function _f(\n        uint[] storage _arr,\n        mapping(uint => address) storage _map,\n        MyStruct storage _myStruct\n    ) internal {\n        // do something with storage variables\n    }\n    // You can return memory variables\n    function g(uint[] memory _arr) public returns (uint[] memory) {\n        // do something with memory array\n    }\n    function h(uint[] calldata _arr) external {\n        // do something with calldata array\n    }\n}",
        },
        {
          title: "Constructor",
          url: "constructor",
          hasCodeEditor: true,
          contentUrl: "Constructor.js",
          defaultCode:
            "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.10;\n// Base contract X\ncontract X {\n    string public name;\n    constructor(string memory _name) {\n        name = _name;\n    }\n}",
        },
        {
          title: "Inheritance",
          url: "inheritance",
          hasCodeEditor: true,
          contentUrl: "Inheritance.js",
          defaultCode:
            'pragma solidity ^0.8.10;\ncontract A {\n    function foo() public pure virtual returns (string memory) {\n        return "A";\n    }\n}\n\n// Add contracts "B" and "C" using the keyboard "is"\n\n',
        },
        {
          title: "Function Visiblity",
          url: "function-visibility",
          contentUrl: "FunctionVisibility.js",
          hasCodeEditor: true,
          defaultCode:
            '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.10;\n\ncontract Base {\n    function privateFunc() private pure returns (string memory) {\n        return "private function called";\n    }\n\n    function internalFunc() internal pure returns (string memory) {\n        return "internal function called";\n    }\n\n    function publicFunc() public pure returns (string memory) {\n        return "public function called";\n    }\n\n    function externalFunc() external pure returns (string memory) {\n        return "external function called";\n    }\n\n}',
        },
        {
          title: "Payable",
          url: "payable",
          contentUrl: "Payable.js",
          hasCodeEditor: true,
          defaultCode:
            "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.10;\n\ncontract Payable {\n}",
        },
        {
          title: "Sending Ether",
          url: "sending-ether",
          contentUrl: "SendingEther.js",
          hasCodeEditor: true,
          defaultCode:
            "pragma solidity ^0.8.10;\ncontract SendEther {\n    function sendViaTransfer(address payable _to) public payable {\n        // use .transfer\n    }\n\n    function sendViaSend(address payable _to) public payable {\n        // use .send\n    }\n\n    function sendViaCall(address payable _to) public payable {\n        // use .call\n    }\n}\ncontract ReceiveEther {\n    /*\n    Which function is called, fallback() or receive()?\n\n           send Ether\n               |\n         msg.data is empty?\n              / \\\n            yes  no\n            /     \\\nreceive() exists?  fallback()\n         /   \\\n        yes   no\n        /      \\\n    receive()   fallback()\n    */\n\n    // Function to receive Ether. msg.data must be empty\n    receive() external payable {}\n\n    // Fallback function is called when msg.data is not empty\n    fallback() external payable {}\n\n    function getBalance() public view returns (uint) {\n        return address(this).balance;\n    }\n}",
        },
        {
          title: "Error",
          url: "error",
          hasCodeEditor: true,
          contentUrl: "Error.js",
          defaultCode:
            "\n// SPDX-License-Identifier: MIT\npragma solidity ^0.8.10;\ncontract Error {\n    function test(uint _i) public pure {\n        // add a statement here to throw an error\n    }\n}",
        },
        {
          title: "Events",
          url: "events",
          hasCodeEditor: true,
          contentUrl: "Events.js",
          defaultCode:
            '\n// SPDX-License-Identifier: MIT\npragma solidity ^0.8.10;\n\ncontract Event {\n    // Event declaration\n    // Up to 3 parameters can be indexed.\n    // Indexed parameters helps you filter the logs by the indexed parameter\n    event Log(string message);\n    event AnotherLog();\n\n    function test() public {\n        emit Log("Hello World!");\n        emit Log("Hello EVM!");\n        emit AnotherLog();\n    }\n}',
        },
        {
          title: "...and more",
          url: "and-more",
        },
      ],
    },
    {
      title: "Project 1: ERC20",
      url: "project-erc20",
      sections: [
        {
          title: "Introduction",
          url: "erc20-introduction",
          contentUrl: "Introduction.js",
        },
        {
          title: "IERC20",
          url: "erc20-interface",
          contentUrl: "IERC20.js",
        },
        {
          title: "IERC20",
          url: "erc20-interface",
          contentUrl: "IERC20.js",
        },
        {
          title: "ERC20 - Part 1",
          url: "erc20-part1",
          contentUrl: "ERC20Part1.js",
          hasCodeEditor: true,
          defaultCode:
            "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.10;\n\n// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0/contracts/token/ERC20/IERC20.sol\ninterface IERC20 {\n    function totalSupply() external view returns (uint);\n\n    function balanceOf(address account) external view returns (uint);\n\n    function transfer(address recipient, uint amount) external returns (bool);\n\n    function allowance(address owner, address spender) external view returns (uint);\n\n    function approve(address spender, uint amount) external returns (bool);\n\n    function transferFrom(\n        address sender,\n        address recipient,\n        uint amount\n    ) external returns (bool);\n\n    event Transfer(address indexed from, address indexed to, uint value);\n    event Approval(address indexed owner, address indexed spender, uint value);\n}\n\n// Add your new contract here!",
          answerCode:
            "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.10;\n\n// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0/contracts/token/ERC20/IERC20.sol\ninterface IERC20 {\n    function totalSupply() external view returns (uint);\n\n    function balanceOf(address account) external view returns (uint);\n\n    function transfer(address recipient, uint amount) external returns (bool);\n\n    function allowance(address owner, address spender) external view returns (uint);\n\n    function approve(address spender, uint amount) external returns (bool);\n\n    function transferFrom(\n        address sender,\n        address recipient,\n        uint amount\n    ) external returns (bool);\n\n    event Transfer(address indexed from, address indexed to, uint value);\n    event Approval(address indexed owner, address indexed spender, uint value);\n}\n\n// Add your new contract here!\n\ncontract ERC20 {\n    function totalSupply() external view returns (uint) {}\n\n    function balanceOf(address account) external view returns (uint) {}\n\n    function transfer(address recipient, uint amount) external returns (bool) {}\n\n    function allowance(address owner, address spender) external view returns (uint) {}\n\n    function approve(address spender, uint amount) external returns (bool) {}\n\n    function transferFrom(\n        address sender,\n        address recipient,\n        uint amount\n    ) external returns (bool) {}\n}",
        },
        {
          title: "ERC20 - Part 2",
          url: "erc20-part2",
          contentUrl: "ERC20Part2.js",
          hasCodeEditor: true,
          defaultCode:
            "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.10;\n\n// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0/contracts/token/ERC20/IERC20.sol\ninterface IERC20 {\n    function totalSupply() external view returns (uint);\n\n    function balanceOf(address account) external view returns (uint);\n\n    function transfer(address recipient, uint amount) external returns (bool);\n\n    function allowance(address owner, address spender) external view returns (uint);\n\n    function approve(address spender, uint amount) external returns (bool);\n\n    function transferFrom(\n        address sender,\n        address recipient,\n        uint amount\n    ) external returns (bool);\n\n    event Transfer(address indexed from, address indexed to, uint value);\n    event Approval(address indexed owner, address indexed spender, uint value);\n}\n\n// Add your new contract here!\n\ncontract ERC20 {\n    function totalSupply() external view returns (uint) {}\n\n    function balanceOf(address account) external view returns (uint) {}\n\n    function transfer(address recipient, uint amount) external returns (bool) {}\n\n    function allowance(address owner, address spender) external view returns (uint) {}\n\n    function approve(address spender, uint amount) external returns (bool) {}\n\n    function transferFrom(\n        address sender,\n        address recipient,\n        uint amount\n    ) external returns (bool) {}\n}",
          answerCode:
            '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.10;\n\n// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0/contracts/token/ERC20/IERC20.sol\ninterface IERC20 {\n    function balanceOf(address account) external view returns (uint);\n\n    function transfer(address recipient, uint amount) external returns (bool);\n\n    function allowance(address owner, address spender) external view returns (uint);\n\n    function approve(address spender, uint amount) external returns (bool);\n\n    function transferFrom(\n        address sender,\n        address recipient,\n        uint amount\n    ) external returns (bool);\n\n    event Transfer(address indexed from, address indexed to, uint value);\n    event Approval(address indexed owner, address indexed spender, uint value);\n}\n\n// Add your new contract here!\n\ncontract ERC20 {\n    string public name = "GatorSolCoin";\n    string public symbol = "GSOL";\n    uint8 public decimals = 18;\n\n    function totalSupply() external view returns (uint) {}\n\n    function balanceOf(address account) external view returns (uint) {}\n\n    function transfer(address recipient, uint amount) external returns (bool) {}\n\n    function allowance(address owner, address spender) external view returns (uint) {}\n\n    function approve(address spender, uint amount) external returns (bool) {}\n\n    function transferFrom(\n        address sender,\n        address recipient,\n        uint amount\n    ) external returns (bool) {}\n}',
        },
      ],
    },
  ],
};

export default course;
