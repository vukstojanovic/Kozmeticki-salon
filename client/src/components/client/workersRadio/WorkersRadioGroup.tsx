import { forwardRef } from "react";
import {
  Box,
  useRadio,
  useRadioGroup,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { useController } from "react-hook-form";

const WorkerRadio: React.FC<any> = forwardRef((props, ref) => {
  const { workerName, id, image } = props;
  const { state, getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps({ ref });
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Flex
        {...checkbox}
        direction="column"
        key={id}
        align="center"
        gap={2}
        border={state.isChecked ? "1px solid darkgray" : "none"}
        p={1}
        borderRadius="10px"
        cursor="pointer"
      >
        <Image
          borderRadius="full"
          h="70px"
          src={image || "https://bit.ly/dan-abramov"}
          alt="Dan Abramov"
        />
        <Text color="black">{workerName}</Text>
      </Flex>
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
    <Flex {...getRootProps()} justify="space-between" align="center">
      {allWorkers?.data?.map((worker: { id: string; name: string }) => {
        return (
          <>
            <WorkerRadio
              key={worker.id}
              workerName={worker.name}
              id={worker.id}
              //   image={worker.img}
              {...getRadioProps({ value: worker.id })}
            />
          </>
        );
      })}
    </Flex>
  );
};
