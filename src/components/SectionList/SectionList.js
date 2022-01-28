import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function SectionList() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <List
        sx={{
          padding: "0",
        }}
      >
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemText
            primaryTypographyProps={{
              fontSize: "0.75rem",
            }}
            primary="1.1 What is Blockchain"
          />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemText
            primaryTypographyProps={{
              fontSize: "0.75rem",
            }}
            primary="1.2 Pillars of Blockchain"
          />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText
            primaryTypographyProps={{
              fontSize: "0.75rem",
            }}
            primary="1.3 Types of Blockchain"
          />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText
            primaryTypographyProps={{
              fontSize: "0.75rem",
            }}
            primary="1.4 Blockchain Components"
          />
        </ListItemButton>
      </List>
    </Box>
  );
}
