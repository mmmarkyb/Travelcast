export default function details (p) {
  let high="0";
  let low="0";
  let avg="5";
  let month = "Jan";

  let highIcon;
  let lowIcon;
  let lowValue = [];
  let highValue = [];
  let avgValue = [];
 
//https://image.ibb.co/ivxUsn/High.png
//https://image.ibb.co/mFoDJS/Low.png
//https://image.ibb.co/neVhCn/Rain.png
//https://image.ibb.co/hYRpsn/Wind.png

  p.setup = function () {
    p.createCanvas(370, 180); 
    highIcon = p.loadImage("https://image.ibb.co/ivxUsn/High.png");
    lowIcon = p.loadImage("https://image.ibb.co/mFoDJS/Low.png");
    for(var i = 0; i < 4; i++){
      lowValue[i] = p.random(2,6);
      lowValue[i] = Math.ceil(lowValue[i]);
      highValue[i] = p.random(8,15);
      highValue[i] = Math.ceil(highValue[i]);
      avgValue[i] = (lowValue[i] + highValue[i])/2;
      avgValue[i] = Math.ceil(avgValue[i]);
    }
    
    
  };
 
  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    //Month
    if(props.month){
      month = props.month;
    }
  };
 
  p.draw = function () {
    p.textAlign(p.LEFT);
    p.background(255);
    p.fill(0);
    p.textSize(16);
    for(var i = 0; i < 4; i++){
    	  p.text(month, 20, 20 + i*50);
        p.image(lowIcon, 100, 9 + i*50, 15, 15);
        p.image(highIcon, 200, 7 + i*50, 15, 15);
        p.text(lowValue[i] + "°C", 120, 20 + i*50);
        p.text(highValue[i] + "°C", 220, 20 + i*50);
        p.text("Avg " + avgValue[i] + "°C", 290, 20 + i*50);
        p.stroke(240);
        p.line(20, 33+i*50, 350, 33+i*50);
        p.noStroke();
    }
  };
};
