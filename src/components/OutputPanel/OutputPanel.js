import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ReactJson from "react-json-view";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import * as Icons from "@mui/icons-material";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function OutputPanel(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "40vw",
        overflow: "scroll",
        height: "100%",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: "0",
          left: "0",
          borderBottom: 1,
          width: "100%",
          backgroundColor: "white",
          zIndex: "1",
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="output panel"
          sx={{
            position: "sticky",
            top: 0,
          }}
        >
          <Tab label="Output " {...a11yProps(0)} />
          <Tab label="Interact" {...a11yProps(1)} />
          <Tab label="History" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ReactJson src={props.output}></ReactJson>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Interactions
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* TODO: get data from json object, put in text like markdown */}

        {props.history &&
          props.history.map((item, index) => {
            const accordionTitle = `
            [block:${item.blockNumber} txIndex:
              ${parseInt(
                item.transactionIndex,
                16
              )}] from: ${item.from.substring(0, 5)}...${item.from.substring(
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
                  <Typography variant="caption">{accordionTitle}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {Object.entries(item).map(([key, value]) => {
                      /* TODO: conditionally select stuff with if */
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
                          <Typography variant="caption">
                            <b>{key}</b> : {value}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </TabPanel>
    </Box>
  );
}
