var timeout;

function validate(_form){

    var fail = false;
    var X = _form.X.value;
    var Y = _form.Y.value;
    var R = _form.R.value;

    if (X <= -3 || X >= 5 || isNaN(X) || X == "" || X.length > 10){
        fail = "X value is incorrect ! \n";
    }

    if (fail){
        alert(fail);
        return false;
    }
    else{
        createCanvas('canvas', X, Y, R);
        return true;
    }
}



function drawCanwas(id, r){
    var canvas = document.getElementById(id),
        context = canvas.getContext("2d");
    //очистка
    context.clearRect(0, 0, canvas.width, canvas.height);

    //прямоугольник
    context.beginPath();
    context.rect(150, 20, 130, 130);
    context.closePath();
    context.strokeStyle = "blue";
    context.fillStyle = "blue";
    context.fill();
    context.stroke();

    // сектор
    context.beginPath();
    context.moveTo(150, 150);
    context.arc(150, 150, 65, 3*Math.PI/2, Math.PI, true );
    context.closePath();
    context.strokeStyle = "blue";
    context.fillStyle = "blue";
    context.fill();
    context.stroke();

    //треугольник
    context.beginPath();
    context.moveTo(215, 150);
    context.lineTo(150, 280);
    context.lineTo(150, 150);
    context.lineTo(85, 150);
    context.closePath();
    context.strokeStyle = "blue";
    context.fillStyle = "blue";
    context.fill();
    context.stroke();

    //отрисовка осей
    context.beginPath();
    context.font = "10px Verdana";
    context.moveTo(150, 0); context.lineTo(150, 300);
    context.moveTo(150, 0); context.lineTo(145, 15);
    context.moveTo(150, 0); context.lineTo(155, 15);
    context.fillText("Y", 160, 10);
    context.moveTo(0, 150); context.lineTo(300, 150);
    context.moveTo(300, 150); context.lineTo(285, 145);
    context.moveTo(300, 150); context.lineTo(285, 155);
    context.fillText("X", 290, 135);

    // деления X
    context.moveTo(145, 20); context.lineTo(155, 20); context.fillText(r, 160, 20);
    context.moveTo(145, 85); context.lineTo(155, 85); context.fillText((r / 2), 160, 78);
    context.moveTo(145, 215); context.lineTo(155, 215); context.fillText(-(r / 2), 160, 215);
    context.moveTo(145, 280); context.lineTo(155, 280); context.fillText(-r, 160, 280);
    // деления Y
    context.moveTo(20, 145); context.lineTo(20, 155); context.fillText(-r, 20, 170);
    context.moveTo(85, 145); context.lineTo(85, 155); context.fillText(-(r / 2), 70, 170);
    context.moveTo(215, 145); context.lineTo(215, 155); context.fillText((r / 2), 215, 170);
    context.moveTo(280, 145); context.lineTo(280, 155); context.fillText(r, 280, 170);

    context.closePath();
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.stroke();
}

function createCanvas(id, x, y, r){
    var canvas = document.getElementById(id),
        context = canvas.getContext("2d");
    drawCanwas(id, r);
    context.beginPath();
    context.rect(Math.round(150 + ((x / r) * 130))-2, Math.round(150 - ((y / r) * 130))-2, 4, 4);
    context.closePath();
    context.strokeStyle = "red";
    context.fillStyle = "red";
    context.fill();
    context.stroke();
    console.log("zdarova");
}

function clicCanvas(canvId, R) {
    var elem = document.getElementById(canvId);
    var br = elem.getBoundingClientRect();
    var left = br.left;
    var top = br.top;
    var event = window.event;
    var x = event.clientX-left;
    var y = event.clientY-top;
    var boolArea = isArea(x, y, R);
    drawPoint(canvId, x, y, boolArea);

    $.ajax({
        type:"get",
        url: "http://localhost:8081/PIP_LAB_2_war_exploded/checking" + "?" + "X=" + x + "&R=" + R + "&Y=" + y,
    });
    console.log("tut")
}

function isArea(x, y, R) {
    x = (x - 150) / 130;
    y = (150 - y) / 130;
    if(x <= 0 && y >= 0 && x * x + y * y <= (R * R) / 3){
        return 'true';
    }
    if(x >= 0 && y <= 0 && y >= (x*1.8 - R)){
        return 'true';
    }
    if(x >= 0 && y >= 0 && x <= R && y <= R){
        return 'true';
    }
    return 'false';
}

function drawPoint(id, x, y, isArea){
    var canvas = document.getElementById(id),
        context = canvas.getContext("2d");

    context.beginPath();
    context.rect(x - 2, y - 2, 4, 4);
    context.closePath();
    if(isArea === 'true'){
        context.strokeStyle = "green";
        context.fillStyle = "green";
    } else {
        context.strokeStyle = "red";
        context.fillStyle = "red";
    }
    context.fill();
    context.stroke();
}