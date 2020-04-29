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


*/