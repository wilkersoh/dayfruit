import { Stack, Text, Box, Flex } from "@chakra-ui/core";
import React from "react";

import { ComponentLink } from "@/components/NavLink";
import Filters from "@/components/Filters";
import Home from "@/icons/Hamburger";
import Maps from "@/icons/Map";
import Category from "@/icons/Category";

const SideNavLink = ({ href, children, icon }) => (
  <ComponentLink href={href}>
    <Flex align='center' p={1}>
      <Box as={icon} mr={3} w='24px' />
      <Text fontWeight='bold'>{children}</Text>
    </Flex>
  </ComponentLink>
);

const PageLinks = () => (
  <Stack spacing={0} mb={8}>
    <SideNavLink href='/' icon={Home}>
      {"Home"}
    </SideNavLink>
    <SideNavLink href='/categories' icon={Category}>
      {"Categories"}
    </SideNavLink>
    <SideNavLink href='/maps' icon={Maps}>
      {"Maps"}
    </SideNavLink>
  </Stack>
);

const SideNav = (props) => {
  return (
    <Box
      backgroundColor='gray.800'
      position='fixed'
      left='0'
      width='100%'
      height='100%'
      top='0'
      right='0'
      {...props}>
      <Box
        top='4rem'
        position='relative'
        overflow='hidden'
        borderRightWidth='1px'>
        <Box>
          {/* <SearchBar /> */}
          <Flex
            justify='space-between'
            direction='column'
            height='calc(100vh - 4rem)'
            fontSize='sm'
            p='6'
            overflow='auto'>
            <PageLinks />
            <Filters />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default SideNav;
