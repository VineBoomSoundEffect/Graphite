class Vector{
    constructor(x0, y0, x, y){
        this.x0 = x0;
        this.y0 = y0;
        this.x = x;
        this.y = y;
    }
}
class Line extends Vector{
    constructor(x0, y0, x, y){
        super(x0, y0, x, y);
        this.type = 'line';
    }
    draw(){
        ctx.beginPath();
        ctx.setLineDash([1, 0]);
        ctx.moveTo(this.x0, this.y0);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();    
    }
}
class Arrow extends Vector{
    constructor(x0, y0, x, y){
        super(x0, y0, x, y);
        this.type = 'arrow';
    }
    head = 10;
    angle;
    draw(){
        this.angle = Math.atan2(this.y-this.y0,this.x-this.x0);
        ctx.beginPath();
        ctx.setLineDash([1, 0]);
        ctx.moveTo(this.x0, this.y0);
        ctx.lineTo(this.x, this.y);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.head * Math.cos(this.angle - Math.PI/6), this.y - this.head * Math.sin(this.angle - Math.PI/6))
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.head * Math.cos(this.angle + Math.PI/6), this.y - this.head * Math.sin(this.angle + Math.PI/6));
        ctx.stroke();
    }
}
class DashedLine extends Vector{
    constructor(x0, y0, x, y){
        super(x0, y0, x, y);
        this.type = 'dashedline';
    }
    draw(){
        ctx.beginPath();
        ctx.setLineDash([10, 10]);
        ctx.moveTo(this.x0, this.y0);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();    
    }
}
class Triangle extends Vector{
    constructor(x0, y0, x, y){
        super(x0, y0, x, y);
        this.type = 'triangle';
    }
    draw(){
        ctx.beginPath();
        ctx.setLineDash([1, 0]);
        ctx.moveTo(this.x0, this.y0);
        ctx.lineTo(this.x0, this.y);
        ctx.moveTo(this.x0, this.y0);
        ctx.lineTo(this.x, this.y);
        ctx.moveTo(this.x0, this.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
}
class FixedEnd extends Vector{
    constructor(x0, y0, x, y){
        super(x0, y0, x, y);
        this.type = 'fixedend';
    }
    draw(){
        ctx.beginPath();
        ctx.setLineDash([1, 0]);
        ctx.moveTo(this.x0, this.y0);
        ctx.lineTo(this.x, this.y0);
        if(this.x0 < this.x){
            for(i=this.x0;i<=this.x;i++){
                if(Math.floor(i%20) == 0){
                    ctx.moveTo(i, this.y0);
                    ctx.lineTo(i+20, this.y0-20);
                }
            }
        } else if(this.x0 > this.x){
            for(i=this.x0;i>=this.x;i--){
                if(Math.floor(i%20) == 0){
                    ctx.moveTo(i, this.y0);
                    ctx.lineTo(i+20, this.y0-20);
                }
            }
        }
        ctx.stroke();
    }
}
class Arc extends Vector{
    constructor(x0, y0, x, y){
        super(x0, y0, x, y);
        this.type = 'arc';
    }
    draw(){
        this.radius = Math.sqrt(Math.pow(this.x - this.x0, 2) + Math.pow(this.y - this.y0, 2));
        ctx.beginPath();
        ctx.setLineDash([1, 0]);
        // ctx.moveTo(this.x0, this.y0);//to    a         dot   it's   working
        // ctx.lineTo(this.x0, this.y0);//  draw reference   but    not
        ctx.arc(this.x0, this.y0, this.radius, Math.atan2(this.y-this.y0, this.x-this.x0)+(Math.PI/4), Math.atan2(this.y-this.y0, this.x-this.x0)-(Math.PI/4), 1);
        ctx.stroke();
    }
}
class Circle extends Vector{
    constructor(x0, y0, x, y){
        super(x0, y0, x, y);
        this.type = 'circle';
    }
    draw(){
        this.radius = Math.sqrt(Math.pow(this.x - this.x0, 2) + Math.pow(this.y - this.y0, 2));
        ctx.beginPath();
        ctx.setLineDash([1, 0]);
        ctx.arc(this.x0, this.y0, this.radius, 0, Math.PI*2, 1);
        ctx.stroke();
    }
}
class Text extends Vector{
    constructor(x0, y0, x, y){
        super(x0, y0, x, y);
        this.type = 'text';
        this.input = document.querySelector('input');
        // to unfocus the input, but it's not working
        // this.input.addEventListener('keydown', (e) => {
        //     if(e.key == 'Tab'){
        //         document.querySelector('#bar > div :nth-child(1)').focus(); //random ahh element bruh i dont know
        //     }
        // });
    }
    draw(){
        ctx.beginPath();
        this.input.focus();
        // this.text = this.input.value;
        ctx.font = '20px sans-serif';
        ctx.fillText(this.text, this.x0, this.y0);
    }
}