const btnTrack = $('#btnTrack'); // Button send

// Span output
const ipOutput =  $('.ip-address');
const locationOutput =  $('.location');
const timezoneOutput =  $('.timezone');
const ispOutput =  $('.isp');
// 

const apiKey = '************'; // Enter your API Key (https://geo.ipify.org/)

// Initialisation map
let latMap = 0;
let lngMap = 0;

var map = L.map('map', { 
    center: [latMap, lngMap],
    zoom: 5,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map); // Show map drawing
var marker = L.marker([latMap, lngMap]).addTo(map); // Add marker to map
//

$(document).ready(function() {

    const api = 'https://geo.ipify.org/api/v1?apiKey=' + apiKey + '&ipAddress=';

    $.ajax({
        url: api,
        method: 'GET',
        cache: true, // otherwise will get fresh copy every page load
        success: function(success) {
            ipOutput.html(success.ip);
            locationOutput.html(`${success.location.country}, ${success.location.city} <br> ${success.location.postalCode} `);
            timezoneOutput.html(`UTC ${success.location.timezone}`);
            ispOutput.html(success.isp);

            map.panTo([success.location.lat, success.location.lng]); // Update location
            marker.setLatLng([success.location.lat, success.location.lng]); // Update marker position
        },
        error: function(error) {
            $('#adresseIP').removeClass('border-2');
            $('#adresseIP').removeClass('border-red-500');
            $('#adresseIP').removeClass('placeholder-red-500');
            
            $('#adresseIP').attr('placeholder', 'Error');
            
            $('#adresseIP').addClass('border-2');
            $('#adresseIP').addClass('border-red-500');
            $('#adresseIP').addClass('placeholder-red-500');
            
            setTimeout(function(){ 
                $('#adresseIP').removeClass('border-2');
                $('#adresseIP').removeClass('border-red-500');
                $('#adresseIP').removeClass('placeholder-red-500');
                $('#adresseIP').attr('placeholder', 'Search for any IP address or domain');
            }, 3000);
        },
        complete: function() {
            $('#adresseIP').val('');
        }
    }); 
});

// When button 'search' is clicked

btnTrack.click(function() {

    let ip = $('#adresseIP').val();
    const api = 'https://geo.ipify.org/api/v1?apiKey=' + apiKey + '&ipAddress=' + ip;

    $.ajax({
        url: api,
        method: 'GET',
        cache: true,
        success: function(success) {
            ipOutput.html(success.ip);
            locationOutput.html(`${success.location.country}, ${success.location.city} <br> ${success.location.postalCode} `);
            timezoneOutput.html(`UTC ${success.location.timezone}`);
            ispOutput.html(success.isp);

            map.panTo([success.location.lat, success.location.lng]);
            marker.setLatLng([success.location.lat, success.location.lng]); 
        },
        error: function(error) {
            $('#adresseIP').removeClass('border-2');
            $('#adresseIP').removeClass('border-red-500');
            $('#adresseIP').removeClass('placeholder-red-500');
            
            $('#adresseIP').attr('placeholder', 'Error');
            
            $('#adresseIP').addClass('border-2');
            $('#adresseIP').addClass('border-red-500');
            $('#adresseIP').addClass('placeholder-red-500');
            
            setTimeout(function(){ 
                $('#adresseIP').removeClass('border-2');
                $('#adresseIP').removeClass('border-red-500');
                $('#adresseIP').removeClass('placeholder-red-500');
                $('#adresseIP').attr('placeholder', 'Search for any IP address or domain');
            }, 3000);
        },
        complete: function() {
            $('#adresseIP').val('');
        }
    });

});