import { useState } from "react";
import { ReactThemeToggleButton } from "../../utils/ThemeSettings";
import "../../index.css";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

const light = { background: "lightGray" };
const dark = { background: "black" };

const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props) => props.theme.background};
    transition: background 0.4s;
  }
`;

const Wrapper = styled.div`
  display: inline-block;
  padding: 0.5em;
`;

export const ThemeSwitch = () => {
  const [isDark, setDark] = useState(false);
  const theme = isDark ? dark : light;

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <GlobalStyle />
        <ReactThemeToggleButton
          isDark={isDark}
          invertedIconLogic
          onChange={() => setDark((prev) => !prev)}
        />
      </Wrapper>
    </ThemeProvider>
  );
};
