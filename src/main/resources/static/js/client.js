let ruta = "http://localhost:8080"
//let ruta = "http://130.162.41.185:8080"

function consultarClient(){
    $.ajax({
        url: ruta + "/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success: function(data){
            console.log(data);
            $("#mostrarDataCloud").empty();
            mostrarClient(data.items);
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
function mostrarClient(items){
    let myTable = "<table>";
    myTable += "<thead>";
    myTable += "<tr>";
    myTable += "<td>"+"ID"+"</td>";
    myTable += "<td>"+"NAME"+"</td>";
    myTable += "<td>"+"EMAIL"+"</td>";
    myTable += "<td>"+"AGE"+"</td>";
    myTable += "<td>"+"BUTTON"+"</td>";
    myTable += "</tr>";
    myTable += "</thead>";
    for(i = 0; i < items.length; i++){
        myTable += "<tr>";
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].email + "</td>";
        myTable += "<td>" + items[i].age + "</td>";
        myTable += "<td> <button onclick='eliminarClient("+items[i].id+")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#mostrarDataCloud").append(myTable);
}
function crearClient(){
    let myData = {
        id:$("#idClient").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: ruta + "/api/Client/save",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(data){
            $("#mostrarDataCloud").empty();
            $("#idClient").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");
            consultarClient();
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
function traerClient(){
    let id = $("#idClient").val();
    if(id === ""){
        alert("Ingrese el id")
    }else{
        $.ajax({
            url: ruta + "/api/Client" + "/" + id,
            type:"GET",
            datatype:"JSON",
            success: function(data){
                console.log(data);
                $("#mostrarDataCloud").empty();
                if(data != null){
                    for(i=0; i<data.items.length; i++){
                        $("#idClient").val(data.items[i].id);
                        $("#name").val(data.items[i].name);
                        $("#email").val(data.items[i].email);
                        $("#age").val(data.items[i].age);
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
function modificarClient(){
    let myData={
        id:$("#idClient").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
    }
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: ruta + "/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(data){
            $("#mostrarDataCloud").empty();
            $("#idClient").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");
            consultarClient();
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
function eliminarClient(idElemento){
    let id = idElemento;
    $.ajax({
        url: ruta + "/api/Client" + "/" + id,
        type:"DELETE",
        datatype:"JSON",
        success:function(data){
            $("#mostrarDataCloud").empty();
            consultarClient();
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

