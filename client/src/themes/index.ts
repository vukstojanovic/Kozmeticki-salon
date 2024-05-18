import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Alfa Slab One', serif`,
    body: `'Abhaya Libre', serif`,
  },

  colors: {
    default: "#E9BFC0",
    secondary: "#E6888A",
    blue: "#343A59",
    darkBlue: "#071720",
    lightGrey: "#D8D7D6",
    darkGrey: "#C1C0BF",
  },

  textStyles: {
    primary: {
      fontFamily: `'Abhaya Libre', serif`,
    },
    secondary: {
      fontFamily: `'Alfa Slab One', serif`,
    },
    tertiary: {
      fontFamily: `'Gellatio Personal Use', sans-serif`,
    },
  },

  components: {
    Heading: {
      variants: {
        customH1: {
          fontFamily: `'Cormorant', serif`,
          color: "default",
          fontSize: "6xl",
          fontWeight: 600,
        },
        customH2: {
          fontFamily: `'Cormorant', serif`,
          color: "blue",
          fontSize: "6xl",
          fontWeight: 600,
        },
        customH1Mob: {
          fontFamily: `'Cormorant', serif`,
          color: "default",
          fontSize: "5xl",
          fontWeight: 600,
        },
        customH2Mob: {
          fontFamily: `'Cormorant', serif`,
          color: "blue",
          fontSize: "5xl",
          fontWeight: 600,
        },
      },
    },
    Button: {
      variants: {
        blue: {
          backgroundColor: "blue",
          color: "white",
          _hover: {
            bg: "blue",
          },
        },
        red: {
          backgroundColor: "red",
          color: "white",
          _hover: {
            bg: "red",
          },
        },
      },
    },
    IconButton: {
      variants: {
        blue: {
          backgroundColor: "#EA5A29",
          color: "white",
          _hover: {
            bg: "#EA5A29",
          },
        },
        red: {
          backgroundColor: "blue",
          color: "white",
          _hover: {
            bg: "blue",
          },
        },
      },
    },
    Drawer: {
      parts: ["dialog", "header", "body"],
      variants: {
        secondary: {
          dialog: {
            maxW: "375px",
          },
        },
      },
    },
  },
});

export default theme;
