export default function InteractionPanel(props) {
  // for contract in src
  if (props.deployed) {
    return props.src.map((contract, index) => {
      return (
        <div key={index}>
          <h1>{contract.name}</h1>
          {contract.abi.map((method, index) => {
            return (
              <div key={index}>
                <h2>{method.name}</h2>
                <button>{method.name}</button>
                {method.inputs.map((input, index) => {
                  return (
                    <div key={index}>
                      <h3>{input.name}</h3>
                      <input></input>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      );
    });
  }
  return <></>;
}
