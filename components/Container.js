import { Box } from "@chakra-ui/core";

export default function Container(props) {
  const { children, ...rest } = props;
  return (
    <Box px={3} {...rest}>
      {children}
    </Box>
  );
}
