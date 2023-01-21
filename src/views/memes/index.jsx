import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { themeMode } from "../../theme";
import Header from "../../components/Elements/Header";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  useTheme,
  Pagination,
  Stack,
} from "@mui/material";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";

const Memes = ({ setIsLoading }) => {
  const theme = useTheme();
  const colors = themeMode(theme.palette.mode);
  const [memesTotal, setMemesTotal] = useState(0);
  const [memes, setMemes] = useState([]);
  const [paginatedMemes, setPaginatedMemes] = useState([]);
  const [pageSize, setPageSize] = useState(12);
  const endpoint = "https://api.imgflip.com/get_memes";

  // navigate source
  const clickLink = () => {
    window.open(endpoint, "_blank");
  };
  // load memes from api
  const getMemes = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(endpoint);
      let resJson = await res.json().then(({ data }) => data.memes);
      setMemesTotal(resJson.length);
      setMemes(resJson);
      //configure pagination
      resJson = await resJson.slice(0, pageSize);
      setPaginatedMemes(resJson);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error("Failed to load memes!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  // update array when element dragged
  const dragHandler = (sourceId, sourceIndex, targetIndex) => {
    const nextState = swap(paginatedMemes, sourceIndex, targetIndex);
    setPaginatedMemes(nextState);
  };

  // load new array for page change
  const changePageHandler = async (e, page) => {
    setIsLoading(true);
    let temp = memes.slice((page - 1) * pageSize, page * pageSize);
    //console.log({temp}, ((page - 1) * pageSize), page * pageSize)
    setPaginatedMemes(temp);
    setIsLoading(false);
  };

  useEffect(() => {
    getMemes();
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Stack>
          <Typography
            onClick={clickLink}
            variant="h6"
            fontWeight="light"
            sx={{
              color: colors.greenAccent[100],
              mb: 1,
              cursor: "pointer",
              "&:hover": {
                color: colors.greenAccent[400],
              },
            }}
          >
            SOURCE: {endpoint}
          </Typography>
          <Header
            title="MEMES"
            subtitle="Drag & Drop Meme Generator w/ Pagination"
          />
        </Stack>
        <Pagination
          count={Math.ceil(memesTotal / pageSize)}
          variant="outlined"
          color="secondary"
          onChange={changePageHandler}
        />
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {/* Drag & Drop Grid*/}
        <GridContextProvider onChange={dragHandler}>
          <GridDropZone
            id="items"
            boxesPerRow={4}
            rowHeight={400}
            style={{ height: 300 * Math.ceil(memes.length / 4) }}
          >
            {paginatedMemes.map((item) => (
              <GridItem key={item.id}>
                <Card
                  sx={{
                    marginRight: 2,
                    marginBottom: 2,
                    cursor: "-webkit-grab",
                    background: colors.primary[400],
                  }}
                >
                  <CardMedia
                    component="img"
                    height="300px"
                    image={item.url}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      color={colors.grey[100]}
                    >
                      ID# {item.id}
                    </Typography>
                    <Typography variant="body2" color={colors.greenAccent[500]}>
                      {item.name}
                    </Typography>
                  </CardContent>
                </Card>
              </GridItem>
            ))}
          </GridDropZone>
        </GridContextProvider>
      </Box>
    </Box>
  );
};

export default Memes;
