console.log("my follow bot");
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
    q: "#altcampus || #Altcampus || @altcampus || @Altcampus" ,
    count: 10,
  };
  T.get("search/tweets", params, (err, data, response) => {
    let tweets = data.statuses;

    if (!err) {
      for (let dat of tweets) {
        let retweetId = dat.id_str;
        T.post("statuses/retweet/:id", { id: retweetId }, (err, response) => {
          if (response) console.log("Retweeted!!! " + retweetId);
          if (err)
            console.log(
              "Something went wrong while RETWEETING... Duplication maybe..."
            );
        });
      }
    }
  });
}
setInterval(retweet, 50000);









// Set up your search parameters for tweets:
// var params = {
//     q: '#altcampus',
//     count: 5,
//     result_type: 'recent',
//     lang: 'en'
//   }

//   // Initiate your search using the above paramaters
// T.get('search/tweets', params, function(err, data, response) {
//     // If there is no error, proceed
//     if(!err){
//       // Loop through the returned tweets
//       for(let i = 0; i < data.statuses.length; i++){
//         // Get the tweet Id from the returned data
//         let id = { id: data.statuses[i].id_str }
//         // Try to Favorite the selected Tweet
//         T.post('favorites/create', id, function(err, response){
//           // If the favorite fails, log the error message
//           if(err){
//             console.log(err);
//           }
//           // If the favorite is successful, log the url of the tweet
//           else{
//             let username = response.user.screen_name;
//             let tweetId = response.id_str;
//             console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
//           }
//         });
//       }
//     } else {
//       console.log(err);
//     }
// })

// Follow -says thanks when followed.
// var stream = T.stream('statuses/filter', { track: '@goodbot14' });
// stream.on('follow', followed);

// function followed(eventMsg) {
//     console.log("follow event");
//     tweetIt(`Hi Follower..${eventMsg.source.name} thank you`)
// }

// setInterval(tweetIt, 1000* 20)

// function tweetIt(tweetText) {
//     console.log(tweetText);
//     var tweet = {
//         status: tweetText,
//     }
//     T.post("statuses/update", tweet, tweeted);

//     function tweeted(err, data, response) {
//         if(err) {
//             console.log(" something wrong");
//         } else {
//             console.log("working!!");
//         }
//     }
// }
