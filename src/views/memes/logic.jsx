import { toast } from "react-toastify";

export const endpoint = "https://api.imgflip.com/get_memes";

// navigate source
export const clickLink = () => {
  window.open(endpoint, "_blank");
};
// load memes from api
export const getMemes = async (
  setIsLoading,
  setMemes,
  setMemesTotal,
  pageSize,
  setPaginatedMemes
) => {
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
