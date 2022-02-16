import React, {useState, useEffect} from "react";
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

  return (
    <React.Fragment>
    {props.history.length === 0 && (
      <Box sx={{ p: 3 }}>
        <Typography component={'span'} variant="h6" align="center">
          No history
        </Typography>
      </Box>
    )}
    {props.history.length > 0 &&
      props.history.map((item, index) => {
        const accordionTitle = `
          [block:${item.blockNumber} txIndex:
            ${parseInt(item.transactionIndex, 16)}] from: ${item.from.substring(
          0,
          5
        )}...${item.from.substring(
          item.from.length - 5,
          item.from.length
        )} to:${" "}
            ${item.to}
            logs: ${item.logs.length}`;

        return (
          <Accordion>
            <AccordionSummary
              expandIcon={<Icons.ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography component={'span'} variant="caption">{accordionTitle}</Typography>
            </AccordionSummary>
            <AccordionDetails> 
              <Typography component={'span'}>
                {Object.entries(item).map(([key, value]) => {
                  /* TODO: conditionally select stuff with if */
                  let valueToDisplay = value;
                  if (value !== null && value.length > 20) {
                    // Truncate long strings
                    valueToDisplay = value.substring(value.length - 20) + "...";
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
                      <Typography component={'span'} variant="caption">
                        <b>{key}</b> : {valueToDisplay}
                        <Tooltip title={copyText}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              navigator.clipboard.writeText(value);
                              setCopyText("Copied")
                            }}
                          >
                            <Icons.ContentPaste size="sm" />
                          </IconButton>
                        </Tooltip>
                      </Typography>
                    </Box>
                  );
                })}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })
  }
  </React.Fragment>
  )
  
};

TransactionHistory.propTypes = {
  history: PropTypes.array.isRequired,
};
TransactionHistory.defaultProps = {
  history: [],
};
export default TransactionHistory;
