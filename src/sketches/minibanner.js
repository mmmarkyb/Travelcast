export default function minibanner (p) {
  let country = "default";
  let city = "default";
  let cond = "default";
  let temp = "0";
  let feels = "0";
  let date = "0";
  let iconURL = "default";
  let img;
  let logoIcon;
  let logoIconUrl;

  let timer = 0;
  let speed = 0.1;
  let display = false;
  let tempY = 23;

  p.setup = function () {
    p.createCanvas(414, 35);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    //Country
    if(props.countryValue){
        country = props.countryValue;
    }

    //Current Temp
    if(props.temp){
        temp = props.temp;
    }

    //City
    if(props.city){
        city = props.city;
    }

    //Current conditions
    if(props.cond){
        cond = props.cond;
    }

    //Conditions icon image
    if(props.iconURL){
        iconURL = props.iconURL;
        var re = /\/k\//gi;
        var rep = iconURL.replace(re, "/k/");
        img = p.loadImage(rep);
    }

    //Travelcast logo image
    if(props.logo){
        logoIconUrl = props.logo;
        logoIcon = p.loadImage("https://image.ibb.co/ebySSn/logo2.png"); 
    }
  };
 
  p.draw = function () {
    p.textAlign(p.LEFT);
    p.background("#f5a55d");
    p.image(logoIcon, 0, -7, 50, 50);
    p.textSize(14);
    p.fill(255, 125);
    p.text("Travelcast", 40, 23);

    p.fill(255);
    p.text(temp + "°C", p.width - 90, tempY);
    p.image(img, p.width - 50, tempY - 20, 27, 27);
    p.noStroke();
    p.fill("#e48f45");
    p.rect(0, p.height-5, p.width, 5 );
  };
};
