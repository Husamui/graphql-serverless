(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var graphql = __webpack_require__(0);

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptNodejs = __webpack_require__(11);

var _jsonwebtoken = __webpack_require__(5);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _constants = __webpack_require__(3);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserSchema = new _mongoose.Schema({
  username: { type: String, unique: true },
  email: String,
  firstname: String,
  lastname: String,
  avatar: String,
  password: String
}, { timestamps: true });

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return (0, _bcryptNodejs.hashSync)(password);
  },
  authenticateUser(password) {
    return (0, _bcryptNodejs.compareSync)(password, this.password);
  },
  createToken() {
    const token = _jsonwebtoken2.default.sign({
      _id: this._id
    }, _constants2.default.JWT_SECRECT);
    return token;
  }
};

exports.default = _mongoose2.default.model('User', UserSchema);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var graphql = __webpack_require__(0);

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  PORT: process.env.PORT || 3000,
  DB_URL: 'mongodb://localhost/tweeter-development',
  GRAPHQL_PATH: '/graphql',
  JWT_SECRECT: 'jwtkeypass'
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var graphql = __webpack_require__(0);

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requireAuth = undefined;

let requireAuth = exports.requireAuth = (() => {
  var _ref = _asyncToGenerator(function* (user) {
    if (!user || !user._id) {
      throw new Error('Unauthorized');
    }

    const me = yield _User2.default.findById(user._id);

    if (!me) {
      throw new Error('Unauthorized');
    }

    return me;
  });

  return function requireAuth(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.decodeToken = decodeToken;

var _jsonwebtoken = __webpack_require__(5);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = __webpack_require__(1);

var _User2 = _interopRequireDefault(_User);

var _constants = __webpack_require__(3);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function decodeToken(token) {
  const arr = token.split(' ');
  if (arr[0] === 'Bearer') {
    return _jsonwebtoken2.default.verify(arr[1], _constants2.default.JWT_SECRECT);
  }
  throw new Error('Token not valid!');
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var graphql = __webpack_require__(0);

'use strict';

let auth = (() => {
  var _ref = _asyncToGenerator(function* (headers) {
    try {
      const token = headers.authorization;
      if (token != null && token.length > 20) {
        return yield (0, _auth.decodeToken)(token);
      }
      return null;
    } catch (error) {
      throw error;
    }
  });

  return function auth(_x) {
    return _ref.apply(this, arguments);
  };
})();

__webpack_require__(7);

var _apolloServerLambda = __webpack_require__(8);

var _graphqlPlaygroundMiddlewareLambda = __webpack_require__(9);

var _graphqlPlaygroundMiddlewareLambda2 = _interopRequireDefault(_graphqlPlaygroundMiddlewareLambda);

var _graphqlTools = __webpack_require__(10);

var _auth = __webpack_require__(4);

__webpack_require__(12);

var _schema = __webpack_require__(13);

var _schema2 = _interopRequireDefault(_schema);

var _resolvers = __webpack_require__(14);

var _resolvers2 = _interopRequireDefault(_resolvers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import { schema } from './schema';
// import { resolvers } from './resolvers';


const myGraphQLSchema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: _schema2.default,
  resolvers: _resolvers2.default,
  logger: console
});

exports.graphqlHandler = function graphqlHandler(event, context, callback) {
  function callbackFilter(error, output) {
    // eslint-disable-next-line no-param-reassign
    output.headers['Access-Control-Allow-Origin'] = '*';
    callback(error, output);
  }

  auth(event.headers).then(user => {
    const handler = (0, _apolloServerLambda.graphqlLambda)({
      schema: myGraphQLSchema,
      tracing: true,
      context: {
        user
      }
    });
    return handler(event, context, callbackFilter);
  });
};

// for local endpointURL is /graphql and for prod it is /stage/graphql
exports.playgroundHandler = (0, _graphqlPlaygroundMiddlewareLambda2.default)({
  endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT ? process.env.REACT_APP_GRAPHQL_ENDPOINT : '/production/graphql'
});

exports.graphiqlHandler = (0, _apolloServerLambda.graphiqlLambda)({
  endpointURL: process.env.REACT_APP_GRAPHQL_ENDPOINT ? process.env.REACT_APP_GRAPHQL_ENDPOINT : '/production/graphql'
});


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("apollo-server-lambda");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("graphql-playground-middleware-lambda");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var graphql = __webpack_require__(0);

'use strict';

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(3);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */

_mongoose2.default.Promise = global.Promise;

_mongoose2.default.set('debug', true); // debug mode on

try {
  _mongoose2.default.connect(_constants2.default.DB_URL);
} catch (err) {
  _mongoose2.default.createConnection(_constants2.default.DB_URL);
}

_mongoose2.default.connection.once('open', () => console.log('MongoDB Running')).on('error', e => {
  throw e;
});


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var graphql = __webpack_require__(0);

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = `

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


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var graphql = __webpack_require__(0);

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlDate = __webpack_require__(15);

var _graphqlDate2 = _interopRequireDefault(_graphqlDate);

var _tweetResolvers = __webpack_require__(16);

var _tweetResolvers2 = _interopRequireDefault(_tweetResolvers);

var _userResolvers = __webpack_require__(18);

var _userResolvers2 = _interopRequireDefault(_userResolvers);

var _User = __webpack_require__(1);

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Date: _graphqlDate2.default,
  Tweet: {
    user: ({ user }) => _User2.default.findById(user)
  },
  Query: {
    getTweet: _tweetResolvers2.default.getTweet,
    getTweets: _tweetResolvers2.default.getTweets,
    getUserTweets: _tweetResolvers2.default.getUserTweets,
    me: _userResolvers2.default.me
  },
  Mutation: {
    createTweet: _tweetResolvers2.default.createTweet,
    updateTweet: _tweetResolvers2.default.updateTweet,
    deleteTweet: _tweetResolvers2.default.delateTweet,
    signup: _userResolvers2.default.signup,
    login: _userResolvers2.default.login
  }
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("graphql-date");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var graphql = __webpack_require__(0);

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Tweet = __webpack_require__(17);

var _Tweet2 = _interopRequireDefault(_Tweet);

var _auth = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  getTweet: (() => {
    var _ref = _asyncToGenerator(function* (_, { _id }, { user }) {
      try {
        yield (0, _auth.requireAuth)(user);
        return _Tweet2.default.findById(_id);
      } catch (err) {
        throw err;
      }
    });

    return function getTweet(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  })(),
  getTweets: (() => {
    var _ref2 = _asyncToGenerator(function* (_, args, { user }) {
      try {
        yield (0, _auth.requireAuth)(user);
        global.console.log('The user is: ', user);
        return _Tweet2.default.find({}).sort({ createdAt: -1 });
      } catch (err) {
        throw err;
      }
    });

    return function getTweets(_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  })(),
  getUserTweets: (() => {
    var _ref3 = _asyncToGenerator(function* (_, args, { user }) {
      try {
        // await requireAuth(user);
        return yield _Tweet2.default.find({ user: user._id }).sort({ createdAt: -1 });
      } catch (err) {
        throw err;
      }
    });

    return function getUserTweets(_x7, _x8, _x9) {
      return _ref3.apply(this, arguments);
    };
  })(),
  createTweet: (() => {
    var _ref4 = _asyncToGenerator(function* (_, args, { user }) {
      try {
        // await requireAuth(user);
        return _Tweet2.default.create(_extends({}, args, { user: user._id }));
      } catch (err) {
        throw err;
      }
    });

    return function createTweet(_x10, _x11, _x12) {
      return _ref4.apply(this, arguments);
    };
  })(),
  updateTweet: (() => {
    var _ref5 = _asyncToGenerator(function* (_, _ref6, { user }) {
      let { _id } = _ref6,
          rest = _objectWithoutProperties(_ref6, ['_id']);

      try {
        // await requireAuth(user);
        const tweet = yield _Tweet2.default.findOne({ _id, user: user._id });
        if (!tweet) {
          throw new Error('Tweet not found');
        }
        Object.entries(rest).forEach(function ([key, value]) {
          tweet[key] = value;
        });
        return tweet.save();
      } catch (err) {
        throw err;
      }
    });

    return function updateTweet(_x13, _x14, _x15) {
      return _ref5.apply(this, arguments);
    };
  })(),
  delateTweet: (() => {
    var _ref7 = _asyncToGenerator(function* (_, { _id }, { user }) {
      try {
        // await requireAuth(user);
        const tweet = yield _Tweet2.default.findOne({ _id, user: user._id });
        if (!tweet) {
          throw new Error('Tweet not found');
        }
        yield tweet.remove();
        return { message: 'Tweet has been removed successfully' };
      } catch (err) {
        throw err;
      }
    });

    return function delateTweet(_x16, _x17, _x18) {
      return _ref7.apply(this, arguments);
    };
  })()
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var graphql = __webpack_require__(0);

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TweetSchema = new _mongoose.Schema({
  text: {
    type: String,
    minlength: [5, 'Text to short'],
    maxlength: [144, 'Text to long']
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  favoriteCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

exports.default = _mongoose2.default.model('Tweet', TweetSchema);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var graphql = __webpack_require__(0);

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _User = __webpack_require__(1);

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import { requireAuth } from '../../services/auth';

exports.default = {
  signup: (() => {
    var _ref = _asyncToGenerator(function* (_, _ref2) {
      let { fullname } = _ref2,
          rest = _objectWithoutProperties(_ref2, ['fullname']);

      try {
        const [firstname, ...lastname] = fullname.split(' ');
        const user = yield _User2.default.create(_extends({ firstname, lastname }, rest));
        return { token: user.createToken() };
      } catch (err) {
        throw err;
      }
    });

    return function signup(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })(),
  login: (() => {
    var _ref3 = _asyncToGenerator(function* (_, { email, password }) {
      try {
        const user = yield _User2.default.findOne({ email });
        if (!user) {
          throw new Error('User not exist!');
        }
        if (!user.authenticateUser(password)) {
          throw new Error('Password not match!');
        }
        return { token: user.createToken() };
      } catch (err) {
        throw err;
      }
    });

    return function login(_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  })(),
  me: (() => {
    var _ref4 = _asyncToGenerator(function* (_, args, { user }) {
      try {
        console.log('the user is: ', user);
        // const me = await requireAuth(user);
        return user;
      } catch (err) {
        throw err;
      }
    });

    return function me(_x5, _x6, _x7) {
      return _ref4.apply(this, arguments);
    };
  })()
};


/***/ })
/******/ ])));