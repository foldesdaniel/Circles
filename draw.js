let canvas = $("#myCanvas")[0],
    ctx = canvas.getContext('2d'),
    circles = [],
    colors = ["orange", "yellow", "blue", "green", "purple"],
    x, y;

function Circle(x, y, r, color, angle, vertical, horizontal, value) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.angle = angle;
    this.vertical = vertical;
    this.horizontal = horizontal;
    this.value = value;
}

function init() {
    let random = Math.floor(Math.random() * 80) + 40; //creates circles between 10 and 30
    for(i = 0; i < random; i++) {
         let angle = Math.random() * (Math.PI * 2) * Math.floor(Math.random() * 360);
         circles.push(new Circle(
            Math.floor(Math.random() * window.innerWidth),
            Math.floor(Math.random() * window.innerHeight),
            Math.floor(Math.random() * 50) + 15,
            colors[Math.floor(Math.random() * 5)],
            angle,
            Math.sin(angle) > 0 ? "up" : "down",
            Math.cos(angle) > 0 ? "right" : "left",
            i == 1 ? "X" : "Y"
         ));
    }
}

function Draw() {
    Clear();
    ctx.beginPath();
    ctx.fillStyle = "#333333";
    ctx.arc(x, y, 120, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    for(i = 0; i < circles.length; i++) {
        let c = circles[i];
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = c.r / 5;
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
        ChangeDirection(i);
        CheckInside(i);
    }
}

function CheckInside(i) {
    //for(i = 0; i < circles.length; i++) {
        let c = circles[i],
            d = Math.sqrt(Math.pow(c.x > x ? c.x - x : x - c.x, 2) + Math.pow(c.y > y ? c.y - y : y - c.y, 2));
            //current_color = window.getComputedStyle(this.fillStyle).getPropertyValue("background-color")
            //120 - c.r < d && d < 120 + c.r || d == 120 || d == c.r || d == 0
        if(d < 120) {
            /*for(_y = -120; _y <= 120; _y++) {
                for(_x = -120; _x <= 120; _x++) {
                    if(_x*_x+_y*_y <= 120*120) {

                    }
                }
            }*/
            ctx.font = c.r * 1.5 + "px Comic Sans MS";
            ctx.fillStyle = c.value == "Y" ? "green" : "red";
            ctx.textAlign = "center";
            ctx.fillText(c.value == "Y" ? "Y" : "X", c.x, c.y + c.r/1.5);
        }
    //}
}

function ChangeDirection(i) {
    /*
        if:
            cos +   right
            cos -   left
            sin -   down
            sin +   up
    */
    let c = circles[i],
        width = $("#myCanvas").width(),
        height = $("#myCanvas").height(),
        r = c.r;

    if(c.x > width - r) {
        c.horizontal = "left";
        while(c.x > width - r) Math.cos(c.angle) > 0 ? c.x -= Math.cos(c.angle) : c.x += Math.cos(c.angle);
    }
    if(c.y < r) {
        c.vertical = "down";
        while(c.y < r) Math.sin(c.angle) > 0 ? c.y += Math.sin(c.angle) : c.y -= Math.sin(c.angle);
    }
    if(c.x < r) {
        c.horizontal = "right";
        while(c.x < r) Math.cos(c.angle) > 0 ? c.x += Math.cos(c.angle) : c.x -= Math.cos(c.angle);
    }
    if(c.y > height - r) {
        c.vertical = "up";
        while(c.y > height - r) Math.sin(c.angle) > 0 ? c.y -= Math.sin(c.angle) : c.y += Math.sin(c.angle);
    }
    //////////////////////////////////////////////
    for(i = 0; i < 2; i++) {
        if(c.horizontal == "left" && c.vertical == "up") {
            Math.cos(c.angle) > 0 ? c.x -= Math.cos(c.angle) : c.x += Math.cos(c.angle);
            Math.sin(c.angle) > 0 ? c.y -= Math.sin(c.angle) : c.y += Math.sin(c.angle);
        }
        else if(c.horizontal == "left" && c.vertical == "down") {
            Math.cos(c.angle) > 0 ? c.x -= Math.cos(c.angle) : c.x += Math.cos(c.angle);
            Math.sin(c.angle) > 0 ? c.y += Math.sin(c.angle) : c.y -= Math.sin(c.angle);
        }
        else if(c.horizontal == "right" && c.vertical == "down") {
            Math.cos(c.angle) > 0 ? c.x += Math.cos(c.angle) : c.x -= Math.cos(c.angle);
            Math.sin(c.angle) > 0 ? c.y += Math.sin(c.angle) : c.y -= Math.sin(c.angle);
        }
        else if(c.horizontal == "right" && c.vertical == "up") {
            Math.cos(c.angle) > 0 ? c.x += Math.cos(c.angle) : c.x -= Math.cos(c.angle);
            Math.sin(c.angle) > 0 ? c.y -= Math.sin(c.angle) : c.y += Math.sin(c.angle);
        }
    }
}

function Clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

$(init);

$(document).ready(function(){
    let basic_width = $(window).width(),
        basic_height = $(window).height();
        //to get the first widht, height
        $("#myCanvas").attr({
            width : $(window).width(),
            height : $(window).height()
        });
    document.addEventListener('mousemove', function(e){
        x = e.clientX,
        y = e.clientY;
    });
    setInterval(Update, 0);
    setInterval(Draw, 0);
    function Update() {
        if(basic_width != $(window).width() || basic_height != $(window).height()) {
            $("#myCanvas").attr({
                width : $(window).width(),
                height : $(window).height()
            });
            basic_width = $(window).width(), basic_height = $(window).height();
        }
    }
});