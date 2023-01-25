import { Box, useTheme } from "@mui/material";
import GeographyChart from "../../components/Charts/Geography";
import Header from "../../components/Elements/Header";
import { themeMode } from "../../theme";

const Geography = () => {
  // set variables
  const theme = useTheme();
  const colors = themeMode(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Geography" subtitle="Simple Geography Chart" />

      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
        <GeographyChart />
      </Box>
    </Box>
  );
};

export default Geography;
