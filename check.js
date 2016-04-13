/* global $,L */
'use strict';
$(function(){
    /*var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    });*/

    var accessToken = 'pk.eyJ1Ijoic3RldmFnZSIsImEiOiJGcW03aExzIn0.QUkUmTGIO3gGt83HiRIjQw';
    // Replace 'mapbox.streets' with your map id.
    var layer = L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + accessToken, {
        attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    var gdalLocation = [-37.5,145];

    $('#check').click(function() {
        $('.phase-results').show();

        var map = L.map('map', {
          scrollWheelZoom: false,
          center: gdalLocation,
          zoom: 13
        });

        map.addLayer(layer);
        L.marker(gdalLocation).addTo(map);
        map.on('moveend', function(e) {

            var center = map.getCenter();
            var dist = Number(center.distanceTo(gdalLocation)).toFixed(1);
            $('#latlon').html('The address <b>' + $('#address').val() + '</b> should be at ' + Number(center.lat).toFixed(4) + ',' + Number(center.lng).toFixed(4) +
                '. That\'s <b>' + dist + ' metres</b> away.');
        });
    });

    $('#btn-no').click(function() {
        $('.phase-no').show();
        $('#map .leaflet-control-container').append($('<div id="crosshair"></div>'));
    });

    $('#btn-yes').click(function() {
        $('.phase-yes').show();
    });

    //$('#check').trigger('click');


});