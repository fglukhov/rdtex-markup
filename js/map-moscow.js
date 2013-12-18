﻿function initializeFooterMap() {
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(55.683843, 37.62899),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  }
  
  var map = new google.maps.Map(document.getElementById("contacts_moscow"),
      mapOptions);
      
  var image = 'images/map-pin.png';
  var myLatLng = new google.maps.LatLng(55.683843, 37.62899);
  var beachMarker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: image
  });
}
google.maps.event.addDomListener(window, 'load', initializeFooterMap);