import { useColorMode, Box } from "@chakra-ui/core";

import SideNav from "@/components/SideNav";
import Header from "@/components/Header";

const App = ({ children, ...rest }) => {
  const { colorMode } = useColorMode();
  // const { search, onSearch } = useSearch();

  return (
    <>
      <Header />
      <Box>
        <SideNav
          display={["none", null, "block"]}
          maxWidth='18rem'
          width='full'
        />
        <Box pl={[0, null, "18rem"]} mt='4rem'>
          <Box
            as='section'
            backgroundColor={"gray.900"}
            minHeight='calc(100vh - 4rem)'
            style={{ border: "2px solid blue" }}>
            <Box {...rest}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default App;
