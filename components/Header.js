import NextLink from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
} from "@chakra-ui/core";

import MobileNav from "./MobileNav";

const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  };

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  return keyPressed;
};

const Header = (props) => {
  const { onSearch, search, ...rest } = props;
  const inputRef = useRef();
  const slashPress = useKeyPress("/");
  const router = useRouter();

  if (slashPress) {
    inputRef.current.focus();
  }

  const onPreviousPage = () => {
    router.back();
  };

  return (
    <Box
      pos='fixed'
      as='header'
      top='0'
      zIndex='4'
      bg={"gray.800"}
      left='0'
      right='0'
      borderBottomWidth='1px'
      width='full'
      height='4rem'
      p={3}
      {...rest}>
      <Box width='full' mx='auto' height='100%'>
        <Flex size='100%' align='center' justify='space-between'>
          <NextLink href='/' passHref>
            <Box
              as='a'
              d='block'
              href='/'
              aria-label='daydrink, Back to homepage'>
              DAYFRUIT
            </Box>
          </NextLink>
          <InputGroup
            display={["none", "none", "block"]}
            width='100%'
            ml={16}
            mr={16}>
            <InputLeftElement children={<Icon name='ch' color='gray.500' />} />
            <Input
              type='text'
              onChange={onSearch}
              value={search}
              ref={inputRef}
              autoFocus={slashPress}
              placeholder={`Press '/' to search for fruit name or fruit country`}
              bg={"gray.700"}
              borderColor='transparent'
              color='#FFF'
              _focus={{ borderColor: "gray.600" }}
            />
          </InputGroup>

          <Flex align='center' color='gray.500'>
            <Box position='relative'>
              <IconButton
                onClick={onPreviousPage}
                aria-label={`Back to previous section`}
                variant='ghost'
                color='current'
                mr={1}
                fontSize='20px'
                icon={"arrow-back"}
              />
            </Box>
            <MobileNav />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
