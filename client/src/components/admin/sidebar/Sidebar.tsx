import React from "react";
import { Flex, IconButton, Stack, Img, Divider } from "@chakra-ui/react";
import { FiMenu, FiLogOut } from "react-icons/fi";
import NavItem from "./NavItem";
import logo from "../../../assets/logo.png";
import logoCircle2 from "../../../assets/logoCircle2.png";
import { IconType } from "react-icons";

interface SidebarProps {
  setActiveTab: (tab: string) => void;
  navSize: "small" | "large";
  changeNavSize: (size: "small" | "large") => void;
  items: { name: string; icon: IconType }[];
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  setActiveTab,
  navSize,
  changeNavSize,
  items,
  onLogout,
}) => {
  return (
    <Flex
      pos="fixed"
      left="5"
      h="95vh"
      mt="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize === "small" ? "15px" : "30px"}
      w={navSize === "small" ? "75px" : "250px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        as="nav"
      >
        <IconButton
          background="none"
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          aria-label="Toggle Navigation"
          onClick={() => changeNavSize(navSize === "small" ? "large" : "small")}
        />
        <Stack spacing={2} w="full" mt={8} gap={4}>
          {items.map((item, index) => (
            <NavItem
              key={index}
              navSize={navSize}
              icon={item.icon}
              title={item.name}
              onClick={() => setActiveTab(item.name)}
            />
          ))}
        </Stack>
      </Flex>

      <Flex p="5%" flexDir="column" w="100%" alignItems="center" mb={4}>
        <NavItem
          navSize={navSize}
          icon={FiLogOut}
          title="Logout"
          onClick={onLogout}
        />
        <Divider mt={4} display={navSize === "small" ? "none" : "flex"} />
        <Flex mt={4} align="center">
          <Img
            src={navSize === "small" ? logoCircle2 : logo}
            alt="logo"
            h={navSize === "small" ? "unset" : 107}
            w={navSize === "small" ? "unset" : 150}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
