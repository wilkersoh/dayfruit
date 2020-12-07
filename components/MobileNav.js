import React, { useEffect } from "react";
import { useRouter } from "next/router";

import SideNav from "./SideNav";
import Hamburger from "@/icons/Hamburger";

import {
  Drawer,
  DrawerBody,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/core";

const useRouteChanged = (callback) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      callback();
      console.log("App is changing to: ", url);
    };

    // close side bar after finish dom load
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, callback]);
};

const MobileNav = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  useRouteChanged(onClose);

  return (
    <>
      <IconButton
        aria-label='Navigation Menu'
        fontSize='20px'
        variant='ghost'
        display={{ sm: "inline-flex", lg: "none" }}
        color='gray.500'
        px={1}
        icon={Hamburger}
        onClick={onToggle}
        border='1px solid transparent'
        _active={{ bg: "teal" }}
        _hover={{ bg: "transparent", border: "1px solid #ffffff29" }}
      />
      <Drawer size='xs' isOpen={isOpen} placement='left' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody p={0}>
            <SideNav top='0' />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNav;
