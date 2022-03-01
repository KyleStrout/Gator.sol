import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tooltip,
} from "@mui/material";
import * as Icons from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const TransactionHistory = (props) => {
  const [copyText, setCopyText] = useState("Copy");
  const [open, setOpen] = useState(false);

  //console.log("compiler data: ", props.compilerData[0].name);

  const handleTooltipClose = () => {
    setTimeout(() => {
      setOpen(false);
      setCopyText("Copy");
    }, 200);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      {props.history.length === 0 && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"} variant="h6" align="center">
            No history
          </Typography>
        </Box>
      )}
      {props.history.length > 0 &&
        props.history.map((item, index) => {
          const accordionTitle = `${item.contractName}.(${item.method})`
          return (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<Icons.ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography component={"span"} variant="caption">
                  {accordionTitle}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component={"span"}>
                  {Object.entries(item).map(([key, value]) => {
                    /* TODO: order keys based on state mutability
                    DOCS: https://pub.dev/documentation/celodart/latest/contracts/StateMutability.html
                    */
                    let keysToSkip = ['logs', 'transactionIndex', 'blocknumber', 'transactionIndex', 'logsBloom', 'type', 'blockNumber', 'blockHash', 'contractName'];
                    let keyToDisplay = setKeyDisplay(key);
                    let valueToDisplay = value;
                    if (!keysToSkip.includes(key)) {
                      if (key === "cumulativeGasUsed" || key === "gasUsed") {
                        valueToDisplay = `${parseInt(value, 16)}`;
                      }
                      if (key === "effectiveGasPrice") {
                        valueToDisplay = `${value} (${parseInt(value, 16)} Wei)`;
                      }
                      if (key === "status") {
                        if (value === "0x1") {
                          valueToDisplay = "Success";
                        }
                        else {
                          valueToDisplay = "Failure";
                        }
                      }
                      if (key === "result") {
                        console.log("result: ", value);
                        const initialValue = "";
                        valueToDisplay = Object.entries(value).reduce(
                          (previousValue, currentValue) => {
                            if (currentValue[0] === "__length__") {
                              return previousValue;
                            }
                            return previousValue + currentValue[1] + ", "
                          },
                          initialValue
                        );
                      }
                      if (value !== null && valueToDisplay != null && valueToDisplay.length > 50) {
                        // Truncate long strings
                        valueToDisplay = valueToDisplay.substring(0, 50) + "...";
                      }
                      return (
                        <Box
                          key={key}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "1rem",
                          }}
                        >
                          <Typography component={"span"} variant="caption">
                            <b>{keyToDisplay}</b> : {valueToDisplay}
                            <Tooltip
                              arrow
                              title={copyText}
                              onClose={handleTooltipClose}
                            >
                              <IconButton
                                size="small"
                                onClick={() => {
                                  navigator.clipboard.writeText(value);
                                  setCopyText("Copied");
                                }}
                              >
                                <Icons.ContentPaste size="sm" />
                              </IconButton>
                            </Tooltip>
                          </Typography>
                        </Box>
                      );
                    }
                  })}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </React.Fragment>
  );
};

function setKeyDisplay(key) {
  let keyToDisplay = key;
  if (key === "cumulativeGasUsed") {
    keyToDisplay = "cumulative gas used";
  }
  else if (key === "gasUsed") {
    keyToDisplay = "gas used";
  }
  else if (key === "transactionHash") {
    keyToDisplay = "transaction hash";
  }
  else if (key === "effectiveGasPrice") {
    keyToDisplay = "gas price";
  }
  else if (key === "contractAddress") {
    keyToDisplay = "contract address";
  }
  return keyToDisplay;
}

TransactionHistory.propTypes = {
  history: PropTypes.array.isRequired,
};
TransactionHistory.defaultProps = {
  history: [],
};
export default TransactionHistory;
