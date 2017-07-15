$(document).ready(function(){

/*** Find Location ****/
var latitude;
var longitude;

var txtFun = ["Cerveja", "chá", ];

function geoFindMe() {
    var output = $("#container");
    var bull = $(".bullsheet");

    if (!navigator.geolocation){
    output.append("<p>Geolocation is not supported by your browser</p>");
    return;
    }

    else {
        function success(position) {
            latitude  = position.coords.latitude;
            longitude = position.coords.longitude;
            /* output.append('<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>'); */

            /** Open Weather data **/
            var api = "http://api.openweathermap.org/data/2.5/forecast?q=Lisbon&mode=xml?&APPID=1fba7c3eaa869008374898c6a606fe3e";

            var api2 = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&APPID=1fba7c3eaa869008374898c6a606fe3e&units=metric";

            /** Forecast 10 days **/
            var api3 = "http://api.openweathermap.org/data/2.5/forecast/daily?&lat=" + latitude + "&lon=" + longitude + "&APPID=1fba7c3eaa869008374898c6a606fe3e&units=metric&cnt=10";

            /** Openweather.org API ID **/
            var api_id = "1fba7c3eaa869008374898c6a606fe3e";

            var newArray = [];


            $.getJSON(api3, function(data){

                $(".location").append("<span>" + data.city.name + "</span>");

                /* Get data from openWeather api */
                for (var i=0; i < data.list.length; i++) {

                    var tempMax = Math.round(data.list[i].temp.max);
                    var tempMin = Math.round(data.list[i].temp.min);


                    /* Date */
                    var d = data.list[i].dt;
                    var date = new Date(d*1000);
                    var dateToString = String(date);
                    var weekDay = dateToString.slice(0, 3);
                    var weekDayLong = dateToString.slice(3, 15);

                    /* Icons */
                    var iconW = data.list[i].weather[0].icon;
                    var iconWnum = parseInt(iconW.slice(0, 2));


                    newArray.unshift(iconWnum);


                    output.append("<a href='#' class='day-container dayc"+ [i+1] + " " + iconWnum +"'><div class='icon circle color" + iconWnum + "'></div><div class='date'><div class='week-day'>" + weekDay + "</div>" + " <div class='week-day-long'>" + weekDayLong + "</div></div>" + "<div class='day-temp'>"+"<div class='temp-max'>" + tempMax + "º</div>" + "<div class='temp-min'>" + tempMin + "º</div></div><div class='fun-content" + [i+1] + "'></div></a>");

                    $("#container .dayc1 .date .week-day").html("Today");

                    $(".bullsheet .t1").html(tempMax);


                };

                /* click to expand day-container */
                $(".day-container").click(function(){
                        event.preventDefault();

                        if($(this).hasClass('active')){
                            $(this).removeClass("active");
                            $(this).animate({
                                height: 80
                                }, 300 );
                         }
                        else {
                            $(this).addClass("active");
                            $(this).animate({
                                height: 200
                                }, 300 );

                            $(this).addClass(function () {

                                if($(this).hasClass("color1")) {
                                    $(this).removeClass("color1");
                                }
                                else {
                                    $(this).addClass("color1");
                                }


                            }



                            );




                        }

                });



            });

        }

        function error() {
            output.append('<p>Unable to retrieve your location</p>');
        }

        output.append("<p class='locating'>Locating…</p>");

        navigator.geolocation.getCurrentPosition(success, error);

    }

}

geoFindMe();



});

/*

If iconWnum == 1 then background #day-container.active == #AAA
If iconWnum == 2


*/
