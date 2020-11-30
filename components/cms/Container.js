import { Box } from "@chakra-ui/core";

export default function Container(props) {
  const { children, ...rest } = props;
  return (
    <Box color='black' bg='white' minH='100vh' {...rest}>
      {children}
    </Box>
  );
}
