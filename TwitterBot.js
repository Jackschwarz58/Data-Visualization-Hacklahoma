const twit = require('twit');
const config = require('./config.js');

const T = new twit(config);

var stream = T.stream('statuses/filter', { track: ['@DataBot10'] });
stream.on('tweet', tweetEvent);

function tweetEvent(tweet) {

    // User who sent the tweet
    var name = tweet.user.screen_name;
    // What is the text?
    var txt = tweet.text;
    // the status update or tweet ID in which we will reply
    var nameID  = tweet.id_str;


    
    // Get rid of the @ mention
     var txt = txt.replace(/@DataBot10/g, "");
    //parsed array
     var parsed = new Array();
     //split the csv
     parsed = txt.split(",");
    //convert text array to int array
    for(i = 0; i < parsed.length;++i)
    {
        parsed[i] = parseInt(parsed[i], 10);
    }

    console.error(txt);
    console.error(parsed);
  
};

function reply(name, nameID, reply)
{
      // Start a reply back to the sender
      //var reply = "You mentioned me! @" + name + ' ' + 'You are super cool!';
      var params             = {
                                status: reply,
                                in_reply_to_status_id: nameID
                               };
  
      T.post('statuses/update', params, function(err, data, response) {
        if (err !== undefined) {
          console.log(err);
        } else {
          console.log('Tweeted: ' + params.status);
        }
      })
}