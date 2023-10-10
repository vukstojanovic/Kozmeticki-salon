import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Ubuntu', sans-serif`,
    body: `'Ubuntu', sans-serif`,
  },
  textStyles: {
    primary: {
      fontFamily: `'Ubuntu', sans-serif`,
    },
    secondary: {
      fontFamily: `'Montserrat', sans-serif`,
    },
  },
});

export default theme;

