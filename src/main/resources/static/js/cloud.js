let ruta = "http://localhost:8080"
//let ruta = "http://130.162.41.185:8080"

function consultarCloud(){
    $.ajax({
        url: ruta + "/api/Cloud/all",
        type:"GET",
        datatype:"JSON",
        success: function(data){
            console.log(data);
            $("#mostrarDataCloud").empty();
            mostrarCloud(data.items);
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
function mostrarCloud(items){
    let myTable = "<table>";
    myTable += "<thead>";
    myTable += "<tr>";
    myTable += "<td>"+"ID"+"</td>";
    myTable += "<td>"+"BRAND"+"</td>";
    myTable += "<td>"+"MODEL"+"</td>";
    myTable += "<td>"+"CATEGORY_ID"+"</td>";
    myTable += "<td>"+"NAME"+"</td>";
    myTable += "<td>"+"BUTTON"+"</td>";
    myTable += "</tr>";
    myTable += "</thead>";
    for(i = 0; i < items.length; i++){
        myTable += "<tr>";
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td>" + items[i].brand + "</td>";
        myTable += "<td>" + items[i].model + "</td>";
        myTable += "<td>" + items[i].category_id + "</td>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td> <button onclick='eliminarCloud("+items[i].id+")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#mostrarDataCloud").append(myTable);
}
function crearCloud(){
    let myData = {
        id:$("#id").val(),
        brand:$("#brand").val(),
        model:$("#model").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url:ruta + "/api/Cloud/save",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(data){
            $("#mostrarDataCloud").empty();
            $("#id").val("");
            $("#brand").val("");
            $("#model").val("");
            $("#category_id").val("");
            $("#name").val("");
            consultarCloud();
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
function traerCloud(){
    let id = $("#id").val();
    if(id === ""){
        alert("Ingrese el id")
    }else{
        $.ajax({
            url:ruta + "/api/Cloud" + "/" + id,
            type:"GET",
            datatype:"JSON",
            success: function(data){
                console.log(data);
                $("#mostrarDataCloud").empty();
                if(data != null){
                    for(i=0; i<data.items.length; i++){
                        $("#id").val(data.items[i].id);
                        $("#brand").val(data.items[i].brand);
                        $("#model").val(data.items[i].model);
                        $("#category_id").val(data.items[i].category_id);
                        $("#name").val(data.items[i].name);
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
function modificarCloud(){
    let myData={
        id:$("#id").val(),
        brand:$("#brand").val(),
        model:$("#model").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val(),
    }
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:ruta + "/api/Cloud/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(data){
            $("#mostrarDataCloud").empty();
            $("#id").val("");
            $("#brand").val("");
            $("#model").val("");
            $("#category_id").val("");
            $("#name").val("");
            consultarCloud();
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
function eliminarCloud(idElemento){
    let id = idElemento
    $.ajax({
        url:ruta + "/api/Cloud" + "/" + id,
        type:"DELETE",
        datatype:"JSON",
        success:function(data){
            $("#mostrarDataCloud").empty();
            consultarCloud();
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

