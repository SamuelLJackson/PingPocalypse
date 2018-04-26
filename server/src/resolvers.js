import mongoose from 'mongoose';
import {Users,MatchRequests,Matches} from './data/dbConnectors';


export const resolvers = {
  Query: {
    getAllUsers: () => {
      return Users.find({}).sort({ createdAt: -1 });
    },
    getLoggedInUsers: () => {
      return Users.find({loggedIn:true}).sort({createdAt: -1});
    },
    getOneUser: (root, { id }) => {
      return Users.findOne({id:id});
    },
    getMyMatchRequest: (root, {id}) => {
      console.log('\n\n\nMY MATCH REQUEST MADE\n\n\n')
      const MatchRequest = MatchRequests.findOne({recipientId:id, accepted:false});
      return MatchRequest;
    }
  },
  Mutation: {
    addUser: (root, { input }) => {
        const newUser = new Users({
          username: input.username,
          password: input.password,
          loggedIn: true,
          elo: 1000,
        });

        newUser.id = newUser._id;

        return new Promise((resolve, reject) => {
            newUser.save((err) => {
                if (err) reject(err)
                else resolve(newUser)
            })
        })
    },
    updateUser: (root, { input }) => {
        return new Promise(( resolve, object) => {
            Users.findOneAndUpdate({ _id: input.id }, input, { new: true}, (err, user) => {
                if (err) reject(err)
                else resolve(user)
            })
        })
    },
    addMatchRequest: async (root, {input}) => {
      const newMatchRequest = new MatchRequests({
        initiator: await Users.findById(String(input.initiatorId)),
        initiatorId:input.initiatorId,
        recipientId: input.recipientId,
        accepted:false,
        matchId:''
      });
      newMatchRequest.id = newMatchRequest._id;
      return new Promise((resolve,reject) => {
        newMatchRequest.save((err) => {
          if(err) reject(err)
          else resolve(newMatchRequest)
        })
      });
    },
    updateMatchRequest: (root, {input}) => {
      const newMatch = new Matches({
        player1_id: input.initiatorId,
        player2_id: input.recipientId,
        player1_score:0,
        player2_score:0,
        approved:false
      })
      input.matchId = newMatch._id;


      return new Promise(( resolve, reject) => {
        MatchRequests.findOneAndUpdate({ _id: input.id}, input, {new:true}, (err,matchRequest) => {
          if(err) reject(err)
          else {
            newMatch.save();
            resolve(matchRequest)
          }
        })
      })
    },
    deleteMatchRequest: (root, {id}) => {
      return new Promise((resolve, object) => {
        MatchRequests.remove({_id: id}, (err) => {
          if (err) reject(err)
          else resolve('Successfully canceled Match request')
        })
      })
    },
    addMatch: (root, {input}) => {
      console.log('ADDING MATCH')
      const newMatch = new Matches({
        player1_id: input.player1_id,
        player1_score: 0,
        player2_id: input.player2_id,
        player2_score: 0,
        approved:false
      });
      newMatch.id = newMatch._id;
      return new Promise((resolve,reject) => {
        newMatch.save((err) => {
          if(err) reject(err)
          else resolve(newMatch)
        })
      });
    },
    updateMatch: (root, {input}) => {
      return new Promise(( resolve, reject) => {
        Matches.findOneAndUpdate({ _id: input.id}, input, {new:true}, (err,match) => {
          if(err) reject(err)
          else resolve(match)
        })
      })
    }
  },
};
