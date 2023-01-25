import { toast } from "react-toastify";
import { mockDataSocials, mockDataEndpoints } from "../../../data/mockData";

// navigate source
export const gitHubClick = () => {
  window.open(mockDataSocials.gitHub, "_blank");
};

export const linkedInClick = () => {
  window.open(mockDataSocials.gitHub, "_blank");
};

export const emailClick = () => {
  window.open(`mailto:${mockDataSocials.email}`);
};

// load options for auto complete from api
export const getAutoCompleteOptions = async (setAutoCompleteOptions) => {
  try {
    //setIsLoading(true);
    const res = await fetch(`${mockDataEndpoints.api}/skills`);
    let resJson = await res.json().then((data) => data.result);
    // convert data object to object needed for autoComplete
    let objTitles = Object.keys(resJson).map((key) => {
      return { title: resJson[key].title };
    });
    setAutoCompleteOptions([...objTitles]);
    //console.log([...objTitles]);
    //setIsLoading(false);
  } catch (e) {
    // setIsLoading(false);
    toast.error("Failed to load skills!", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};
