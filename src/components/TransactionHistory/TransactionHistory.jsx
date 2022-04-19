import React, { useState } from "react";
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
import { useTheme } from "@mui/styles";
const Web3 = require("web3");

const web3 = new Web3(Web3.givenProvider || "ws://localhost:3000");
const TransactionHistory = (props) => {
  const theme = useTheme();
  const [copyText, setCopyText] = useState("Copy");
  const [, setOpen] = useState(false);

  //console.log("compiler data: ", props.compilerData[0].name);

  const handleTooltipClose = () => {
    setTimeout(() => {
      setOpen(false);
      setCopyText("Copy");
    }, 200);
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
          const accordionTitle = `${item.contractName}.(${item.method})`;
          return (
            <Accordion
              key={index}
              sx={{
                //color for interact pannel after/under expansion
                backgroundColor: theme.palette.sideNavAccordion,
                color: theme.palette.textColor,
              }}
            >
              <AccordionSummary
                expandIcon={<Icons.ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  marginBlock: 0,
                  backgroundColor: theme.palette.sideNavAccordion,
                  color: theme.palette.textColor,
                }}
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
                    let keysToSkip = [
                      "transactionIndex",
                      "blocknumber",
                      "transactionIndex",
                      "logsBloom",
                      "type",
                      "blockNumber",
                      "blockHash",
                      "contractName",
                    ];
                    let keyToDisplay = setKeyDisplay(key);
                    let valueToDisplay = value;
                    if (!keysToSkip.includes(key)) {
                      if (key === "logs") {
                        try {
                          const events = props.src[0]?.abi.filter(
                            (item) => item.type === "event"
                          );

                          const decodedLogs = [];
                          for (let i = 0; i < value.length; i++) {
                            const currentValue = value[i];

                            const currentEvent = events.find((item) => {
                              const signature =
                                item.name +
                                "(" +
                                item.inputs
                                  .map(function (input) {
                                    return input.type;
                                  })
                                  .join(",") +
                                ")";
                              const hash = web3.utils.sha3(signature);
                              if (
                                hash.substring(0, 10) ===
                                currentValue.topics[0].substring(0, 10)
                              ) {
                                return true;
                              }
                              return false;
                            });

                            const decodedLog = web3.eth.abi.decodeLog(
                              currentEvent.inputs,
                              currentValue.data,
                              currentValue.topics.slice(0)
                            );
                            decodedLogs.push(decodedLog);
                          }
                          valueToDisplay = decodedLogs.reduce(
                            (previousValue, currentValue) => {
                              let finalString = "";
                              const length = currentValue.__length__;
                              console.log(typeof length);
                              for (let i = 0; i < length; i++) {
                                console.log(`item ${i}`, currentValue[i]);
                                finalString +=
                                  currentValue[i]?.toString() + " ";
                              }
                              return previousValue + finalString + "\n";
                            },
                            ""
                          );
                        } catch (e) {
                          valueToDisplay =
                            "Error getting logs. Please report this to the developer.";
                        }
                      }
                      if (key === "cumulativeGasUsed" || key === "gasUsed") {
                        valueToDisplay = `${parseInt(value, 16)}`;
                      }
                      if (key === "effectiveGasPrice") {
                        valueToDisplay = `${value} (${parseInt(
                          value,
                          16
                        )} Wei)`;
                      }
                      if (key === "status") {
                        if (value === "0x1") {
                          valueToDisplay = "Success";
                        } else {
                          valueToDisplay = "Failure";
                        }
                      }
                      if (key === "result") {
                        console.log("result: ", value);
                        const initialValue = "";
                        valueToDisplay = value;
                      }
                      if (
                        value !== null &&
                        valueToDisplay != null &&
                        valueToDisplay.length > 50
                      ) {
                        // Truncate long strings
                        valueToDisplay =
                          valueToDisplay.substring(0, 50) + "...";
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
  } else if (key === "gasUsed") {
    keyToDisplay = "gas used";
  } else if (key === "transactionHash") {
    keyToDisplay = "transaction hash";
  } else if (key === "effectiveGasPrice") {
    keyToDisplay = "gas price";
  } else if (key === "contractAddress") {
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
