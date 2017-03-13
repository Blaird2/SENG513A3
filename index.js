var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var port = process.env.PORT || 3000;
connections = [];
usernames = [];
var count =0;
var fontColor = "black";

http.listen(port);
console.log('listening on port', port);

app.use(express.static(__dirname + '/public'));

// listen to 'chat' messages
io.on('connection', function(socket){

	count++;
	var UserName = "user" + count;
	usernames.push(UserName);
	connections.push(socket);
	//socket.username = usernames[usernames.length-1];
	socket.username = UserName;
	console.log(socket.username);
	socket.emit('get the user', socket.username);
	
	console.log(UserName);
	console.log('Connected: %s sockets connected', connections.length);

	updateUserName(socket);

	//Disconnect
	socket.on('disconnect', function(data){
		usernames.splice(usernames.indexOf(socket.username), 1);
		connections.splice(connections.indexOf(socket), 1);
		console.log('Disconnect: %s sockets connected', connections.length);
		updateUserName(socket);
	});

	//Send Message
    socket.on('chat', function(data){
    	var sender1 = data.sender;
    var data = data.message;
    var rawMessage = data;
    var rawMessageArray = [];
  
	rawMessageArray = rawMessage.trim().split(" ");

	var valueAtIndex0 = rawMessageArray[0];
	

	if (valueAtIndex0 == "/nick"){
			if(rawMessageArray[1] == null){
			rawMessageArray[1] = "Username";
		}
		var index = usernames.indexOf(socket.username);
		usernames[index] = rawMessageArray[1];
		socket.username = rawMessageArray[1];
		updateUserName(socket);
	}

	if(valueAtIndex0 == "/nickcolor"){
		if(rawMessageArray[1] == null){
			rawMessageArray[1] = "black";
		}
		fontColor = rawMessageArray[1];
	}
		io.emit('chat2', {username: socket.username.fontcolor(fontColor), msg: data, time: new Date().toString().split(' ')[4] , sender: sender1 });
    });
 
});

function updateUserName(socket){
	console.log(usernames);
	console.log("######## YOUR USERNAME IS" + socket.username);

	io.emit('user list', {list: usernames, you:socket.username});

}







