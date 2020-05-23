console.log("my good bot started @Goodbot14");
require("dotenv").config();
var Twit = require("twit");

var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

function retweet() {
  let params = {
    q: '#Altcampus, #altcampus, #100DaysOfCode, #100daysofcode',
    result_type: 'recent',
    lang: 'en',
  };
  T.get("search/tweets", params, (err, data) => {
    if (!err) {
      // grab ID of tweet to retweet
        var retweetId = data.statuses[0].id_str;
        // Tell TWITTER to retweet
        T.post('statuses/retweet/:id', {
            id: retweetId
        }, function(err, response) {
            if (response) {
                console.log('Retweeted!!!');
            }
            // if there was an error while tweeting
            if (err) {
                console.log('Something went wrong while RETWEETING... Duplication maybe...');
            }
        });
    }
    // if unable to Search a tweet
    else {
      console.log('Something went wrong while SEARCHING...');
    }
  });
}
retweet();
setInterval(retweet, 60000);


function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length); 
  return arr[index];
};

function likeTweets() {
    let params = {
    q:'#Altcampus, #altcampus, #100DaysOfCode, #100daysofcode',
    result_type: 'recent',
    lang: 'en'
    }
    T.get('search/tweets', params, function(err, data) {
      // find tweets
      var tweet = data.statuses;
      
      var randomTweet = ranDom(tweet);   // pick a random tweet
      
      if(typeof randomTweet != 'undefined'){
        // Tell TWITTER to 'favorite'
        T.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
          // if there was an error while 'favorite'
          if(err){
            console.log('Error liking the tweet');
          }
          else{
            console.log('Sucessfully liked the tweet');
          }
        });
      } else {
        console.log('Something went wrong while SEARCHING...');
      }
    })
}
likeTweets();
setInterval(likeTweets, 50000);

