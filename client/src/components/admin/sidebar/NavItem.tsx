import React from "react";
import { Flex, Text, Icon, Link, Menu } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface NavItemProps {
  icon: IconType;
  title: string;
  active?: boolean;
  navSize: "small" | "large";
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  title,
  active,
  navSize,
  onClick,
}) => {
  return (
    <Flex
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          backgroundColor={active ? "#AEC8CA" : "transparent"}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "lightGray" }}
          w={navSize === "large" ? "100%" : "auto"}
          onClick={onClick}
        >
          <Flex alignItems="center">
            <Icon
              as={icon}
              fontSize="xl"
              color={active ? "#82AAAD" : "gray.500"}
            />
            <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
              {title}
            </Text>
          </Flex>
        </Link>
      </Menu>
    </Flex>
  );
};

export default NavItem;
