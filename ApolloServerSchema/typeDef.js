const typeDefs = `
  type post{
    _id : String!,
    Title : String!,
    Body :String!,
    _UserID :String!,
  }
  type user{
    _id : String!,
    email : String!,
    name : String!,
    password : String!,
    account_Number : Int!,
    phone_no:Int!,
    identification_number:Int!,
    _Mid :String!
  }
  type Query{
    posts : [post],
    localposts : [post],
    localpost(id:Int!) : post,
    users : [user],
    loginUser(email : String! ,password : String!) : user
  }
  type Mutation{
    addPost(title : String!,body:String!,_UserID : String!) : post,
    registerUser(
      email : String! ,
      password : String!,
      name : String!,
      account_Number : Int!,
      phone_no:Int!,
      identification_number:Int!
    ) : user!
  }

`;

module.exports = typeDefs;