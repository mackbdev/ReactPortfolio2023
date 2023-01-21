import {
  Box,
  Button,
  TextField,
  Stack,
  useTheme,
  Typography,
} from "@mui/material";
import { themeMode } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Elements/Header";

// commonly used regex phone validation
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// validation schema for form
const profileSchema = yup.object().shape({
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
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

const endpointGET = "https://eotjydxhv3fw5e7.m.pipedream.net";
const endpointPOST = "https://eo140185ixb6rbq.m.pipedream.net";

// navigate source
const clickLink = () => {
  window.open(endpointGET, "_blank");
};
const ProfileForm = ({ setIsLoading }) => {
  const theme = useTheme();
  const colors = themeMode(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
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

  return (
    <Box m="20px">
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
          GET DATA: {endpointGET}
        </Typography>
        <Header
          title="UPDATE PROFILE"
          subtitle="Form Capture Validation w/ POST to Endpoint"
        />
      </Stack>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={profileSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Confirm Update
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ProfileForm;
