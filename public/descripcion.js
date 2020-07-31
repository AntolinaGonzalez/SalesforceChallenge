$(function(){
        //Para ver la descripcion de un post
        $('#description-post').ready(function(){
            let id = $('#idPosts').text();
            $.ajax({ url: '/api/' + id,
                    method: 'GET',
                     success: (function(element){
                        var dateObject = new Date(element.updatedAt);
                        var day = dateObject.getDate();
                        var month = dateObject.getMonth() + 1;
                        var year = dateObject.getFullYear();
                        var hour = dateObject.getHours();
                        var minutes = dateObject.getMinutes();
                        if(minutes < 10) {
                            minutes = "0" + minutes;
                        }
                        document.getElementById('Texto').innerHTML = element.text;
                        document.getElementById('Title').innerHTML = element.title;
                        document.getElementById('Date').innerHTML = day+"/"+month+"/"+year+" - "+ hour +":"+ minutes;
                        
                     })
                    });
        });
})