//Code by Antolina Gonzalez

$(function(){

    //UPDATE or EDIT A POST

    $('#newPost').ready(function(){
        let id = $('#idPosteo').text();
        $.ajax({ url: '/api/' + id,
                method: 'GET',
                 success: (function(element){
                    var newText = document.getElementById('newText').innerHTML = element.text;
                    var newTitle = document.getElementById('newTitle').value = element.title;
                    console.log(newText);
                    console.log(newTitle);
                    
                 })
                });
    });
    $('#newPost').on('submit', function(e){
        let id = $('#idPosteo').text();
        e.preventDefault();
        let newTitle = $('#newTitle');
        let newText = $('#newText');
        $.ajax({ url: '/api/' + id,
                method : 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    title : newTitle.val(),
                    text : newText.val()
                }),
                success: function(response){
                    console.log(response);
                    newTitle.val('');
                    newText.val('');
                    $('#buttonPost').click();
                    window.location = "/";
                }

        });
    });
});