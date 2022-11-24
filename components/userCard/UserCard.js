
import React from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "/components/card/Card.js";
import CardBody from "/components/card/CardBody.js";
import Button from "/components/CustomButtons/Button.js";

import imagesStyles from "/styles/jss/nextjs-material-kit/imagesStyles.js";

import { cardTitle } from "/styles/jss/nextjs-material-kit.js";

const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);

export default function UserCard({user}) {
  const classes = useStyles();
  return (
    <Card style={{width: "20rem"}}>
      <img
        style={{height: "180px", width: "100%", display: "block"}}
        className={classes.imgCardTop}
        src="..."
        alt="Card-img-cap"
      />
      <CardBody>
        <h4 className={classes.cardTitle}>{user.name + " "+ user.lastname}</h4>
        <p>{user.email}</p>
<p>{user.nombramiento[0]}</p>
<p>fecha de creacion:{user.CreatedAt}</p>
<Button color="primary">Ver</Button>
      </CardBody>
    </Card>
  );
}