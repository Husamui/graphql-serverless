export default `

    scalar Date

    type auth {
        token: String
    }
    type Status {
        message: String
    }
    type Tweet {
        _id: String
        text: String
        user: User!
        favoriteCount: Int!
        createdAt: Date
        updatedAt: Date
    }
    type User {
        _id: String
        username: String
        email: String
        firstname: String
        lastname: String
        avatar: String
        createdAt: Date
        updatedAt: Date
    }
    type Me {
        _id: String
        username: String
        email: String
        firstname: String
        lastname: String
        avatar: String
        createdAt: Date
        updatedAt: Date
    }
    type Query {
        getTweet(_id: ID!): Tweet
        getTweets: [Tweet]
        getUserTweets: [Tweet]
        me: Me
    }
    type Mutation {
        createTweet(text: String!): Tweet
        updateTweet(_id: ID!, text: String): Tweet
        deleteTweet(_id: ID!): Status
        signup(fullname: String, username: String, email: String, avatar: String, password: String): auth
        login(email: String, password: String): auth
    }
    schema {
        query: Query
        mutation: Mutation
    }
`;
