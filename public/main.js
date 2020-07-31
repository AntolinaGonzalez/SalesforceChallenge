//Code by Antolina Gonzalez
/**
 *
 *
 * @param {objeto con los datos de un post, se utiliza 
 * para obtener el id de un post en particular} element
 */
var traerDatos = (element) =>{
    var id = element._id;
    console.log(element._id)
    window.location = "/edit.html?id="+id;
    
}
var verUnPost = (element) =>{
    var id = element._id;
    console.log(element._id)
    window.location = "/post.html?id="+id;
}

$(function(){

    //obtener todos los posteos
    $('#getPost').ready(function(){
        
        $.ajax({ url: '/api',
                context: document.body,
                success: function(posts){
                    let cont = posts.length + 1;
                    let posteos = $('.aside-right');
                    posts.forEach(element => {
                        cont = cont - 1;
                        var dateObject = new Date(element.updatedAt);
                        var day = dateObject.getDate();
                        var month = dateObject.getMonth() + 1;
                        var year = dateObject.getFullYear();
                        var hour = dateObject.getHours();
                        var minutes = dateObject.getMinutes();
                        if(minutes < 10) {
                            minutes = "0" + minutes;
                        }
                        posteos.append(`
                        <div class="bordes-Post" >
                            <div style="display: none;" class="idPost" >${element._id}</div>
                            <div class="Descripcion-Post" id="${element._id}" >
                                <div>
                                    <h3 class="numPost" >Post ${cont}</h1>
                                </div>
                                <div>
                                    <h3 class="fechaPost">${day}/${month}/${year}-${hour}:${minutes}<h3>
                                </div>
                            </div>
                            <h2 class="titulo title" >${element.title}</h1>
                            <h2 class="text">${element.text}</h2>
                            <div class="acciones">
                                <button class="lookapost"><i class="fas fa-eye"></i></button>
                                <button class="deletePost"><i class="fas fa-trash-alt"></i></button>
                                <button class="editPost" ><i class="fas fa-edit"></i></button>
                            </div>
                        </div>
                        `
                        )
                    });
                }});
        });
     //obtener un menu de los post mas recientes
     $('#menu-Post').ready(function(){
        $.ajax({ url: '/api',
                context: document.body,
                
                success: function(posts){
                    let cont = posts.length + 1;
                   let posteos = $('.aside-left');
                    posts.forEach(element => {
                        cont = cont -1;
                        var dateObject = new Date(element.updatedAt);
                        var day = dateObject.getDate();
                        var month = dateObject.getMonth() + 1;
                        var year = dateObject.getFullYear();
                        var hour = dateObject.getHours();
                        var minutes = dateObject.getMinutes();
                        if(minutes < 10) {
                            minutes = "0" + minutes;
                            //console.log(minutes)
                        }
                        posteos.append(`
                        <div class="Past-Post" >
                        <a href="#${element._id}">
                            <div>
                                <i class="fas fa-angle-right"></i>
                            </div>
                            <div>
                                <h3>${day}/${month}/${year}-${hour}:${minutes}</h3>
                            </div>
                            <div>
                                <h3>Post ${cont}</h3>
                            </div>
                            </a>
                        </div>
                        `
                        )
                    });
                }});
        });
    //crear un nuevo post
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
                    window.location = "/";
                }

        });
    });
    //get a post 
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
     $('#getPost').on('click', '.lookapost', function(){
        let posteo = $(this).closest('.bordes-Post');
         let id = posteo.find('.idPost').text();
          let title = posteo.find('.title').text();
          let text = posteo.find('.text').text()
                  
          $.ajax({ url: '/api/' + id,
                 method: 'GET',
                  success: (function(element){
                    verUnPost(element);
                  })
          });
      });
     //delete a post
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
    //delete all
    $('#deleteall').on('click' ,function(){
        
        $.ajax({ url: '/api/',
                method: 'DELETE',
                success: (function(){
                    // ACTUALIZAR LA PAGINA tiene errores
                $('.loading').load("blog.html");
                })
        });
    });
    
    //Para editar un posteo ir a edit.js 
});

