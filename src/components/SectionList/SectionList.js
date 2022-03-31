import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import {ThemeContext, themes} from '../ThemeContext';

export default function SectionList(props) {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const { customTheme, setCustomTheme } = React.useContext(ThemeContext)

  const handleListItemClick = (event, index) => {
    navigate(`${props.chapterUrl}/${props.sections[index].url}`);
    setSelectedIndex(index);
  };

  return (
    <List disablePadding>
      {props.sections.map((section, index) => (
        <ListItemButton
          sx={{
            color: customTheme.textColor
          }}
          key={index}
          selected={index === selectedIndex}
          onClick={(event) => handleListItemClick(event, index)}
        >
          <ListItemText
            primaryTypographyProps={{
              fontSize: "0.75rem",
              color: customTheme.textColor
            }}
            primary={`${props.chapterIndex}.${index + 1} ${section.title}`}
          />
        </ListItemButton>
      ))}
    </List>
  );
}
