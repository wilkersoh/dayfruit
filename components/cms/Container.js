import Header from "@/components/cms/Header";
import { Box } from "@chakra-ui/core";

export default function Container(props) {
  const { children, ...rest } = props;
  return (
    <Box width='full' maxW='1280px' mx='auto'>
      <Header px={{ sm: 4, lg: 8 }} />
      <Box px={3} {...rest}>
        {children}
      </Box>
    </Box>
  );
}
