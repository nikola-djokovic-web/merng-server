const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config.js");

const pubsub = new PubSub();

// const corsOptions = {
//   origin: "https://djokovic-social-network.herokuapp.com/",
//   credentials: true,
// };

const server = new ApolloServer({
  typeDefs,

  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

apolloServer.applyMiddleware({
  app,
  cors: {
    origin: "https://djokovic-social-network.herokuapp.com/",
    credentials: true,
  },
});

// const server = new ApolloServer({
//     ....,
//     cors: {
//         credentials: true,
//         origin: (origin, callback) => {
//             const whitelist = [
//                 "http://site1.com",
//                 "https://site2.com"
//             ];

//             if (whitelist.indexOf(origin) !== -1) {
//                 callback(null, true)
//             } else {
//                 callback(new Error("Not allowed by CORS"))
//             }
//         }
//     }
// });

server.applyMiddleware({ app });

const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
