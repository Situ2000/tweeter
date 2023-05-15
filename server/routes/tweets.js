"use strict";

const userHelper = require("../lib/util/user-helper");

const express = require('express');
const tweetsRoutes = express.Router();

module.exports = function (DataHelpers) {

  tweetsRoutes.get("/", function (req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function (req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body' });
      return;
    }

    let user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    if (typeof user === "string") {
      user = JSON.parse(user);
    }
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json(tweet);
      }
    });
  });

  return tweetsRoutes;

};