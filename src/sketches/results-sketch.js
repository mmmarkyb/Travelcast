export default function result (p) {
  let country = "default";
  let city = "default";
  let temp = "0";
  let feels = "0";
  let iconURL = "default";
  let img;
  let tempx=10;
  let w = "0";
  let precip = "0";

  let highIcon;
  let lowIcon;
  let rainIcon;
  let windIcon;

  p.setup = function () {
    p.createCanvas(383, 200); 
    highIcon = p.loadImage("https://image.ibb.co/ivxUsn/High.png");
    lowIcon = p.loadImage("https://image.ibb.co/mFoDJS/Low.png");
    rainIcon = p.loadImage("https://image.ibb.co/neVhCn/Rain.png");
    windIcon = p.loadImage("https://image.ibb.co/hYRpsn/Wind.png");
    
  };
 
  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if(props.countryValue){
        country = props.countryValue;
    }

    if(props.temp){
        temp = props.temp;
    }

    if(props.feels){
        feels = props.feels;
    }

    if(props.city){
        city = props.city;
    }

    if(props.iconURL){
        iconURL = props.iconURL;
        img = p.loadImage(iconURL);
    }

	if(props.w){
        w = props.w;
    }

	if(props.precip){
        precip = props.precip;
    }
  };
 
  p.draw = function () {
    p.textAlign(p.LEFT);
    p.background(255);
    p.fill(0);
    p.textSize(20);
    p.text(city + ", " + country, 30, 30);
    p.textSize(15);
    p.text("AVG", 30, 50);
    p.textSize(40);
    p.text(temp + "°C", tempx+20, 88);
    p.textSize(15);
    p.fill(154);
    p.text("Feels like " + feels + "°C", 30, 115);
    p.textAlign(p.CENTER);
    p.textSize(16);
    p.image(img, 260, 38, 100, 100);

    p.image(rainIcon, 85, 170, 17, 25);
    p.text (precip+" in", 140, 190);

    p.image(windIcon, 215, 176, 20, 20);
    p.text(w+" mph", 275, 192);

    p.stroke(240);
    p.line(16, 150, (p.width - 16), 150);
    p.noStroke();



  };
};
