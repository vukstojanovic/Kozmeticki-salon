import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Alfa Slab One', serif`,
    body: `'Abhaya Libre', serif`,
  },

  textStyles: {
    primary: {
      fontFamily: `'Abhaya Libre', serif`,
    },
    secondary: {
      fontFamily: `'Alfa Slab One', serif`,
    },
  },

  components: {
    Drawer: {
      parts: ["dialog", "header", "body"],
      variants: {
        primary: {
          secondary: {
            dialog: {
              maxW: "360px",
            },
          },
        },
      },
    },
  },
});

export default theme;
