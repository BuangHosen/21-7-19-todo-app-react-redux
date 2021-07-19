import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { cx } from "emotion";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  makeStyles
} from "@material-ui/core";
import Logo from "~/components/material/Logo";
import Account from "./Account";

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    ...(theme.name === "LIGHT"
      ? {
          boxShadow: "none",
          backgroundColor: theme.palette.primary.main
        }
      : {}),
    ...(theme.name === "ONE_DARK"
      ? {
          backgroundColor: theme.palette.background.default
        }
      : {})
  },
  toolbar: {
    minHeight: 64
  }
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  const { profile } = useSelector(state => state.user);

  return (
    <AppBar className={cx(classes.root, className)} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Logo />
        <Box ml={2}>
          <Typography variant="h4" color="inherit">
            {profile?.user?.name}
          </Typography>
        </Box>
        <Box ml={2} flexGrow={1} />
        <Box ml={2}>
          <Account />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

TopBar.defaultProps = {
  onMobileNavOpen: () => {}
};

export default TopBar;
