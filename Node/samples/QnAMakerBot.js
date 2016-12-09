
var restify = require('restify');
var builder = require('botbuilder');
var cognitiveservices = require('../lib/botbuilder-cognitiveservices');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
 appId: process.env.MICROSOFT_APP_ID,
 appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

var recognizer = new cognitiveservices.QnAMakerRecognizer({
	//knowledgeBaseId: 'set your kbid here', 
	//subscriptionKey: 'set your subscription key here'});
	knowledgeBaseId: 'c677b0580d784b9097e173ae1f552f7b', 
	subscriptionKey: '30c2e88b4ff142adbf595ad1ba9020b2'});

var dialog = new cognitiveservices.QnAMakerDialog({ 
	recognizers: [recognizer],
	defaultMessage: 'No match! Try changing the query terms!',
	qnaThreshold: 0.3});

bot.dialog('/', dialog);