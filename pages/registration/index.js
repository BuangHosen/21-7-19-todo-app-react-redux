import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Button,
  FormHelperText,
  TextField,
  makeStyles
} from "@material-ui/core";
import * as Yup from "yup";
import { Formik } from "formik";
import Page from "~/components/material/Page";
import { signup } from "~/redux/userDux";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  cardContainer: {
    margin: "auto"
  },
  cardContent: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    minHeight: 400
  }
}));

const Registration = () => {
  const { loading: isSubmitting, error } = useSelector(state => state.user);

  const dispatch = useDispatch();
  const router = useRouter();

  const classes = useStyles();

  function handleRegister(payload) {
    dispatch({
      type: signup.type,
      payload
    });
  }

  const handleBack = () => router.replace("/login");

  return (
    <Page className={classes.root} title="Registration">
      <Container className={classes.cardContainer} maxWidth="sm">
        <Card>
          <CardContent className={classes.cardContent}>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mb={3}>
              <div>
                <Typography color="textPrimary" gutterBottom variant="h2">
                  Register Account
                </Typography>
              </div>
            </Box>
            <Box flexGrow={1} mt={3}>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: ""
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .max(255)
                    .required("Email / User ID is required"),
                  password: Yup.string()
                    .max(255)
                    .required("Password is required")
                })}
                onSubmit={async (values, { setSubmitting }) => {
                  handleRegister(values);
                  setSubmitting(false);
                }}>
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  touched,
                  values
                }) => (
                  <form noValidate onSubmit={handleSubmit}>
                    <TextField
                      error={Boolean(touched.name && errors.name)}
                      fullWidth
                      autoFocus
                      helperText={touched.name && errors.name}
                      label="Fullname"
                      margin="normal"
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.name}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      autoFocus
                      helperText={touched.email && errors.email}
                      label="Email Address / User ID"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      helperText={touched.password && errors.password}
                      label="Password"
                      margin="normal"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    {error?.length > 0 && (
                      <Box mt={3}>
                        <FormHelperText error>{error}</FormHelperText>
                      </Box>
                    )}

                    <Box mt={2}>
                      <Button
                        color="secondary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained">
                        Sign Up
                      </Button>
                    </Box>
                    <Box mt={2}>
                      <Button
                        color="secondary"
                        fullWidth
                        size="large"
                        onClick={handleBack}
                        variant="outlined">
                        Back
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default Registration;
