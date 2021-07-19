import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
  Button,
  FormHelperText,
  TextField,
  makeStyles
} from "@material-ui/core";
import * as Yup from "yup";
import { Formik } from "formik";
import Page from "~/components/material/Page";
import { login } from "~/redux/userDux";

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

const Login = () => {
  const { loading: isSubmitting, error } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const classes = useStyles();

  function handleLogin(payload) {
    dispatch({
      type: login.type,
      payload
    });
  }

  return (
    <Page className={classes.root} title="Login">
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
                  Sign in
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Sign in on the internal platform
                </Typography>
              </div>
            </Box>
            <Box flexGrow={1} mt={3}>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  submit: null
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
                  handleLogin({
                    email: values.email,
                    password: values.password
                  });
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
                        Log In
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
            <Box my={3}>
              <Divider />
            </Box>
            <Link href="/registration" passHref>
              <Typography component="a" variant="body2" color="textSecondary">
                Create new account
              </Typography>
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default Login;
