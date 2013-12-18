function initializeFooterMap() {
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(55.683843, 37.62899),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    scrollwheel: false,
    zoomControl:true
  }
  
  var map = new google.maps.Map(document.getElementById("contacts_map"),
      mapOptions);
      
  var image = 'images/map-pin.png';
  
  var moscowLatLng = new google.maps.LatLng(55.683843, 37.62899);
  
  var moscowMarker = new google.maps.Marker({
      position: moscowLatLng,
      map: map,
      icon: image
  });
  
  var kievLatLng = new google.maps.LatLng(50.448061, 30.522256);
  
  var kievMarker = new google.maps.Marker({
      position: kievLatLng,
      map: map,
      icon: image
  });
  
  $(".contacts-tabs .tab[rel='contacts-kiev']").on("click",function() {
    map.setCenter(kievLatLng)
  });
  
  $(".contacts-tabs .tab[rel='contacts-moscow']").on("click",function() {
    map.setCenter(moscowLatLng)
  });
  
}
google.maps.event.addDomListener(window, 'load', initializeFooterMap);