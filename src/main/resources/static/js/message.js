let ruta = "http://localhost:8080"
//let ruta = "http://130.162.41.185:8080"

function consultarMensajes(){
    $.ajax({
        url: ruta + "/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success: function(data){
            console.log(data);
            $("#mostrarDataCloud").empty();
            mostrarMensajes(data.items);
        },
        error: function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Se ha completado la petición");
        }
    });
}
function mostrarMensajes(items){
    let myTable = "<table>";
    myTable += "<thead>";
    myTable += "<tr>";
    myTable += "<td>"+"ID"+"</td>";
    myTable += "<td>"+"MESSAGETEXT"+"</td>";
    myTable += "<td>"+"BUTTON"+"</td>";
    myTable += "</tr>";
    myTable += "</thead>";
    for(i = 0; i < items.length; i++){
        myTable += "<tr>";
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td>" + items[i].messagetext + "</td>";
        myTable += "<td> <button onclick='eliminarMensaje("+items[i].id+")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#mostrarDataCloud").append(myTable);
}
function crearMensaje(){
    let myData = {
        id:$("#idMessage").val(),
        messagetext:$("#messageText").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url:ruta + "/api/Message/save",
        type:"POST",
        data:dataToSend,
        datatype:"JSON",
        success:function(data){
            $("#mostrarDataCloud").empty();
            $("#idMessage").val("");
            $("#messageText").val("");
            consultarMensajes();
            alert("peticion con exito")
        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Se ha completado la petición");
        }
    });
}
function traerMensaje(){
    let id = $("#idMessage").val();
    if(id === ""){
        alert("Ingrese el id")
    }else{
        $.ajax({
            url:ruta + "/api/Message" + "/" + id,
            type:"GET",
            datatype:"JSON",
            success: function(data){
                console.log(data);
                $("#mostrarDataCloud").empty();
                if(data != null){
                    for(i=0; i<data.items.length; i++){
                        $("#idMessage").val(data.items[i].id);
                        $("#messageText").val(data.items[i].messagetext);
                    }
                    alert("peticion con exito")
                }else{
                    alert("id no encontrado")
                }
            },
            error: function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("Se ha completado la petición");
            }
        });
    }
}
function modificarMensaje(){
    let myData={
        id:$("#idMessage").val(),
        messagetext:$("#messageText").val(),
    }
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:ruta + "/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(data){
            $("#mostrarDataCloud").empty();
            $("#idMessage").val("");
            $("#messageText").val("");
            consultarMensajes();
            alert("peticion con exito")
        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Se ha completado la petición");
        }
    });
}
function eliminarMensaje(idElemento){
    let id = idElemento
    $.ajax({
        url:ruta + "/api/Message" + "/" + id,
        type:"DELETE",
        datatype:"JSON",
        success:function(data){
            $("#mostrarDataCloud").empty();
            consultarMensajes();
            alert("peticion con exito")
        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Se ha completado la petición");
        }
    });
}

