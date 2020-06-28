import React from "react";
import PropTypes from "prop-types";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import useStyles from "./style";

const TabPanel = props => {
  const classes = useStyles();

  const { children, value, index, type, ...other } = props;
  const isVertical = type === "vertical";

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={
        isVertical
          ? `vertical-tabpanel-${index}`
          : `scrollable-auto-tabpanel-${index}`
      }
      aria-labelledby={
        isVertical ? `vertical-tab-${index}` : `scrollable-auto-tab-${index}`
      }
      className={
        isVertical ? classes.verticalTabPanel : classes.horizontalTabPanel
      }
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const a11yProps = (index, type) => {
  if (type === "vertical") {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`
    };
  }
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
};

const getTabContent = (items, value, type) => {
  return (items || []).map((item, index) => (
    <TabPanel
      value={value}
      index={index}
      type={type}
      key={`panel-item-${index + 1}`}
    >
      {item.content}
    </TabPanel>
  ));
};

export const VerticalTabs = ({ items, value, handleChange, height }) => {
  const classes = useStyles();

  return (
    <div className={classes.verticalRoot} style={{ height: height }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.verticalTabs}
        classes={{
          scroller: classes.verticalScroller,
          indicator: classes.indicator
        }}
      >
        {(items || []).map((item, index) => (
          <Tab
            label={
              <div className={`${classes.tabLabel} vertical`}>
                {item.labelIcon} {item.labelText}
              </div>
            }
            {...a11yProps(index, "vertical")}
            key={item.labelText}
          />
        ))}
      </Tabs>
      {getTabContent(items, value, "vertical")}
    </div>
  );
};

VerticalTabs.propTypes = {
  items: PropTypes.instanceOf(Array),
  value: PropTypes.number,
  handleChange: PropTypes.func,
  height: PropTypes.string
};

export const HorizontalTabs = ({ items, value, handleChange, height }) => {
  const classes = useStyles();

  return (
    <div className={classes.horizontalRoot} style={{ height: height }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        classes={{
          indicator: classes.indicator
        }}
      >
        {(items || []).map((item, index) => (
          <Tab
            label={
              <div className={`${classes.tabLabel} horizontal`}>
                {item.labelIcon} {item.labelText}
              </div>
            }
            {...a11yProps(index, "horizontal")}
            key={item.labelText}
          />
        ))}
      </Tabs>
      {getTabContent(items, value, "horizontal")}
    </div>
  );
};

HorizontalTabs.propTypes = {
  items: PropTypes.instanceOf(Array),
  value: PropTypes.number,
  handleChange: PropTypes.func,
  height: PropTypes.string
};
