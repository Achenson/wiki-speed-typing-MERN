/* query examples:
query relational
{
  book(id: "2") {
    name
    genre
    author {
      name
    }
  }
}

{
  author(id: "2") {
    name
    books {
      name
      genre
    }
  }
}

{
  authors {
    name
    books {
      name
    }
  }
  

//   mutation example

mutation {
  addAuthor(name: "Tester", age: 99) {
    //   this will be shown back
    name
    age
  }
}

// after connecting to MongoDb examples

 {
 books {
  name
  genre
  author {
    name
    age
  }
}
}

 {
 authors {
  name
  age
  books {
    name
    
  }
}
}

===== wiki typing

mutation {
  addUser(name: "Tracer", email: "tt@tt.pl", password:"123456") {
    name
    email
    password
  }
}



mutation {
  addScore(userId: "5ea96db7bd05cc098c731bc9", sec_5: [0, 0], sec_30: [0, 0], min_1: [0, 0], min_2: [0, 0], min_5: [0, 0]) {
    sec_5
    sec_30
    min_1
    min_2
    min_5
  }
}



{
  user (id: "5ea96db7bd05cc098c731bc9") {
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

{
  score (id: "5ea9796e105d8934589f7bf8") {
    sec_5
   user {
    name
    email
    password
  }
    }
  }





// mutating to second test user

mutation {
  addScore(userId: "5ea96e3da7011208ac9c795d", sec_5: [[1, 0], [1,0]], sec_30: [[1, 0], [1,0]], min_1: [[1, 0], [1,0]], min_2: [[1, 0], [1,0]], min_5: [[1, 0], [1,0]]) {
    sec_5
    sec_30
    min_1
    min_2
    min_5
  }
}


mutation {
  addScore(userId: "5ea96e3da7011208ac9c795d",
   five_s: [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1],],
    thirty_s: [[2, 2], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1],],
    one_min: [[3, 3], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1],],
    two_min: [[4, 4], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1],],
     five_min: [[5, 5], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1],]) {
    five_s
    thirty_s
    one_min
    two_min
    five_min
  }
}



*/





/* 




 const [five_s, setFive_s] = useState(null)
  const [thirty_s, setThirty_s] = useState(null)
  const [one_min, setOne_min] = useState(null)
  const [two_min, setTwo_min] = useState(null)
  const [five_min, setFive_min] = useState(null)


    if(data) {

    const {score} = data;
    console.log(score)
    setFive_s(score["five_s"])
    setThirty_s(score["thirty_s"])
    setOne_min(score["one_min"])
    setTwo_min(score["two_min"])
    setFive_min(score["five_min"])





  }


      addScore({ variables: {
          userId: "5ea96e3da7011208ac9c795d",
          five_s: five_s ,
      thirty_s: thirty_s,
      one_min: one_min,
      two_min: two_min,
       five_min: five_min 
           },
           refetchQueries: [{query: getStatsQuery}]
           });

*/