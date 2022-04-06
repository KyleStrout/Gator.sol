import * as React from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ReactJson from "react-json-view";
import TransactionHistory from "../TransactionHistory";
import InteractionPanel from "../InteractionPanel";
import ContractContext from "../ContractContext";

// theme
import { useTheme } from "@mui/styles";

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
  const theme = useTheme();

  const { contractData } = React.useContext(ContractContext);
  const [compilerData, setCompilerData] = React.useState([]);
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    //console.log("contractData", contractData);
    const url = window.location.href.split("/").pop();
    const section = contractData[url];
    // console.log("Current transactions: ", section.transactions)
    if (section) {
      setCompilerData(section.compilerData);
      setTransactions(section.transactions);
    } else {
      setCompilerData([]);
      setTransactions([]);
    }
  }, [contractData]);

  const location = useLocation();

  React.useEffect(() => {
    const url = location.pathname.split("/").pop();
    const section = contractData[url];
    if (section) {
      setCompilerData(section.compilerData);
      setTransactions(section.transactions);
    } else {
      setCompilerData([]);
      setTransactions([]);
    }
  }, [location]);

  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        color: theme.palette.textColor,
        border: theme.palette.border,
        width: "100%",
        maxWidth: "40vw",
        overflow: "overlay",
        height: "100%",
      }}
    >
      <Box
        sx={{
          color: theme.palette.textColor,
          position: "sticky",
          top: "0",
          left: "0",
          borderBottom: 1,
          width: "100%",
          backgroundColor: theme.palette.backgroundColor,
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
          <Tab
            label={
              <span style={{ color: theme.palette.outputPanelText }}>
                Output
              </span>
            }
            {...a11yProps(0)}
          />
          <Tab
            label={
              <span style={{ color: theme.palette.outputPanelText }}>
                Interact
              </span>
            }
            {...a11yProps(1)}
          />
          <Tab
            label={
              <span style={{ color: theme.palette.outputPanelText }}>
                History
              </span>
            }
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ReactJson
          src={compilerData}
          theme={theme.palette.outputPanelTheme}
        ></ReactJson>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <InteractionPanel
          src={compilerData}
          deployed={transactions?.length > 0}
        ></InteractionPanel>
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* TODO: get data from json object, put in text like markdown */}
        <TransactionHistory history={transactions} />
      </TabPanel>
    </Box>
  );
}
