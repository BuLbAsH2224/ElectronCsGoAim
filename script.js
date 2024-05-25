let {mouse, screen, Point, straightTo, getActiveWindow, Button} = require("@nut-tree/nut-js")
const tf = require("@tensorflow/tfjs")
const cocoSsd = require('@tensorflow-models/coco-ssd');
h3.innerText = 2;
h3.innerText = 1;
let screen= require("window-screenshot")
h3.innerText = 2;

let h3 = document.querySelector("h3");
h3.innerText = 2;
let fps = 0;
let model = null
mouse.config.mouseSpeed = 100000;

let imageDOM = document.querySelector("img");
h3.innerText = 1;
async function loadModel(){model = await cocoSsd.load();}
async function showFps(){
   h3.innerText = fps;
   fps = 0;
}
async function draw(predictions){
let text = document.querySelectorAll("h1");
         let shape = document.querySelectorAll("div");
         if(text.length != 0){
            for(let i = 0; i < text.length;i++ ){
         text[i].remove()
            }
         }
         if(shape.length != 0){
            for(let i = 0; i < shape.length;i++ ){
                shape[i].remove()
                   }
            }
      
         for (let item of predictions) {
            let text = document.createElement("h1");
           text.innerText = `${item.class} ${Math.trunc(item.score * 100)}%`
           let shape = document.createElement("div");
           shape.style.position = `absolute`
          
            let cords = item.bbox;
            shape.style.left = `${cords[0]}px`
            shape.style.top = `${cords[1]}px`
            shape.style.width = `${cords[2]}px`
            shape.style.height = `${cords[3]}px`
            document.body.append(shape)
            shape.append(text)
         }   
      }

async function Aim(predictions,windowSize){    
  let persons = predictions.filter(item => item.class === "person");
  draw(persons);
  let center = await mouse.getPosition()
  let person = persons.reduce((closest, item) => {
    let distance = Math.abs((windowSize.left + item.bbox[0] + item.bbox[2] / 2) - center.x);
    return distance < closest.distance ? {distance, item} : closest;
}, {distance: Infinity, item: null}).item;

          if(person != undefined){
            let Target = new Point(person.bbox[0] + (person.bbox[2] / 2) + windowSize.left,person.bbox[1]  + windowSize.top)
           await mouse.move(straightTo(Target))
            await mouse.click(Button.LEFT);
          }
          fps++;
          screenshot()
        
           
}

async function screenshot() {
  let activeWindow = await getActiveWindow();
  h3.innerText = 7;
  let region = await activeWindow.region;
  h3.innerText = 4;
  screen(0, 
   function (err, res) {
     if(err) screenshot()
      h3.innerText = 1;
      imageDOM.src = 'data:image/png;base64,' + Buffer.from(res).toString('base64');
      model.detect(imageDOM).then(pr=>{Aim(pr,region)})
   
   });
}
h3.innerText =5;

loadModel().then(() => {screenshot()})
h3.innerText = 6;
setInterval(showFps,1000)
