import React from "react";

import Button from "./";

export default {
  title: "Components/Button",
  component: Button,
  args: {
    variant: "contained",
    size: "medium",
    color: "primary",

    buttonText: "Button"
  },
  argTypes: {
    variant: {
      control: {
        type: "radio",
        options: ["contained", "outlined", "text"]
      }
    },
    size: {
      control: {
        type: "radio",
        options: ["large", "medium", "small"]
      }
    },
    color: {
      control: {
        type: "select",
        options: ["default", "primary", "secondary"]
      }
    },
    onClick: { action: "clicked" },
    children: {
      control: "text"
    },
    buttonRootClass: {
      table: { disable: true }
    },
    buttonLabelClass: {
      table: { disable: true }
    },
    circularRootClass: {
      control: false
    }
  }
};

const Template = ({ children, ...args }) => (
  <Button {...args}>{children}</Button>
);

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {
  buttonText: "Secondary",
  color: "secondary",
  size: "large"
};
