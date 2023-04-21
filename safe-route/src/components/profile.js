import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Avatar, Typography, makeStyles } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.3)",
    borderRadius: 2,
    padding: "10px 20px",
    height: 48,
    minWidth: 120,
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
  },
  avatar: {
    marginRight: theme.spacing(1),
    width: 32,
    height: 32,
  },
  name: {
    fontWeight: 500,
    color: "#484848",
    marginRight: theme.spacing(1),
    fontSize: "1rem",
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: "1.5rem",
    marginRight: theme.spacing(1),
  },
}));

const ProfileButton = () => {
  const classes = useStyles();
  const { isAuthenticated, user } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  const { name, picture } = user;

  return (
    <Button
      variant="contained"
      component={RouterLink}
      to={`/profile/${user.sub}`}
      className={classes.button}
    >
      <Avatar className={classes.avatar} src={picture} alt={name} />
      <Typography variant="subtitle1" className={classes.name}>
        {name}
      </Typography>
      <LocationOnIcon className={classes.icon} />
    </Button>
  );
};

export default ProfileButton;

