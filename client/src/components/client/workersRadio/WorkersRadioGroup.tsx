import { forwardRef } from "react";
import { Box, useRadio, useRadioGroup, Text, Flex } from "@chakra-ui/react";
import { useController } from "react-hook-form";

const WorkerRadio: React.FC<any> = forwardRef((props, ref) => {
  const { workerName, image } = props;
  const { state, getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps({ ref });
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        borderWidth={state.isChecked ? "0.5px" : "0.5px"}
        borderColor={state.isChecked ? "darkgray" : "transparent"}
        p={1}
        borderRadius="10px"
        cursor="pointer"
        transition="border-width 0.2s ease"
        width="100px"
        height="120px"
      >
        <Box
          borderRadius="full"
          h="70px"
          w="70px"
          backgroundImage={`url(${image || "https://bit.ly/dan-abramov"})`}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
        />
        <Text color="black">{workerName}</Text>
      </Box>
    </Box>
  );
});

export const WorkersRadioGroup: React.FC<any> = ({
  control,
  name,
  allWorkers,
}) => {
  const { field } = useController({
    name,
    control,
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    ...field,
  });

  return (
    <Flex wrap="wrap" {...getRootProps()}>
      {allWorkers?.map(
        (worker: { id: string; name: string; imgUrl: string }) => {
          return (
            <WorkerRadio
              key={worker.id}
              workerName={worker.name}
              image={worker.imgUrl}
              {...getRadioProps({ value: worker.id })}
            />
          );
        }
      )}
    </Flex>
  );
};
