import { forwardRef } from "react";
import {
  Button,
  Box,
  SimpleGrid,
  useRadio,
  useRadioGroup,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { useController } from "react-hook-form";

const CustomRadio: React.FC<any> = forwardRef(
  ({ id, workerName, image, ...props }, ref) => {
    const { state, getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps({ ref });
    const checkbox = getCheckboxProps();

    return (
      <Box as="label">
        <input {...input} />
        {/* <Button
        as="div"
        {...checkbox}
        cursor="pointer"
        colorScheme={state.isChecked ? "red" : "gray"}
      >
        {children}
      </Button> */}
        <Flex
          {...checkbox}
          direction="column"
          key={id}
          align="center"
          gap={2}
          border={
            state.isChecked ? "1px solid darkgray" : "0.5px solid lightgray"
          }
          p={2}
          borderRadius="10px"
          cursor="pointer"
        >
          <Image
            borderRadius="full"
            src={image || "https://bit.ly/dan-abramov"}
            alt="Dan Abramov"
          />
          <Text color="black">{workerName}</Text>
        </Flex>
      </Box>
    );
  }
);

export const WorkersRadio: React.FC<any> = forwardRef(
  ({ control, name, defaultValue, allWorkers, ...props }, ref) => {
    const { field } = useController({
      name,
      control,
      rules: { required: "Toggle is required" },
      defaultValue,
    });

    const { getRootProps, getRadioProps } = useRadioGroup({
      ...field,
    });

    return (
      <Flex {...getRootProps()}>
        {allWorkers?.data?.map((worker: { id: string; name: string }) => {
          return (
            <CustomRadio
              workerName={worker.name}
              id={worker.id}
              //   image={worker.img}
              {...getRadioProps({ value: worker.id })}
            />
          );
        })}
      </Flex>
    );
  }
);
