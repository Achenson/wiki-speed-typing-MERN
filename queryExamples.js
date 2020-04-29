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
*/