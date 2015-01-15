var Twit = require('twit')

var client = new Twit({
    consumer_key:         process.env.ARG1
  , consumer_secret:      process.env.ARG2
  , access_token:         process.env.ARG3
  , access_token_secret:  process.env.ARG4
})

client.get('statuses/user_timeline', {count:200}, function(error, params, response){
    deleteLessThan(params, 3, 7)
    //deleteRetweets(params)
});
function deleteLessThan(params, rts, favs){
	var tweetsDeleted = 0
	for(var i = 0; i<params.length; i++)
	{
		var tweetID = params[i].id_str
		var retweets = params[i].retweet_count
		var favorites = params[i].favorite_count
		if(retweets < rts && favorites < favs){
			deleteTweet(tweetID)
			tweetsDeleted++
		}
	}
	console.log("TOTAL NUMBER OF TWEETS DELETED: ", tweetsDeleted)
	console.log("TOTAL NUMBER OF TWEETS SAVED: ", 200-tweetsDeleted)
	console.log("TOTAL NUMBER OF TWEETS ANALYZED: ", 200)
}
function deleteRetweets(params){
	var tweetsDeleted = 0
	for(var i = 0; i<params.length; i++)
	{
		if(params[i].retweeted){
			deleteTweet(params[i].id_str)
			tweetsDeleted++
		}
	}
	console.log("TOTAL NUMBER OF TWEETS DELETED: ", tweetsDeleted)
	console.log("TOTAL NUMBER OF TWEETS SAVED: ", 200-tweetsDeleted)
	console.log("TOTAL NUMBER OF TWEETS ANALYZED: ", 200)
}
function deleteTweet(tweetID){
	tweetID = tweetID.toString()
	client.post('statuses/destroy/:id', {id:tweetID}, function(err, data, res){
		//console.log("deleted", tweetsDeleted)
	})
}