import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const UserQuery = gql`
  query User {
    user {
      id
      username
      token
    }
  }
`;

const User = () => {
  const { loading, error, data } = useQuery(UserQuery);

  if (loading) return "loading users...";
  if (error) return `error while loading users ${error.message}`;
  console.log(data);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
          </tr>
        </thead>
        {/* <tbody>{data ? <div>Got data</div> : <div>Not data</div>}</tbody> */}
      </table>
    </div>
  );
};

export default User;
