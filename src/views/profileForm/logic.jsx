import * as yup from "yup";
import { toast } from "react-toastify";

// commonly used regex phone validation
export const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// validation schema for form
export const profileSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string(),
});

// set blank default values
export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export const endpointGET = "https://eotjydxhv3fw5e7.m.pipedream.net";
export const endpointPOST = "https://eo140185ixb6rbq.m.pipedream.net";

// navigate source
export const clickLink = () => {
  window.open(endpointGET, "_blank");
};

// submit data to endpoint
export const submitData = async (values, setIsLoading) => {
  try {
    setIsLoading(true);
    await fetch(endpointPOST, {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      mode: "cors",
      Cache: "default",
    });
    setIsLoading(false);
    toast.success("Submission captured successfully!");
  } catch (e) {
    setIsLoading(false);
    toast.error("Submission Failed!", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};
