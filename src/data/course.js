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
            '// SPDX-License-Identifier: GPL-3.0\npragma solidity >=0.7.0 <0.9.0;\n\ncontract Structs {\n    // init a Car struct that holds data for the make, model, and year manufactured\n    struct Car {\n        string make;\n        string model;\n        uint year;\n    }\n\n    // create a new Car called myCar\n    Car public myCar = Car("Honda", "Civic", 1998);\n\n    function accessMyCarDetails() public view returns (string memory, string memory, uint) {\n        return (myCar.make, myCar.model, myCar.year);\n    }\n\n    function createNewCar(string memory _make, string memory _model, uint _year) public view returns (string memory, string memory, uint) {\n        // Create newCar in memory\n        Car memory newCar;\n        // assign values\n        newCar.make = _make;\n        newCar.model = _model;\n        newCar.year = _year;\n        // return newCar\n        return (newCar.make, newCar.model, newCar.year);\n    }\n}',
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
            "// SPDX-License-Identifier: GPL-3.0\npragma solidity >=0.7.0 <0.9.0;\n\ncontract BasicEnums {\n    // define enum with possible choices/states\n    enum Status {\n        OFF, \n        ON\n    }\n\n    // default is automatically set to the first member (0)\n    Status public status;\n\n    // Set enum member by providing a uint (either 0 or 1)\n    function set(Status _status) public {\n        status = _status;\n    }\n\n    // Returns uint\n    // OFF - 0\n    // ON - 1\n    function get() view public returns (Status) {\n        return status;\n    }\n\n    function reset() public {\n        // resets the status back to default member\n        delete status;\n    }\n\n}\n\ncontract AdvancedEnums {\n    // define enum with possible choices/states\n    enum Role {\n        Member,\n        Premium,\n        Moderator,\n        Admin\n    }\n\n    // define user struct with associated role\n    struct User {\n        string name;\n        Role role;\n    }\n\n    // mapping with key: id and value: User \n    mapping(uint => User) public users;\n\n    function createUser(uint _id, string memory _name, Role _role) public {\n        users[_id] = User(_name, _role);\n    }\n\n    function updateUserRole(uint _id, Role _role) public {\n        // updates user role and returns the new role\n        users[_id].role = _role;\n    }\n\n    // Returns uint\n    // Member - 0\n    // Premium - 1\n    // Moderator - 2\n    // Admin - 3\n    function getUserRole(uint _id) public view returns (Role) {\n        return users[_id].role;\n    }\n\n}",
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
          title: "Constructor",
          url: "constructor",
          hasCodeEditor: true,
          defaultCode:
            "// SPDX-License-Identifier: GPL-3.0\n\npragma solidity >=0.7.0 <0.9.0;\n\n/** \n * @title Ballot\n * @dev Implements voting process along with vote delegation\n */\ncontract Ballot {\n   \n    struct Voter {\n        uint weight; // weight is accumulated by delegation\n        bool voted;  // if true, that person already voted\n        address delegate; // person delegated to\n        uint vote;   // index of the voted proposal\n    }\n\n    struct Proposal {\n        // If you can limit the length to a certain number of bytes, \n        // always use one of bytes1 to bytes32 because they are much cheaper\n        bytes32 name;   // short name (up to 32 bytes)\n        uint voteCount; // number of accumulated votes\n    }\n\n    address public chairperson;\n\n    mapping(address => Voter) public voters;\n\n    Proposal[] public proposals;\n\n    /** \n     * @dev Create a new ballot to choose one of 'proposalNames'.\n     * @param proposalNames names of proposals\n     */\n    constructor(bytes32[] memory proposalNames, bytes32[] memory dogs) {\n        chairperson = msg.sender;\n        voters[chairperson].weight = 1;\n\n        for (uint i = 0; i < proposalNames.length; i++) {\n            // 'Proposal({...})' creates a temporary\n            // Proposal object and 'proposals.push(...)'\n            // appends it to the end of 'proposals'.\n            proposals.push(Proposal({\n                name: proposalNames[i],\n                voteCount: 0\n            }));\n        }\n    }\n    \n    /** \n     * @dev Give 'voter' the right to vote on this ballot. May only be called by 'chairperson'.\n     * @param voter address of voter\n     */\n    function giveRightToVote(address voter) public {\n        require(\n            msg.sender == chairperson,\n            \"Only chairperson can give right to vote.\"\n        );\n        require(\n            !voters[voter].voted,\n            \"The voter already voted.\"\n        );\n        require(voters[voter].weight == 0);\n        voters[voter].weight = 1;\n    }\n\n    /**\n     * @dev Delegate your vote to the voter 'to'.\n     * @param to address to which vote is delegated\n     */\n    function delegate(address to) public {\n        Voter storage sender = voters[msg.sender];\n        require(!sender.voted, \"You already voted.\");\n        require(to != msg.sender, \"Self-delegation is disallowed.\");\n\n        while (voters[to].delegate != address(0)) {\n            to = voters[to].delegate;\n\n            // We found a loop in the delegation, not allowed.\n            require(to != msg.sender, \"Found loop in delegation.\");\n        }\n        sender.voted = true;\n        sender.delegate = to;\n        Voter storage delegate_ = voters[to];\n        if (delegate_.voted) {\n            // If the delegate already voted,\n            // directly add to the number of votes\n            proposals[delegate_.vote].voteCount += sender.weight;\n        } else {\n            // If the delegate did not vote yet,\n            // add to her weight.\n            delegate_.weight += sender.weight;\n        }\n    }\n\n    /**\n     * @dev Give your vote (including votes delegated to you) to proposal 'proposals[proposal].name'.\n     * @param proposal index of proposal in the proposals array\n     */\n    function vote(uint proposal) public {\n        Voter storage sender = voters[msg.sender];\n        require(sender.weight != 0, \"Has no right to vote\");\n        require(!sender.voted, \"Already voted.\");\n        sender.voted = true;\n        sender.vote = proposal;\n\n        // If 'proposal' is out of the range of the array,\n        // this will throw automatically and revert all\n        // changes.\n        proposals[proposal].voteCount += sender.weight;\n    }\n\n    /** \n     * @dev Computes the winning proposal taking all previous votes into account.\n     * @return winningProposal_ index of winning proposal in the proposals array\n     */\n    function winningProposal() public view\n            returns (uint winningProposal_)\n    {\n        uint winningVoteCount = 0;\n        for (uint p = 0; p < proposals.length; p++) {\n            if (proposals[p].voteCount > winningVoteCount) {\n                winningVoteCount = proposals[p].voteCount;\n                winningProposal_ = p;\n            }\n        }\n    }\n\n    /** \n     * @dev Calls winningProposal() function to get the index of the winner contained in the proposals array and then\n     * @return winnerName_ the name of the winner\n     */\n    function winnerName() public view\n            returns (bytes32 winnerName_)\n    {\n        winnerName_ = proposals[winningProposal()].name;\n    }\n}",
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
