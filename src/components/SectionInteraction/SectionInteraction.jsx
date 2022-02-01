import { Box } from "@mui/material";

export default function SectionInteraction(props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      width="100%"
      height="calc(100% - 2rem)"
      sx={{
        border: "1px solid red",
        margin: "1rem",
      }}
      {...props}
    />
  );
}
