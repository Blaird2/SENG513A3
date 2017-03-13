$(function() {
    var socket = io.connect();

    var $messages = $('#messages');
    var $userInput = $('#m');
    var $usersList = $('#usersList');
    var user;

    socket.on('get the user', function(data){
        socket.username = data;
        console.log("USERNAME " + data);
    });

    $('form').submit(function(){
      socket.emit('chat', {message: $userInput.val(), sender: socket.username} );
      $userInput.val('');
      
      return false;
  });
    
    socket.on('chat2', function(data){
        
        if(socket.username === data.sender){
            var rowInsertion =  '<tr><td class= "column1">' + data.time + '</td> <td class= "column2">' + 
            data.username + '</td> <td class= "column3">' +  '<span style="font-weight: bold">'+data.msg+'</span>'
            + '</td> </tr>'; 
        }  
        else{
            var rowInsertion =  '<tr><td class= "column1">' + data.time + '</td> <td class= "column2">' + data.username + '</td> <td class= "column3">' + data.msg + '</td> </tr>';
        }
//<span style="color: mediumslateblue; font-weight: bold">'+data.msg+'</span>

$messages.find('tbody').append(rowInsertion);
$('#LeftChat').scrollTop($('#LeftChat').scrollTop() + $('#LeftChat').height());
});

    
    socket.on('user list', function(data){
        var html = '';
        var i =0;
        var you = data.you;
       
        var data = data.list;

       // console.log("Your Username is : " + you );

        while(i<data.length){
            console.log("data i is " + data[i]);
            console.log("you is: "+ you);

            if(data[i] === socket.username ){
                html += '<li class = "list-group-item" style = "font-weight: bold">'+data[i] + '(YOU)</li>';
               // console.log("YOU printed.");
            }
            else{
               html += '<li class = "list-group-item"> '+data[i] + '</li>';
           }
           i++;
       }

   $usersList.html(html); //print out the list of users.
});

});





