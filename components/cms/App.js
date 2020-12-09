import { Box } from "@chakra-ui/core";
import Header from "@/components/cms/Header";

export default function App({ children, ...rest }) {
  return (
    <Box maxW='1280px'>
      <Header />
      <Box px={4} {...rest}>
        {children}
      </Box>
    </Box>
  );
}
