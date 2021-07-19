/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
import React from "react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Button, TextField } from "@material-ui/core";

export default function TaskForm({ description, onSubmit }) {
  const router = useRouter();

  const handleBack = () => router.replace("/task");

  function handleSubmit(payload) {
    onSubmit(payload);
  }

  return (
    <>
      <Button color="secondary" variant="contained" onClick={handleBack}>
        Back
      </Button>
      <Formik
        initialValues={{ description }}
        onSubmit={async (values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
        enableReinitialize>
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
              error={Boolean(touched.description && errors.description)}
              fullWidth
              autoFocus
              helperText={touched.description && errors.description}
              label="Description"
              margin="normal"
              name="description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              variant="outlined"
            />
            <Button
              color="secondary"
              fullWidth
              size="large"
              type="submit"
              variant="contained">
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
}

TaskForm.defaultProps = {
  description: "",
  onSubmit: () => {
    // do something
  }
};

TaskForm.propTypes = {
  description: PropTypes.string,
  onSubmit: PropTypes.func
};
