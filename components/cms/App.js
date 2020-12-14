import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Spinner } from "@chakra-ui/core";
import gql from "graphql-tag";
import { useAuth } from "@/utils/auth";
import { useQuery } from "@apollo/react-hooks";
import { Redirect } from "@/utils/redirect";
import Header from "@/components/cms/Header";

const ME = gql`
  query me($username: String) {
    me(username: $username) {
      username
      isAdmin
    }
  }
`;

export default function App({ children, ...rest }) {
  const { user } = useAuth();
  const [meVariable, setMeVariable] = useState(null);
  const router = useRouter();

  const { error, loading, data } = useQuery(ME, {
    variables: meVariable ? { username: meVariable } : "",
    onError(errors) {},
  });

  // useEffect(() => {
  //   if (user.user) setMeVariable(user.user.username);
  //   else router.push("/cms/login");
  // }, [user]);

  // if (loading)
  //   return (
  //     <Box maxW='1280px'>
  //       <Header />
  //       <Spinner />
  //     </Box>
  //   );
  // if (error)
  //   return (
  //     <Box maxW='1280px'>
  //       <Header />
  //       <Spinner />
  //     </Box>
  //   );

  return (
    <Box maxW='1280px'>
      <Header />
      <Box px={4} {...rest}>
        {children}
      </Box>
    </Box>
  );
}
