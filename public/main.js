
var traerDatos = (element) =>{
    
    var id = element._id;
    var title = element.title;
    var text = element.text;
    console.log(element._id)
    
        //var preProcesado = datos.json[1].title
    window.location = "/edit.html?var="+id+"&title="+title+"&text="+text;
   
    //return datos;
}

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
                        <div class="bordes-Post" >
                            <p style="display: none;" class="idPost" >${element._id}</p>
                            <div class="Descripcion-Post">
                                <div>
                                    <h3>Post ${cont}</h1>
                                </div>
                                <div>
                                    <h3>${element.updatedAt}<h3>
                                </div>
                            </div>
                            <h2 class="color title" >${element.title}</h1>
                            <h2 class="text">${element.text}</h2>
                            <div class="acciones">
                                <a href="#" onclick="traerDatos()" ><i class="fas fa-plus"></i>Editar</a>
                                <button class="deletePost"><i class="fas fa-trash-alt"></i></button>
                                <button class="editPost" ><i class="fas fa-edit"></i></button>
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
                    newText.val('');
                    $('#buttonPost').click();
                }

        });
    });
    // $('#editPost').ready(function(){
    //     let id = $('#idPosteo').text();
    //     console.log(id);
    //     let newTitle = $('#newTitle').val();
    //     let newText = $('#newText').text();
    //     console.log(newTitle);
    //     console.log(newText);
    // });

    $('#editPost').on('submit', function(){
        let id = $('#idPosteo').text();
        console.log(id);
        let newTitle = $('#newTitle').val();
        let newText = $('#newText').text();
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
                }

        });
    });
    $('#editPrueba').ready(function(){
        let id = '5f22b6070b1a091e8a3c9cca'
        console.log(id);
        let newTitle = $('#newTitle').val();
        let newText = $('#newText').text();
        //console.log(newTitle);
        //console.log(newText);
    });
    $('#editPrueba').on('submit', function(){
        let id = '5f22b6070b1a091e8a3c9cca';
        console.log(id);
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
                }

        });
    });

    //UPDATE A POST --sin terminar--
    // $('.editPost').on('click', function(e){
    //     e.preventDefault();
    //     let newTitle = $('#newTitle');
    //     let newText = $('#newText');
    //     $.ajax({ url: '/api',
    //             method : 'POST',
    //             contentType: 'application/json',
    //             data: JSON.stringify({
    //                 title : newTitle.val(),
    //                 text : newText.val()
    //             }),
    //             success: function(response){
    //                 console.log(response);
                    
    //                 $('#buttonPost').click();
    //             }

    //     });
    // });
    $('#getPost').on('click', '.editPost', function(){
       let posteo = $(this).closest('.bordes-Post');
        let id = posteo.find('.idPost').text();
         let title = posteo.find('.title').text();
         let text = posteo.find('.text').text()
                 
         $.ajax({ url: '/api/' + id,
                method: 'GET',
                 success: (function(element){
                    traerDatos(element);
                 })
         });
     });

    $('#getPost').on('click','.deletePost', function(){
        let posteo = $(this).closest('.bordes-Post');
        let id = posteo.find('.idPost').text();
        $.ajax({ url: '/api/' + id,
                method: 'DELETE',
                success: (function(){
                    // ACTUALIZAR LA PAGINA tiene errores
                $('.loading').load("blog.html");
                })
        });
    });
    $('#deleteall').on('click' ,function(){
        
        $.ajax({ url: '/api/',
                method: 'DELETE',
                success: (function(){
                    // ACTUALIZAR LA PAGINA tiene errores
                $('.loading').load("blog.html");
                })
        });
    })
});

