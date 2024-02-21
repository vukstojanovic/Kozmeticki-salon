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

interface ChoseStaffProps {
  data: any;
  isWorkerActive: any;
  handleButtonClick: any;
}

const ChoseStaff: React.FC<ChoseStaffProps> = ({
  data,
  isWorkerActive,
  handleButtonClick,
}) => {
  return (
    <Flex gap={3}>
      {data?.data?.map((worker: { id: number; name: string }) => {
        return (
          <Flex
            direction="column"
            key={worker.id}
            onClick={() => handleButtonClick(worker.id)}
            align="center"
            gap={2}
          >
            <Image
              borderRadius="full"
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
            />
            {/* {isWorkerActive(worker.id) && (
                <Avatar
                  bg="green"
                  position="absolute"
                  icon={<CheckIcon fontSize="1rem" color="white" />}
                  opacity="75%"
                />
              )} */}
            <Text>{worker.name}</Text>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default ChoseStaff;
