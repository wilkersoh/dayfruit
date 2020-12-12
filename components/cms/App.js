import { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Spinner } from "@chakra-ui/core";
import Header from "@/components/cms/Header";
import gql from "graphql-tag";
import { useAuth } from "@/utils/auth";
import { useQuery } from "@apollo/react-hooks";

const ME = gql`
  query me($username: String!) {
    me(username: $username) {
      username
      isAdmin
    }
  }
`;

export default function App({ children, ...rest }) {
  const router = useRouter();
  const { user } = useAuth();
  console.log(user);

  const { error, loading, data } = useQuery(ME, {
    variables: { username: "admin" },
    onError(errors) {
      console.log(errors);
    },
  });

  useEffect(() => {
    if (!data?.me.isAdmin) router.push("/cms/login");
  }, [data]);

  if (loading) return <Spinner />;
  if (error) return <Box>Error...</Box>;

  return (
    <Box maxW='1280px'>
      <Header />
      <Box px={4} {...rest}>
        {children}
      </Box>
    </Box>
  );
}
