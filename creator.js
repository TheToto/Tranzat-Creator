window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();

wings = ["rd","twi","celestia","luna","butterfly","mouche","sep","Nyan",'aile','Ange','demon'];
tail = ["celestia","luna","twi","rd","sep","demon","Nyan","Pika","wolftail"];
back = ["back1","back2","back3","back4","back5","back6","back7"];
eyes = ["yeux","blase","bourre","colere","demon","excite","fille","kawaii","lunettes","Nyan","oh","Pika","pleure","yeux2"];
mouth = ["content","D","aah","ah","blase_new","jefaislagueule","miam","mrh","oh_new","pas_contente","sep","blase","bouche","bourre","catmouth","colere","demon","kawaii","levres","oh","Pika","slurp"];
hair2 = ["celestia_back","luna_back","none","none","none","none","none","none","none","diplome_back","magicien_back","none","Pika_back","police_back","none","none"];
hair = ["celestia","luna","twi","rd","sep","Ange","catears","cheuveux","Criniere","diplome","magicien","miku","Pika","police","rasta","wolfears"];;
object = ["excite","japon","kawaii","maillot","Pika","rasta","ski"];
nose = ["catnose","wolfnose"];
perso = ["kimkf","minikim","simb"];

var _back, _tail, _wings, _hair2, base, _mouth, _nose, _eyes, _perso, copy, _hair, _object, dparts, dwidth;

var anim_speed = 400;

function init() {
    var canvas = document.getElementById('tranzat_creator');
    _back = new Image();
    _tail = new Image();
    _wings = new Image();
    _hair2 = new Image();
    base = new Image();
    _mouth = new Image();
    _nose = new Image();
    _eyes = new Image();
    _perso = new Image();
    copy = new Image();
    _hair = new Image();
    _object = new Image();
    dparts = [_back,_tail,_wings,_hair2,base,_mouth,_nose,_eyes,_object,_hair,_perso,copy]
    base.src = 'res/base-min.png';
    copy.src = 'res/copy.png';
    dwidth = [canvas.width,canvas.width,canvas.width,canvas.width,0,canvas.width,canvas.width,canvas.width,canvas.width,canvas.width,canvas.width,0]
    base.onload = function() {
        copy.onload = function() {
            draw();
        }
    };
    fillSel();
}

function download() {
    var canvas_down = document.createElement('canvas');
    var can = canvas_down.getContext('2d');
    canvas_down.width = 800;
    canvas_down.height = 800;
    can.clearRect(0, 0, canvas_down.width, canvas_down.height);
    $.each(dparts, function(key,value) {
        can.drawImage(value, 0, 0, 800, 800);
    });
    document.getElementById("download").href = canvas_down.toDataURL();
    document.getElementById("download").download = "tranzat.png";
    canvas_down.remove();
}

function draw() {
    var canvas = document.getElementById('tranzat_creator');
    var can = canvas.getContext('2d');
    can.clearRect(0, 0, canvas.width, canvas.height);
    $.each(dparts, function(key,value) {
        can.drawImage(value, dwidth[key]/2, dwidth[key]/2, canvas.width - dwidth[key], canvas.height - dwidth[key]);
    });
}

function random() {
    let randomparts = [undefined,"tail","wings",undefined,undefined,"mouth",undefined,"eyes",undefined,"hair",undefined,undefined];
    $.each(randomparts, function(key,value) {
        if (value) {
            var part_var = eval(value);
            var part = value;
            var img = eval("_"+part);
            var elem = part_var[Math.floor(Math.random() * part_var.length)];
            console.log(value + " : " + elem);
            var index = dparts.indexOf(img);
            if (elem == "sep") {
                img.data = undefined;
                disappear(index,(new Date()).getTime(),undefined, undefined);
                return;
            }
            var newSrc = "res/"+ part +"/"+ elem +"-min.png";
            var newSrc2;
            if (index == 9) {
                newSrc2 = "res/"+ part +"/"+ hair2[hair.indexOf(elem)] +"-min.png";
            } else {
                
            }
            img.data = elem;
            if (dwidth[index] > 0) {
                img.src = newSrc;
                if (newSrc2)
                    dparts[3].src = newSrc2;
            }
            disappear(index,(new Date()).getTime(),newSrc, newSrc2);
        }
    });
}

function fillSel() {
    $('#selec').empty();
    $('#selec').append('<img name="empty" class="thumb" src="icons/cancel.svg" />');
    var part =  $('#pselected').attr('name');
    var img = eval("_"+part);
    $.each(eval(part), function(key,value) {
        var id;
        if (img.data == value)
            id = "selected";
        $('#selec').append('<img id="'+ id +'" name="'+ value +'" class="thumb" src="res/'+ part +'/preview/'+ value +'-min.png" />');
    });
    if ($("#selected").length == 0) {
        $('.thumb[name=empty]').attr('id',"selected");
    }
    // Set onclick ev
    $(".thumb").click(function(event) {
        var part = $('#pselected').attr('name');
        var img = eval("_"+part);
        var elem = $(event.target).attr('name');
        $('#selected').removeAttr('id');
        $(event.target).attr('id',"selected");

        var index = dparts.indexOf(img);
        if (elem == "empty") {
            img.data = undefined;
            disappear(index,(new Date()).getTime(),undefined, undefined);
            return;
        }
        var newSrc = "res/"+ part +"/"+ elem +"-min.png";
        var newSrc2;
        if (index == 9) {
            newSrc2 = "res/"+ part +"/"+ hair2[hair.indexOf(elem)] +"-min.png";
        }
        img.data = elem;
        if (dwidth[index] > 0) {
            img.src = newSrc;
            if (newSrc2)
                dparts[3].src = newSrc2;
        }
        disappear(index,(new Date()).getTime(),newSrc, newSrc2);
    });
    //
}

function disappear(obj,startTime, newSrc,newSrc2) {
    var canvas = document.getElementById('tranzat_creator');
    var time = (new Date()).getTime() - startTime;
    dwidth[obj] = dwidth[obj] + anim_speed * time / 1000; 
    if (obj == 9) {
        dwidth[3] = dwidth[3] + anim_speed * time / 1000; 
    }
    draw();
    if (canvas.width - dwidth[obj] > 0) {
        requestAnimFrame(function() {
            disappear(obj, startTime, newSrc, newSrc2);
        });
    } else if (newSrc) {
        dparts[obj].src = newSrc;
        if (obj == 9) {
            dparts[3].src = newSrc2;
        }
        dparts[obj].onload = function() {
            appear(obj,(new Date()).getTime());
        }
    } else {
        dparts[obj].src = "";
        if (obj == 9) {
            dwidth[3].src = "";
        }
        draw();
    }
}
function appear(obj,startTime) {
    var canvas = document.getElementById('tranzat_creator');
    var time = (new Date()).getTime() - startTime;
    dwidth[obj] = dwidth[obj] - anim_speed * time / 1000; 
    if (obj == 9) {
        dwidth[3] = dwidth[obj];
    }
    draw();
    if (dwidth[obj] > 0) {
        requestAnimFrame(function() {
            appear(obj, startTime);
        });
    } else {
        dwidth[obj] = 0;
        if (obj == 9) {
            dwidth[3] = 0;
        }
        draw();
    }
}

$( document ).ready(function() {

    $(".scrolld").click(function(event){
        $('#selec').animate({scrollLeft: '-=300px'}, 200);
    });
    $(".scrollu").click(function(event){
        $('#selec').animate({scrollLeft: '+=300px'}, 200);
    });
    $(".scrolldd").click(function(event){
        $('#parts').animate({scrollLeft: '-=170px'}, 200);
    });
    $(".scrolluu").click(function(event){
        $('#parts').animate({scrollLeft: '+=170px'}, 200);
    });
    $("#download").click(function(event){
        download()
    });
    $("#reset").click(function(event){
        init()
    });
    $(".part").click(function(event){
        $('#pselected').removeAttr('id');
        $(event.target).attr('id','pselected');
        $('#selec').css('padding-top','100px');
        setTimeout(function(){
            fillSel();
            $('#selec').css('padding-top','0px');
          }, 200);
    });
    init()
    setTimeout(function(){
        draw()
    }, 750);

});
