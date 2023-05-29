function getMousePos(canvas, evt){
    var rect = canvas.getBoundingClientRect();
    return{
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
var i = 0;
var selected = 1;
var objects = [];
function selectElement(k){
    selected = k;
    var elem = document.querySelector(`#side :nth-child(${k})`);
    elem.style['animation'] = 'side-elem-click 1s';
    elem.addEventListener('animationend', () => {
        elem.style['animation'] = '';
    })
}
function anim(){
    window.requestAnimationFrame(anim);
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.strokeStyle = `#000000`;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    objects.forEach((object) => {
        object.draw();
    })
    if(objects.length > 0 && objects[objects.length-1].type == 'text'){
        // ctx.font = '20px sans-serif';
        // ctx.fillText(objects[objects.length-1].text, objects[objects.length-1].x0, objects[objects.length-1].y0);
        objects[objects.length-1].text = objects[objects.length-1].input.value;
    }
}anim();
var isMouseDown;
var isCtrlDown;
var isShiftDown = 0;
var initmousePos;
var mousePos;
document.addEventListener('mousedown', (e) => {
    isMouseDown = 1;
    initmousePos = getMousePos(canvas, e);
    switch(selected){
        case 1:{
            objects.push(new Line(initmousePos.x, initmousePos.y, initmousePos.x, initmousePos.y));
            break;
        }
        case 2:{
            objects.push(new Arrow(initmousePos.x, initmousePos.y, initmousePos.x, initmousePos.y));
            break;
        }
        case 3:{
            objects.push(new DashedLine(initmousePos.x, initmousePos.y, initmousePos.x, initmousePos.y));
            break;
        }
        case 4:{
            objects.push(new Triangle(initmousePos.x, initmousePos.y, initmousePos.x, initmousePos.y));
            break;
        }
        case 5:{
            objects.push(new FixedEnd(initmousePos.x, initmousePos.y, initmousePos.x, initmousePos.y));
            break;
        }
        case 6:{
            objects.push(new Arc(initmousePos.x, initmousePos.y, initmousePos.x, initmousePos.y));
            break;
        }
        case 7:{
            objects.push(new Circle(initmousePos.x, initmousePos.y, initmousePos.x, initmousePos.y));
            break;
        }
        case 8:{
            objects.push(new Text(initmousePos.x, initmousePos.y, initmousePos.x, initmousePos.y));
            break;
        }
    }
});
document.addEventListener('mousemove', (e) => {
    if(isMouseDown){
        mousePos = getMousePos(canvas, e);
        if(isShiftDown == 0){
            objects[objects.length-1].x = mousePos.x;
            objects[objects.length-1].y = mousePos.y;
        }
        else if(isShiftDown == 1){
            if(Math.abs(mousePos.x-objects[objects.length-1].x0) > Math.abs(mousePos.y-objects[objects.length-1].y0)){
                objects[objects.length-1].x = mousePos.x;
                objects[objects.length-1].y = objects[objects.length-1].y0;
            }
            else if(Math.abs(mousePos.x-objects[objects.length-1].x0) < Math.abs(mousePos.y-objects[objects.length-1].y0)){
                objects[objects.length-1].x = objects[objects.length-1].x0;
                objects[objects.length-1].y = mousePos.y;
            }
        }
    }
});
document.addEventListener('mouseup', (e) => {
    isMouseDown = 0;
});
document.addEventListener('keydown', (e) => {
    if(e.key == 'Control') isCtrlDown = 1;
    if(e.key == 'Shift') isShiftDown = 1;
    if(isCtrlDown){
        if(e.key == 'z' || e.key == 'Z') objects.pop();
    }

});
document.addEventListener('keyup', (e) => {
    if(e.key == 'Control') isCtrlDown = 0;
    if(e.key == 'Shift') isShiftDown = 0;
});