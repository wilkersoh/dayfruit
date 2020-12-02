import Header from "@/components/cms/Header";
import { Box } from "@chakra-ui/core";

export default function Container(props) {
  const { children, ...rest } = props;
  return (
    <Box {...rest}>
      <Header />
      <Box px={3}>{children}</Box>
    </Box>
  );
}
