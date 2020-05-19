import store from "../store.js";

import { gql } from "apollo-boost";



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
  })
  
  
/*   
  .then(
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
  ); */



};
