 function getWeather(lat, lon) {
   $.ajax({
     url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=2ca252d74a373acc1b59fe6e45e5d3ae",
     dataType: "jsonp",
     success: function(data) {
       // get all the information
       var kelvin = data.main.temp;
       var locationName = data.name;
       var icon = data.weather[0].id;
       console.log(kelvin);
       //apparently the temperature is returned in kelvin, so we need to quickly convert it to celsius, which gives a horrible number so is rounded to two decimal places. 
       var celsius = (kelvin - 273.15).toFixed(2);
       var fahrenheit = (1.8 * (kelvin - 273.15) + 32).toFixed(2); // Who in the name of all that is holy uses Fahrenheit? 
       console.log(celsius); // Wh
       $("#tempC").html(celsius + "&deg;C");
       $("#locationName").html(locationName);
       $("#icon").addClass("owf owf-" + icon);
       $("#tempF").html(fahrenheit + "&deg;F").hide();
       
       $("#toggle").click(function(){
         $("#tempC").toggle("slow")
         $("#tempF").toggle("slow")
       });

       //Alters all of the elements to display the information to the user. 

     }
   });
 }
 // Gets the users position 
 if (navigator.geolocation) { // Gets the users position 
   navigator.geolocation.getCurrentPosition(function(position) {
     $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
     var lat = position.coords.latitude;
     var lon = position.coords.longitude;
     getWeather(lat, lon); // Calls the getWeather function which is defined above. Passes two arguments which are the user's current lattitude and longitude. 
   });
 }
 // If there is no location the code stalls and temp is replaced with a message telling the user to turn location on!

 // API key ""2ca252d74a373acc1b59fe6e45e5d3ae""