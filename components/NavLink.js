import { Box, PseudoBox } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { cloneElement, forwardRef } from "react";

const NavLink = ({ children, ...props }) => {
  const router = useRouter();
  let isActive = false;

  if (router.pathname === props.href) {
    isActive = true;
  }
  /**
    2. console.lo(props) = {href:"/home"} all PageLinks function route path
    3. if isActive is true, mean it is same page link
   */
  return (
    <NextLink passHref {...props}>
      {typeof children === "function" ? children(isActive) : children}
    </NextLink>
  );
};

export const stringToUrl = (str, path = "/") => {
  return `${path}${str.toLowerCase().split(" ").join("-")}`;
};

export const SideNavLink = forwardRef(({ children, ...props }, ref) => {
  /**
    b. children coming from ComponentLink ...props （children 里面是 SideNav里的SideNavLink）
    console.log(props) return all SideNavLink props
  */
  return (
    <PseudoBox
      ref={ref}
      as='a'
      display='flex'
      cursor='pointer'
      align='center'
      px='2'
      py='1'
      transition='all 0.2s'
      fontWeight='medium'
      color={"whiteAlpha.700"}
      outline='none'
      _focus={{ shadow: "outline" }}
      _notFirst={{ mt: 1 }}
      {...props}>
      <Box>{children}</Box>
    </PseudoBox>
  );
});

export const TopNavLink = forwardRef(({ href, ...props }, ref) => {
  return (
    <NavLink href={href}>
      {(isActive) => (
        <SideNavLink
          ref={ref}
          aria-current={isActive ? "page" : undefined}
          _hover={{ color: !isActive ? "inherit" : null }}
          {...(isActive && { color: "teal.500", fontWeight: "semibold" })}
          {...props}
        />
      )}
    </NavLink>
  );
});

export const ComponentLink = forwardRef(({ href, ...props }, ref) => {
  // a. props = children: {...}, it passing into SideNavLink
  return (
    <NavLink href={href}>
      {/* 1. passing into top NavLink children, parameter is isActive then return SideNavLink Component
          4. return isActive(Boolean) values into SideNavLink
      */}
      {(isActive) => (
        <SideNavLink
          ref={ref}
          aria-current={isActive ? "page" : undefined}
          _hover={{
            color: "whiteAlpha.900",
            transform: "translateX(2px)",
          }}
          {...(isActive && {
            bg: "gray.700",
            rounded: "sm",
            borderRadius: 4,
            color: "teal.200",
            _hover: {},
          })}
          {...props}
        />
      )}
    </NavLink>
  );
});
