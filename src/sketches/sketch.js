export default function sketch (p) {
  let country = "default";
  let city = "default";
  let cond = "default";
  let temp = "0";
  let feels = "0";
  let date = "0";
 let iconURL = "default";
  let img;
  let tempx=10;
  let thisFont;
  let logoIconUrl = "default";
  let logoIcon;
  let bgimg;
  let storedCond;
  let foreCastDays = [];

  //Rain
  var rainDrops = [];
  var numRain = 30;

  //Snow
  var snowDrops = [];
  var numSnow = 30;

  p.setup = function () {
    p.createCanvas(414, 250);
    
    //Make Rain
    for(var i = 0; i < numRain; i++){
        var x = p.random(0, window.innerWidth);
        var y = p.random(0, window.innerHeight);
        var d = p.random(5,20);
        var speed = p.random(0.1 , 1.5);
        rainDrops[i] = new Rain(x, y, d, speed);
    }

    //Make Snow
    for(var i = 0; i < numSnow; i++){
        var x = p.random(0, window.innerWidth);
        var y = p.random(0, window.innerHeight);
        var d = p.random(5,9);
        var speed = p.random(0.1 , 1.5);
        snowDrops[i] = new Snow(x, y, d, speed);
    }
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

    //Current feels like temp
    if(props.feels){
        feels = props.feels;
    }

    //City
    if(props.city){
        city = props.city;
    }

    //Current conditions
    if(props.cond){
        cond = props.cond;
        storedCond = cond;
        //cond = "Light Snow";
    }

    //Current Date
    if(props.date){
        date = props.date;
    }

    //forecast Days
    if(props.fcDays){
        foreCastDays = props.fcDays;
    }

    //Conditions icon image
    if(props.iconURL){
        // iconURL = props.iconURL;
        // var re = /\/k\//gi;
        // var rep = iconURL.replace(re, "/k/");
          
        if(cond == "Mostly Cloudy" || cond == "Partly Cloudy" || cond == "Scattered Clouds"){
            img = p.loadImage("https://image.ibb.co/ePPUCn/cloud.png");
        }else if(cond == "Clear"){
            img = p.loadImage("https://image.ibb.co/b7tZdS/sun.png");
        }else if(cond == "Light Rain" || cond == "Heavy Rain" || cond == "Light Drizzle" || cond == "Heavy Drizzle" || cond == "Light Rain Mist" 
        || cond == "Heavy Rain Mist" || cond == "Light Rain Showers" || cond == "Heavy Rain Showers" || cond == "Light Thunderstorms and Rain"
        || cond == "Heavy Thunderstorms and Rain" || cond == "Light Thunderstorm" || cond == "Heavy Thunderstorm" || cond == "Heavy Freezing Drizzle"
        || cond == "Light Freezing Drizzle" || cond == "Heavy Freezing Rain" || cond == "Light Freezing Rain" || cond == "Rain"){
            img = p.loadImage("https://image.ibb.co/cNJd57/rain.png");
        }else if(cond == "Light Snow" || cond == "Heavy Snow" || cond == "Light Snow Grains" || cond == "Heavy Snow Grains" || cond == "Heavy Ice Crystals"
              || cond == "Light Ice Crystals" || cond == "Light Ice Pellets" || cond == "Heavy Ice Pellets" || cond == "Light Hail" || cond == "Heavy Hail"
              || cond == "Light Low Drifting Snow" || cond == "Heavy Low Drifting Snow" || cond == "Heavy Blowing Snow" || cond == "Light Blowing Snow"
              || cond == "Light Snow Showers" || cond == "Heavy Snow Showers" || cond == "Light Snow Blowing Snow Mist" || cond == "Heavy Snow Blowing Snow Mist" 
              || cond == "Light Ice Pellet Showers" || cond == "Heavy Ice Pellet Showers" || cond == "Light Hail Showers" || cond == "Heavy Hail Showers"
              || cond == "Light Small Hail Showers" || cond == "Heavy Small Hail Showers" || cond == "Small Hail"){
            img = p.loadImage("https://image.ibb.co/e50857/snowflake.png");      
        }else{
            img = p.loadImage("https://image.ibb.co/b7tZdS/sun.png");
        }  
        cond = storedCond;
    }

    //Travelcast logo image
    if(props.logo){
        logoIconUrl = props.logo;
        logoIcon = p.loadImage("https://image.ibb.co/ebySSn/logo2.png"); 
    }

    //Background Image
    if(props.bglink){
        if(cond == "Clear" || cond == "Sunny"){
            bgimg = p.loadImage("https://image.ibb.co/epQoiS/bgClear.jpg");
            cond = storedCond;
        }else{
            bgimg = p.loadImage(props.bglink); 
        }  
    }
  };
 
  p.draw = function () {
    p.textAlign(p.LEFT);
    p.background(bgimg);

    //Background based on conditions
    if(cond == "Mostly Cloudy" || cond == "Partly Cloudy" || cond == "Scattered Clouds"){
        p.fill(125, 0);
        p.rect(0, 0, p.width, p.height);
    }else if(cond == "Clear"){
    }else if(cond == "Light Rain" || cond == "Heavy Rain" || cond == "Light Drizzle" || cond == "Heavy Drizzle" || cond == "Light Rain Mist" 
          || cond == "Heavy Rain Mist" || cond == "Light Rain Showers" || cond == "Heavy Rain Showers" || cond == "Light Thunderstorms and Rain"
          || cond == "Heavy Thunderstorms and Rain" || cond == "Light Thunderstorm" || cond == "Heavy Thunderstorm" || cond == "Heavy Freezing Drizzle"
          || cond == "Light Freezing Drizzle" || cond == "Heavy Freezing Rain" || cond == "Light Freezing Rain" || cond == "Rain"){
        //Rain display
        for(var i = 0; i < rainDrops.length; i++){
            rainDrops[i].move();
            rainDrops[i].display();
            rainDrops[i].reset();
        }
    }else if(cond == "Light Snow" || cond == "Heavy Snow" || cond == "Light Snow Grains" || cond == "Heavy Snow Grains" || cond == "Heavy Ice Crystals"
          || cond == "Light Ice Crystals" || cond == "Light Ice Pellets" || cond == "Heavy Ice Pellets" || cond == "Light Hail" || cond == "Heavy Hail"
          || cond == "Light Low Drifting Snow" || cond == "Heavy Low Drifting Snow" || cond == "Heavy Blowing Snow" || cond == "Light Blowing Snow"
          || cond == "Light Snow Showers" || cond == "Heavy Snow Showers" || cond == "Light Snow Blowing Snow Mist" || cond == "Heavy Snow Blowing Snow Mist" 
          || cond == "Light Ice Pellet Showers" || cond == "Heavy Ice Pellet Showers" || cond == "Light Hail Showers" || cond == "Heavy Hail Showers"
          || cond == "Light Small Hail Showers" || cond == "Heavy Small Hail Showers" || cond == "Small Hail"){
        //Snow display
        p.fill(200, 90);
        p.rect(0, 0, p.width, p.height);
        for(var i = 0; i < snowDrops.length; i++){
            snowDrops[i].move();
            snowDrops[i].display();
            snowDrops[i].reset();
        }
        
    }

    p.noFill();
    p.fill(255, 125);
    p.text("Travelcast", 40, 30);
    p.noStroke();
    p.fill(255);
    p.textSize(20);
    p.text(city + ", " + country, 20, 80);
    p.textSize(15);
    p.fill(255, 125);
    p.text(date, 20, 100);   
    p.textSize(40);
    p.fill(255);
    p.text(temp + "°C", tempx+10, 150);
    p.textSize(15);
    p.fill(255, 125);
    p.text("Feels like " + feels + "°C", 20, 180);
    p.textAlign(p.CENTER);
    p.textSize(16);
    p.fill(255);
    p.text("Today", p.width/2, p.height*0.9);
    p.image(img, 260, 100, 100, 100);
    p.image(logoIcon, 8, 2, 45, 45);
  };

/*=============================================================================================================
//                                                 Rain class
/=============================================================================================================*/
  class Rain{
      constructor(x, y, d, speed){
        this.x = x;
        this.y = y;
        this.d = d;
        this.speed = speed;
        this.brightness = 40;
      }

      display(){
        p.fill(110,169,206, this.brightness);
        p.ellipse(this.x, this.y, this.d, this.d);
      }

      move(){
        this.y += this.speed;
      }

      reset(){
        if(this.y >= p.height + this.d){
          this.d = p.random(5,20);
          this.x = p.random(0, p.width);
          this.y = 0 - this.d;
        }
      }
  }

/*=============================================================================================================
//                                                 Snow Class
/=============================================================================================================*/
  class Snow{
    constructor(x, y, d, speed){
      this.x = x;
      this.y = y;
      this.d = d;
      this.speed = speed;
      this.brightness = 40;
    }

    display(){
      p.fill(255, this.brightness);
      p.ellipse(this.x, this.y, this.d, this.d);
    }

    move(){
      this.y += this.speed;
    }

    reset(){
      if(this.y >= p.height + this.d){
        this.d = p.random(5,9);
        this.x = p.random(0, p.width);
        this.y = 0 - this.d;
      }
    }
}
};
