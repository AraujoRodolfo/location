// This is a JavaScript file


//mapa usando api mapaquest - https://developer.mapquest.com/
//lat -> latitude long -> longitude
function chamaMapa(lat, long){
  L.mapquest.key = 'tcUUKAKDlaGggT0S02QpQVWdJm6U6zfT';
  var baseLayer = L.mapquest.tileLayer('dark');

  L.mapquest.geocoding().geocode(['Itanhaém, SP'], showMap);

  function showMap(err, data) {
    var map = createMap();
    map.addControl(L.mapquest.control());
    addLayerControl(map);
  }

  function createMap() {
    var map = L.mapquest.map('map', {
      center: [lat, long],
      zoom: 14,
      layers: baseLayer
    });
    return map;
  }

  function addLayerControl(map) {
    L.control.layers({
      'Map': L.mapquest.tileLayer('map'),
      'Satellite': L.mapquest.tileLayer('satellite'),
      'Hybrid': L.mapquest.tileLayer('hybrid'),
      'Light': L.mapquest.tileLayer('light'),
      'Dark': baseLayer
    }, {}, { position: 'topleft'}).addTo(map);
  }
}
//fim código api mapquest

//função para da api network para checar conexão
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'Conectado na WI-FI';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    return states[networkState];
  }
//ação do botão para chamar o mapa
$(document).on('click','#local',function(){
    //função de sucesso geolocation pegando posição
    function geolocationSuccess(position) {
        chamaMapa(position.coords.latitude,position.coords.longitude);
    }
   //teste de conecxao
    if(checkConnection() != 'No network connection'){
        //executando método que pega longitude e latitude
        navigator.geolocation.getCurrentPosition(geolocationSuccess);
        navigator.notification.beep(1);
    }else{
        navigator.notification.alert("Sem Conexão por favor conectar a uma rede");
        navigator.notification.beep(3);
        navigator.vibrate(6000);
    }

    

});