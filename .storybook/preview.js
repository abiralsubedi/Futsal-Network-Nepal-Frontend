export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      // Array of plain string values or MenuItem shape (see below)
      items: ["light", "dark"]
    }
  }
};

import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import getTheme from "utils/theme";
import { Wrapper } from "components/Common";

const withThemeProvider = (Story, context) => {
  const theme = getTheme(context.globals.theme === "dark");
  console.log("hello in theme");
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Story {...context} />
      </Wrapper>
    </ThemeProvider>
  );
};
export const decorators = [withThemeProvider];
