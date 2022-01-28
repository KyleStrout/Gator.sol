// Material Components
import { Box, Typography } from "@mui/material";

export default function CoursePage(props) {
  return (
    <Box>
      <Typography variant="h1">{props.title}</Typography>
    </Box>
  );
}
