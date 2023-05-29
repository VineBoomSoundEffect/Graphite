function newFile(){
    objects = []
}
function openFile(){
    var text;
    var jsonobjs;
    var input = document.createElement('input');
    input.type = 'file';
    input.click();
    input.addEventListener('change', () => {
        var reader = new FileReader();
        reader.onload = () => {
            text = reader.result;
            jsonobjs = JSON.parse(text);
            objects = [];
            jsonobjs.forEach((jsonobj) => {
                switch(jsonobj.type){
                    case 'line':{
                        objects.push(new Line(jsonobj.x0, jsonobj.y0, jsonobj.x, jsonobj.y))
                        break;
                    }
                    case 'arrow':{
                        objects.push(new Arrow(jsonobj.x0, jsonobj.y0, jsonobj.x, jsonobj.y))
                        break;
                    }
                    case 'dashedline':{
                        objects.push(new DashedLine(jsonobj.x0, jsonobj.y0, jsonobj.x, jsonobj.y))
                        break;
                    }
                    case 'triangle':{
                        objects.push(new Triangle(jsonobj.x0, jsonobj.y0, jsonobj.x, jsonobj.y))
                        break;
                    }
                    case 'fixedend':{
                        objects.push(new FixedEnd(jsonobj.x0, jsonobj.y0, jsonobj.x, jsonobj.y))
                        break;
                    }
                    case 'arc':{
                        objects.push(new Arc(jsonobj.x0, jsonobj.y0, jsonobj.x, jsonobj.y))
                        break;
                    }
                    case 'circle':{
                        objects.push(new Circle(jsonobj.x0, jsonobj.y0, jsonobj.x, jsonobj.y))
                        break;
                    }
                    case 'text':{
                        objects.push(new Text(jsonobj.x0, jsonobj.y0, jsonobj.x, jsonobj.y, jsonobj.text))
                        objects[objects.length-1].text = jsonobj.text;
                        break;
                    }
                }
            });
        };
        reader.readAsText(input.files[0]);
    });
}
function saveFile(){
    var json = JSON.stringify(objects);
    var blob = new Blob([json], {type: 'text/plain'});
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'graphite_file.json';
    a.click();

}
function exportFile(){
    var a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'graphite_image.png';
    a.click();
}