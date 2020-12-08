import { FacebookShareButton, FacebookIcon } from "react-share";
import { useSearch } from "@/utils/search";
import SideNav from "@/components/SideNav";
import Header from "@/components/Header";
import { Box } from "@chakra-ui/core";

const App = ({ children, ...rest }) => {
  const { search, onSearch } = useSearch();

  return (
    <>
      <Header onSearch={onSearch} search={search} />
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
            minHeight='calc(100vh - 4rem)'>
            <Box {...rest}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default App;
