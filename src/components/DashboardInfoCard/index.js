import React from "react";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";

import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";
import SportsSoccerRoundedIcon from "@material-ui/icons/SportsSoccerRounded";
import PaymentRoundedIcon from "@material-ui/icons/PaymentRounded";
import SportsRoundedIcon from "@material-ui/icons/SportsRounded";

import useStyles from "./style";

const DashboardInfoCard = ({ loading, title, count, iconType, cardIndex }) => {
  const classes = useStyles();

  const cardColors = [
    "linear-gradient(135deg, #7367f0 0%,#947bf4 100%)",
    "linear-gradient(135deg, #469622 0%,#77bc36 100%)",
    "linear-gradient(135deg, #3bb2b8 0%,#3ec8a8 100%)",
    "linear-gradient(135deg, #f76b1c 0%,#f89234 100%)"
  ];

  if (loading) {
    return (
      <Card className={classes.dashboardCardRoot} variant="outlined">
        <div className={classes.cardContent}>
          <div style={{ width: "8rem" }}>
            <Skeleton
              animation="wave"
              height={12}
              width="70%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={12} width="80%" />
          </div>
          <div style={{ width: "3rem" }}>
            <Skeleton variant="rect" height={30} animation="wave" />
          </div>
        </div>
      </Card>
    );
  }

  const getCardIcon = () => {
    switch (iconType) {
      case "user":
        return <PersonOutlineRoundedIcon />;

      case "futsal":
        return <SportsSoccerRoundedIcon />;

      case "booking":
        return <SportsRoundedIcon />;

      case "payment":
        return <PaymentRoundedIcon />;

      default:
        return "";
    }
  };

  return (
    <Card
      className={classes.dashboardCardRoot}
      variant="outlined"
      style={{ background: cardColors[cardIndex] }}
    >
      <div className={classes.cardContent}>
        <div className={classes.cardDescription}>
          <Typography>{title}</Typography>
          <Typography variant="h4">
            {Math.round(count).toLocaleString()}
          </Typography>
        </div>
        <div className={classes.cardIcon}>{getCardIcon()}</div>
      </div>
    </Card>
  );
};

DashboardInfoCard.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.string,
  count: PropTypes.number,
  iconType: PropTypes.string,
  cardIndex: PropTypes.number
};

export default DashboardInfoCard;
