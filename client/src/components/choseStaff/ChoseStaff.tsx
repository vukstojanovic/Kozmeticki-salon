import React from "react";
import { Avatar, Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
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
    <Flex direction={"column"}>
      {data?.data?.map((worker: { id: number; name: string }) => {
        return (
          <Box key={worker.id}>
            <Box display="flex" gap={3} padding={3} position="relative">
              <Avatar
                name={worker.name}
                src="https://bit.ly/dan-abramov"
                onClick={() => handleButtonClick(worker.id)}
              />
              {isWorkerActive(worker.id) && (
                <Avatar
                  bg="green"
                  position="absolute"
                  icon={<CheckIcon fontSize="1rem" color="white" />}
                  opacity="75%"
                />
              )}
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  {worker.name}
                </Heading>
                <Text pt="2" fontSize="sm">
                  Manikir
                </Text>
              </Box>
            </Box>
            <Divider orientation="horizontal" />
          </Box>
        );
      })}
    </Flex>
  );
};

export default ChoseStaff;
