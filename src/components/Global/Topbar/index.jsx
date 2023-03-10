import { Box, IconButton, useTheme, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ColorModeContext, themeMode } from "../../../theme";
import { mockDataSocials, mockDataEndpoints } from "../../../data/mockData";
//import InputBase from "@mui/material/InputBase";
//import SearchIcon from "@mui/icons-material/Search";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import Autocomplete from "@mui/material/Autocomplete";

const Topbar = ({ setIsLoading }) => {
  const theme = useTheme();
  const colors = themeMode(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [skills, setSkills] = useState([
    { title: "Javascript" },
    { title: "AWS" },
  ]);

  // navigate source
  const gitHubClick = () => {
    window.open(mockDataSocials.gitHub, "_blank");
  };

  const linkedInClick = () => {
    window.open(mockDataSocials.gitHub, "_blank");
  };

  const emailClick = () => {
    window.open(`mailto:${mockDataSocials.email}`);
  };
  // load skills from api
  const getSkills = async () => {
    try {
      //setIsLoading(true);
      const res = await fetch(`${mockDataEndpoints.api}/skills`);
      let resJson = await res.json().then((data) => data.result);
      // convert data object to object needed for autoComplete
      let objTitles = Object.keys(resJson).map((key) => {
        return { title: resJson[key].title };
      });
      setSkills([...objTitles]);
      console.log([...objTitles]);
      //setIsLoading(false);
    } catch (e) {
      // setIsLoading(false);
      toast.error("Failed to load skills!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  // used to configure the autocomplete categories
  const autoCompleteOptions = skills.map((option) => {
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
        {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" /> */}
        <Autocomplete
          options={autoCompleteOptions.sort(
            (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
          )}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.title}
          sx={{ width: 200 }}
          renderInput={(params) => (
            <TextField {...params} label="Search Skills" />
          )}
        />
        {/* <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
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
        {/* <IconButton component={Link} to="/profileForm">
          <SettingsOutlinedIcon />
        </IconButton> */}
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
