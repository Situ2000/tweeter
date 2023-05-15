/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


let data = [
    {
        "user": {

            "name": "Newton",

            // "avatars": "https://i.imgur.com/73hZDYK.png",
            "avatars": "./images/a1.png",

            "handle": "@SirIsaac"
        },

        "content": {

            "text": "If I have seen further it is by standing on the shoulders of giants",
        },

        "created_at": 1461116232227,
    },
    {
        "user": {

            "name": "Descartes",

            // "avatars": "https://i.imgur.com/nlhLi3I.png",
            "avatars": "./images/a2.png",

            "handle": "@rd"
        },

        "content": {

            "text": "Je pense, donc je suis"

        },

        "created_at": 1461113959088
    }
];

$(document).ready(function () {

    $(".new-tweet-create").click(function () {
        $(".new-tweet").toggleClass('d-none');
    });

    const $tweetsContainer = $('#tweets');
    const renderTweets = function (tweets) {
        // Clear existing tweets
        $tweetsContainer.empty();

        // Loop through tweets and append to container
        for (const tweet of tweets) {
            const $tweet = createTweetElement(tweet);
            $tweetsContainer.append($tweet);
        }
    };
    const createTweetElement = function (tweet) {
        const $tweet = $('<div>').addClass('tweet-item');
        $tweet.html(
            `
          <header class="tweet-header">
              <div class="tweet-user">
                  <img src="${tweet.user.avatars}" alt="${tweet.user.name}" class="user-avatar">
                  <span class="tweet-username">${tweet.user.name}</span>
              </div>
              <div class="tweet-handle">${tweet.user.handle}</div>

          </header>
          <p class="tweet-content">${tweet.content.text}</p>
          <hr>
          <footer class="tweet-footer">
              <div class="tweet-metadata">
                  <span class="tweet-time">${$.timeago(tweet.created_at)}</span>
              </div>
              <div class="tweet-actions">
                  <i class="fas fa-flag"></i>
                  <i class="fas fa-retweet"></i>
                  <i class="fas fa-heart"></i>
              </div>
          </footer>        
      `);

        return $tweet;
    };

    renderTweets(data);
    function loadTweets() {
        $.ajax({
            //TODO use a working server endpoint for creating tweets
            url: '/tweets',
            method: 'GET',
            dataType: 'json',
            success: function (tweets) {
                tweets = tweets.reverse();
                data = tweets;
                // Update the UI with the data from the  server 
                renderTweets(tweets);
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
    // TODO - Uncoment to load tweets from the server
    loadTweets();


    $("form").on("submit", function (event) {
        event.preventDefault();

        const tweetText = $('#text').val();
        if (tweetText.trim().length === 0) {
            $('#error').text('Please enter a tweet.');
            return;

        } else if (tweetText.length > 140) {
            $('#error').text('Tweet is too long. Max 140 characters.');
            return;

        }
        else {
            $('#error').text("");
        }

        // Serialize form data
        var formData = $(this).serializeArray();
        // add the username to the request body
        formData.push({
            name: "user",
            value: JSON.stringify({
                name: $("#username").text(),
                handle: "@" + $(".last-name").text() + 32,
                avatars: "/images/profile-hex.png"
            })
        });

        // Send AJAX request
        $.ajax({
            //TODO-set a working  url to server to create a tweet

            url: "/tweets",
            type: "POST",
            data: formData,
            success: function (response) {
                // Add response from the server and update the UI
                event.target.reset();
                data.unshift(response);
                renderTweets(data);
                $('#error').text("");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // Show an error message if the request fails
                $('#error').text('Error: ' + textStatus);
                console.error(textStatus, errorThrown);
            }
        });
    });

    $("#subPageTitle").click(function () {
        $(".new-tweet").toggleClass("hidden");
    });

});