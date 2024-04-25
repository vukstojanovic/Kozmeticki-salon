import React from "react";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { Workers } from "../../../services/index";

interface ChoseStaffProps {
  data: any;
  isWorkerActive: (id: string) => boolean;
  handleButtonClick: (id: string) => void;
}

const ChoseStaff: React.FC<ChoseStaffProps> = ({
  data,
  isWorkerActive,
  handleButtonClick,
}) => {
  return (
    <Flex gap={2} justify="center" align="center">
      {data?.data?.map((worker: { id: string; name: string }) => {
        const isActive = isWorkerActive(worker.id);

        return (
          <Flex
            direction="column"
            key={worker.id}
            onClick={() => handleButtonClick(worker.id)}
            align="center"
            gap={2}
            border={isActive ? "1px solid darkgray" : "0.5px solid lightgray"}
            p={2}
            borderRadius="10px"
            cursor="pointer"
          >
            <Image
              borderRadius="full"
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
            />
            <Text>{worker.name}</Text>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default ChoseStaff;
