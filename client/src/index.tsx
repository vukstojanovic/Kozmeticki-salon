import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import theme from "./themes/index";
import "@fontsource/alfa-slab-one";
import "@fontsource/abhaya-libre";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
};
const queryClient = new QueryClient({ defaultOptions: queryConfig });

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
reportWebVitals();
