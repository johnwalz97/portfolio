function Circle(cx, cy, html_id, radius, vel){
    this.info = { cx: cx, html_id: html_id,  cy: cy , r:radius};
    var randomNumberBetween = function(min, max){
        return Math.random()*(max-min) + min;
    }
    this.initialize = function(){
        if (vel) {
            this.info.velocity = {
                x: vel[0],
                y: vel[1]
            }
        } else {
            this.info.velocity = {
                x: randomNumberBetween(-10,10),
                y: randomNumberBetween(-10,10)
            }
        }
        var circle = makeSVG('circle', 
            { 	cx: this.info.cx,
                cy: this.info.cy,
                r:  this.info.r,
                id: html_id,
                style: "fill: red"
            });
        document.getElementById('svg').appendChild(circle);
    }

    this.update = function(time, circles, circle, index){
        var el = document.getElementById(html_id);
        var r = this.info.r;
        if( this.info.cx + r > document.body.clientWidth || this.info.cx - r < 0){
            this.info.velocity.x = this.info.velocity.x * -1;
        }
        if( this.info.cy + r > $("#svg").height() || this.info.cy - r < 0){
            this.info.velocity.y = this.info.velocity.y * -1;
        }
        this.info.cx = this.info.cx + this.info.velocity.x*time;
        this.info.cy = this.info.cy + this.info.velocity.y*time;

        el.setAttribute("cx", this.info.cx);
        el.setAttribute("cy", this.info.cy)
    }
    var makeSVG = function(tag, attrs) {
        var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (var k in attrs){
            el.setAttribute(k, attrs[k]);
        }
        return el;
    }
    this.initialize();
}

function PlayGround(){
    var el = document.getElementById('svg');
    $(el).height($("#project").height() + $("#about").height() + 400);
    $(el).width(window.innerWidth);
    var counter = 0;
    var circles = [ ]; 
    this.loop = function(){
        for(circle in circles)
        {
            circles[circle].update(1, circles, circles[circle], circle);
        }
    }
    this.createNewCircle = function(x,y, r, vel){
        var new_circle = new Circle(x,y,counter++, r, vel);
        circles.push(new_circle);
        return new_circle;
    }
    for(var i = 0; i < 50; i++){
        this.createNewCircle(document.body.clientWidth/2, $("#svg").height()/2, 10);
    }
}
$(document).ready(function(){
    var playground = new PlayGround();
    setInterval(playground.loop, 15);
    setInterval(playground.createNewCircle, 50000);
})
