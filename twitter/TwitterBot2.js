/*eslint-env es6*/

const twit = require('twit');
const config = require('./config.js');
const common = require('./resources/js/script.js');

const T = new twit(config);

var stream = T.stream('statuses/filter', { track: ['@DataBot10'] });
stream.on('tweet', tweetEvent);

function tweetEvent(tweet) {

    //Boolean for valid array
    var isValid = 0;
    // User who sent the tweet
    var name = tweet.user.screen_name;
    // What is the text?
    var txt = tweet.text;
    // the status update or tweet ID in which we will reply
    var nameID  = tweet.id_str;

    //The text response
    var reply;

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
        if(Number.isNaN(parsed[i]))
        {
            console.error("INVALID STUFF YOU IDIOT");
            reply = "@"+name +" Data Bot only accepts numbers in comma seperated format";
            isValid = 0;
        }
        else // Continue on to website
        {
            //var reply = "@"+name+ " Insert HTML link here";
            isValid = 1;
            
        }    
    }
    if(Boolean(isValid))
    {
        console.error("Array is a Valid array");
        var outputArr = common.qSort(parsed.map(Number), 0, parsed.length -1);
        console.log("Output Array: " + outputArr);
    }
    //troubleshooting of array
    console.error(txt);
    console.error(parsed);

    // Start a reply back to the sender

    
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

};