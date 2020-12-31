import { FacebookShareButton, FacebookIcon } from "react-share";
import { useQuery } from "@apollo/react-hooks";
import { useSearch } from "@/utils/search";
import SideNav from "@/components/SideNav";
import Header from "@/components/Header";
import { GET_SEARCH_FRUITS_QUERY } from "@/apollo/queries";
import { Box } from "@chakra-ui/core";
import GlobalSearch from "./GlobalSearch";
import { NextSeo } from "next-seo";

const App = ({ children, name, path, ...rest }) => {
  const title = `DayFruit – ${name}`;
  const url = `https://dayfruit.staging.selfpaths.com/${path}`;

  const { search, onSearch } = useSearch();
  const { loading, error, data } = useQuery(GET_SEARCH_FRUITS_QUERY, {
    variables: { searchText: search },
  });
  return (
    <>
      <Header onSearch={onSearch} search={search} />
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
        }}
      />
      <Box>
        <SideNav
          display={["none", null, "block"]}
          maxWidth='18rem'
          width='full'
        />
        <Box pl={[0, null, "18rem"]} mt='4rem'>
          <Box
            as='section'
            height='100%'
            // backgroundColor={"gray.900"}
          >
            <Box {...rest}>
              {data?.getSearchFruits.length > 0 ? (
                <GlobalSearch fruits={data.getSearchFruits} />
              ) : (
                children
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default App;
