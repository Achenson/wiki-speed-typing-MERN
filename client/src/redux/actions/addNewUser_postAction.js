import store from "../store.js";

import { gql } from "apollo-boost";

/* const getStatsQuery = gql`
  {
    score(userId: store.getState().authState.authenticatedUserId) {
      five_s
      thirty_s
      one_min
      two_min
      five_min
    }
  }
`;

const addUserMutation = gql`
  mutation AddNewUser($name: String, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      id
      name
      email
      password
    }
  }
`;

const updateStats = gql`
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
`; */
/* const userQuery = gql`

{
  user (id: ${store.getState().authState.authenticatedUserId}) {
    id
    name
    email
    password
    score {
      sec_5
      sec_30
      min_1
      min_2
      min_5
    }
  }
}
`; */

export const addNewUser_postAction = (
  addUser,
  addScore,
  username,
  email,
  password
) => (dispatch) => {
  addUser({
    variables: {
      username: username,
      email: email,
      password: password,
    },
    // refetchQueries: [{ query: getStatsQuery }],

    // useMutation mutate function does not call `onCompleted`!
    // so onCompleted can only be passed to initial hook
    // workaround: useMutation returns a Promise
  }).then(
    (res) => {
      console.log(res);
      console.log(res.data.addUser.id);

      let arrOfZeros = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ];

      addScore({
        variables: {
          userId: res.data.addUser.id,
          five_s: arrOfZeros,
          thirty_s: arrOfZeros,
          one_min: arrOfZeros,
          two_min: arrOfZeros,
          five_min: arrOfZeros,
        },
        // refetchQueries: [{ query: getStatsQuery }],
      });
    },

    (err) => console.log(err)
  );
};
