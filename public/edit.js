$(function(){
    $('#newPost').ready(function(){
        
        //console.log(id);
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
                }

        });
    });
});