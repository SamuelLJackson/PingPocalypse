import { makeExecutableSchema } from 'graphql-tools';
import { resolvers} from './resolvers';

const typeDefs = `

  type User {
    id: ID!
    username: String
    password: String
    elo: Int
    loggedIn: Boolean
  }

  type MatchRequest {
    id: ID!
    initiatorId: String
    initiator: User
    recipientId: String
    accepted: Boolean
    matchId: String
  }

  type Match {
    id: ID!
    player1_id: String
    player1_score: Int
    player2_id: String
    player2_score: Int
    approved: Boolean
  }

  type Query {
    getOneUser(id: ID!): User
    getAllUsers: [User]
    getLoggedInUsers: [User]
    getMyMatchRequest(id: ID!): MatchRequest
    getOneMatch(id:ID!):Match
  }

  input UserInput {
    id: ID
    username: String
    password: String
    elo: Int
    loggedIn:Boolean
  }

  input MatchRequestInput {
    id: ID
    initiatorId: String
    recipientId: String
    accepted: Boolean
    matchId: String
  }

  input MatchInput {
    id: ID
    player1_id: String
    player1_score: Int
    player2_id: String
    player2_score: Int
    approved: Boolean
  }

  type Mutation {
    addUser(input: UserInput!): User
    updateUser(input: UserInput!): User

    addMatchRequest(input: MatchRequestInput): MatchRequest
    updateMatchRequest(input: MatchRequestInput): MatchRequest
    deleteMatchRequest(id:ID! ): String

    addMatch(input: MatchInput): Match
    updateMatch(input: MatchInput): Match
  }

`;

const schema = makeExecutableSchema({ typeDefs, resolvers});
export { schema};
