import { useContext, useEffect, useState } from "react";
import { Box, IconButton, useTheme, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { ColorModeContext, themeMode } from "../../../theme";
import {
  gitHubClick,
  emailClick,
  linkedInClick,
  getAutoCompleteOptions,
} from "./logic";

const Topbar = () => {
  // set variables
  const theme = useTheme();
  const colors = themeMode(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([
    { title: "Javascript" },
    { title: "AWS" },
  ]);

  // load auto complete options when component mounts
  useEffect(() => {
    getAutoCompleteOptions(setAutoCompleteOptions);
  }, []);

  // used to configure the autocomplete categories
  const autoCompleteOptionsMapped = autoCompleteOptions.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        {/* Set auto complete */}
        <Autocomplete
          options={autoCompleteOptionsMapped.sort(
            (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
          )}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.title}
          sx={{ width: 200 }}
          renderInput={(params) => (
            <TextField {...params} label="Search Skills" />
          )}
        />
      </Box>

      {/* ICONS */}
      <Box display="flex" justifyContent="space-between" sx={{ width: 150 }}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={linkedInClick}>
          <LinkedInIcon
            sx={{
              fontSize: "25px",
            }}
          />
        </IconButton>
        <IconButton onClick={gitHubClick}>
          <GitHubIcon />
        </IconButton>
        <IconButton onClick={emailClick}>
          <EmailIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
