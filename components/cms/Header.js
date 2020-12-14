import { useRouter } from "next/router";
import NextLink from "next/link";
import { Box, Link } from "@chakra-ui/core";
import { useAuth } from "@/utils/auth";
import { useMutation } from "@apollo/react-hooks";
import { LOGOUT_USER_MUTATION } from "@/apollo/mutations";

const Logout = ({ onLogout }) => <Box onClick={onLogout}>{"Logout"}</Box>;

const Login = () => (
  <NextLink href='/cms/login'>
    <Link>{"Login"}</Link>
  </NextLink>
);

export default function Header(props) {
  const { user, setUser, signout } = useAuth();
  const router = useRouter();

  const [onLogout] = useMutation(LOGOUT_USER_MUTATION, {
    update() {
      signout();
      setUser({ user: null });
      router.push("/cms/login");
    },
    onError() {
      console.log("logout failed");
    },
  });

  return (
    <Box as='header' d='flex' justifyContent='space-between' p={4} {...props}>
      <NextLink href='/cms'>
        <Link>CMS DAYFRUIT</Link>
      </NextLink>
      <Box>{user.user ? <Logout onLogout={onLogout} /> : <Login />}</Box>
    </Box>
  );
}
