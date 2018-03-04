var suggestionsValue = 1;
var toggleBody = document.getElementById('toggleBody');
var toggleKnob = document.getElementById('toggleKnob');
var toggleValue = document.getElementById('toggleValue');
var cityInput = document.getElementById('city');

var d = new Date();
document.getElementById("date").innerHTML = d.toDateString();

function toggleButton(){

  if(suggestionsValue == 1){
    suggestionsValue = 0;
    toggleBody.classList.add('toggleBodyOff');
    toggleBody.classList.remove('toggleBodyOn');
    cityInput.classList.remove('inputInactive');
    cityInput.disabled = false;
    toggleKnob.style.float = "left";

  } else {
    suggestionsValue = 1;
    toggleBody.classList.add('toggleBodyOn');
    toggleBody.classList.remove('toggleBodyOff');
    cityInput.classList.add('inputInactive');
    cityInput.disabled = true;
    toggleKnob.style.float = "right";
  }
  toggleValue.innerHTML = suggestionsValue;

}
