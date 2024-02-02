import { HStack, Link, Text } from "@chakra-ui/react";

const Links = () => {
  const items = ["Usluge", "O Nama", "Kontakt"];

  return (
    <HStack className="links" spacing="50px">
      {items.map(item => (
        <Link href={`#${item}`} key={item} size="xl">
          <Text display="block" fontSize="xl">
            {item}
          </Text>
        </Link>
      ))}
    </HStack>
  );
};

export default Links;
