import { Box } from "@chakra-ui/core";

export default function Container(props) {
  const { children, ...rest } = props;
  return (
    <Box {...rest} px={3} flex={1}>
      {children}
    </Box>
  );
}
