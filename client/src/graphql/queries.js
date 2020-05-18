import { gql } from "apollo-boost";

export const updateStats = gql`
  mutation AddScore(
    $userId: String!
    $five_s: [[Float]]
    $thirty_s: [[Float]]
    $one_min: [[Float]]
    $two_min: [[Float]]
    $five_min: [[Float]]
  ) {
    addScore(
      userId: $userId
      five_s: $five_s
      thirty_s: $thirty_s
      one_min: $one_min
      two_min: $two_min
      five_min: $five_min
    ) {
      five_s
      thirty_s
      one_min
      two_min
      five_min
    }
  }
`;

export const addNewUserMutation = gql`
  mutation AddNewUser($name: String, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      id
      name
      email
      password
    }
  }
`;

export const getStatsQuery = gql`
  query Score($userId: ID) {
    score(userId: $userId) {
      five_s
      thirty_s
      one_min
      two_min
      five_min
    }
  }
`;
