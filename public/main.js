$(function(){
    //get all the posts
    $('#getPost').ready(function(){
        
        $.ajax({ url: '/api',
                context: document.body,
                success: function(posts){
                    let cont = posts.length + 1;
                    let posteos = $('.aside-right');
                   
                    posts.forEach(element => {
                        cont = cont - 1;
                        posteos.append(`
                        <p style="display: none;" id="idPost" >${element._id}</p>
                        <div class="bordes-Post" >
                            <div class="Descripcion-Post">
                                <div>
                                    <h3 >Post ${cont}</h1>
                                </div>
                                <div>
                                    <h3>${element.updatedAt}<h3>
                                </div>
                            </div>
                            <h2 class="color" >${element.title}</h1>
                            <h2>${element.text}</h2>
                            <div class="acciones">
                                <button class="editPost" ><i class="fas fa-trash-alt"></i></button>
                                <button class="deletePost" ><i class="fas fa-edit"></i></button>
                            </div>
                        </div>
                        `
                        )
                    });
                }});
        });
     //get the menu of the post
     $('#menu-Post').ready(function(){
        $.ajax({ url: '/api',
                context: document.body,
                success: function(posts){
                    let cont = posts.length + 1;
                    //console.log(posts)
                   let posteos = $('.aside-left');
                    posts.forEach(element => {
                        cont = cont -1;
                        posteos.append(`
                        <div class="Past-Post" >
                            <div>
                                <i class="fas fa-angle-right"></i>
                            </div>
                            <div>
                                <h3>${element.updatedAt}</h1>
                            </div>
                            <div>
                                <h3>Post ${cont}</h3>
                            </div>
                        </div>
                        `
                        )
                    });
                }});
        });
    //CREATE A POST
    $('#newPost').on('submit', function(e){
        e.preventDefault();
        let newTitle = $('#newTitle');
        let newText = $('#newText');
        $.ajax({ url: '/api',
                method : 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    title : newTitle.val(),
                    text : newText.val()
                }),
                success: function(response){
                    console.log(response);
                    newTitle.val('');
                    $('#buttonPost').click();
                }

        });
    });

    //UPDATE A POST
    $('div').on('click', '.editPost',function(){
        console.log('anda');
    });

});