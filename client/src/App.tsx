import Admin from "./Admin";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import Navbar from "./components/navbar/Navbar";
import { Box } from "@chakra-ui/react";

function App() {
  const [isAuthenticated] = useState(true);

  return (
    <>
      <Navbar />
      <Box
        maxW={
          { base: "100%", md: "720px", lg: "1200px" } as Record<string, string>
        }
        mx="auto"
      >
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/admin"
            element={isAuthenticated ? <Admin /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
