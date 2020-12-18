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

  useEffect(() => {
    if (user.user) {
      setMeVariable(user.user.username);
    } else {
      router.push("/cms/login");
    }
  }, []);

  if (!user.user)
    return (
      <Box width='full' maxW='1280px' mx='auto'>
        <Header />
        <Box m='auto' textAlign='center' mt={10}>
          <Spinner />
        </Box>
      </Box>
    );

  // const { error, loading, data } = useQuery(ME, {
  //   variables: meVariable ? { username: meVariable } : "",
  //   onError(errors) {},
  // });

  // if (loading)
  //   return (
  //     <Box width='full' maxW='1280px' mx='auto'>
  //       <Header />
  //       <Box m='auto' textAlign='center' mt={10}>
  //         <Spinner />
  //       </Box>
  //     </Box>
  //   );
  // if (error)
  //   return (
  //     <Box width='full' maxW='1280px' mx='auto'>
  //       <Header />
  //       <Spinner />
  //     </Box>
  //   );

  return (
    <Box width='full' maxW='1280px' mx='auto'>
      <Header />
      <Box px={4} {...rest}>
        {children}
      </Box>
    </Box>
  );
}
