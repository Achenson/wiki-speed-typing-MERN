import store from "../store.js";

import { useQuery, useMutation } from "@apollo/react-hooks";

import { gql } from 'apollo-boost';

// import getStatsQuery from "../../App"





const getStatsQuery = gql`
{
  score (userId: "5ea96e3da7011208ac9c795d") {
    five_s
    thirty_s
    one_min
    two_min
    five_min
  }
}
`;


export const updateScore_postAction = (addScore, five_s, thirty_s, one_min, two_min, five_min) => (dispatch) => {
  
  
  // const { loading, error, data } = useQuery(getStatsQuery);


  addScore({ variables: {
    userId: "5ea96e3da7011208ac9c795d",
    five_s: [[9, 7.7],[7, 7.7],[7, 7.7],[7, 7.7],[7, 7.7],[7, 7.7],[7, 7.7],[7, 7.7],[7, 7.7],[7, 7.7]] ,
thirty_s: thirty_s,
one_min: one_min,
two_min: two_min,
 five_min: five_min
     },
    refetchQueries: [{query: getStatsQuery}]
     }); 

}