import mongoose from 'mongoose';
import Sequelize from 'sequelize';
import _ from 'lodash';
import casual from 'casual';

// Mongo connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:37017/users');

const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema({
  username: {
    // Trim and lowercase
    type: String, required: true, index: { unique: true }, lowercase: true, trim: true,
  },
  password: {
    type: String, required: true, trim: true,
  },
  elo: {
    type: Number, required: true, default: 1000
  },
  badges: {
    type: Array
  },
  loggedIn: {
    type: Boolean, required: true
  }
}, { timestamps: true });

UserSchema.pre('save', function preSave(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    // hash the password using our new salt
    return bcrypt.hash(user.password, salt, (hasherr, hash) => {
      if (hasherr) return next(hasherr);
      // override the cleartext password with the hashed one
      user.password = hash;
      return next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

const Users = mongoose.model('users', UserSchema);

const MatchRequestSchema = mongoose.Schema({
  initiatorId: {
    type: String, required: true
  },
  initiator:  {
    username: {
      // Trim and lowercase
      type: String, required: true, lowercase: true, trim: true,
    },
    password: {
      type: String, required: true, trim: true,
    },
    elo: {
      type: Number, required: true, default: 1000
    },
    badges: {
      type: Array
    },
    loggedIn: {
      type: Boolean, required: true
    }
  },
  recipientId: {type:String,required: true},
  accepted: {type: Boolean,required:true},
  matchId: {Type:String, default: ''}
});

const MatchRequests = mongoose.model('matchRequests', MatchRequestSchema);

const MatchSchema = mongoose.Schema({
  player1_id: {
    type: String
  },
  player1_score: {
    type:Number
  },
  player2_id: {
    type: String
  },
  player2_score: {
    type:Number
  },
  approved: {
    type:Boolean
  }
}, {timestamps: true});

const Matches = mongoose.model('matches', MatchSchema);



export {Users,MatchRequests, Matches};
