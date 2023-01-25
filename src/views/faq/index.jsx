import { Box, useTheme } from "@mui/material";
import Header from "../../components/Elements/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { themeMode } from "../../theme";
import { mockDataFaq } from "../../data/mockData";

const FAQ = () => {
  // set variables
  const theme = useTheme();
  const colors = themeMode(theme.palette.mode);
  return (
    <Box m="20px">
      <Header
        title="FAQ"
        subtitle="Simple accordion mapped with an Array of Objects"
      />
      {!!mockDataFaq &&
        mockDataFaq.length > 0 &&
        mockDataFaq.map((data, index) => {
          return (
            <Accordion key={index} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color={colors.greenAccent[500]} variant="h5">
                  {data.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{data.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </Box>
  );
};

export default FAQ;
