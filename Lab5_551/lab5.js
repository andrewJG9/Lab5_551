
//  map = L.map('map').setView([51.0447, -114.0719], 11.2);

//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(map);


var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
map = new L.Map('map', { center: new L.LatLng(51.0447, -114.0719), zoom: 11.5 }),
drawnItems = L.featureGroup().addTo(map);
L.control.layers({
'openstreet': osm.addTo(map),
"google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
attribution: 'google'
})
}, { 'drawlayer': drawnItems }, { position: 'topleft', collapsed: false }).addTo(map);
map.addControl(new L.Control.Draw({
edit: {
featureGroup: drawnItems,
poly: {
    allowIntersection: false
}
},
draw: {
polygon: {
    allowIntersection: false,
    showArea: true
}
}
}));

map.on(L.Draw.Event.CREATED, function (event) {
var layer = event.layer;

drawnItems.addLayer(layer);
});


// L.Draw.Polyline
// L.initialize()
// L.addhooks()
// L.removehooks()
// L.deleteLastVertex()
// L.addVertex()
// L.completeShape()

var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

var options = {
  position: 'topleft',
  draw: {
    polygon: {
      allowIntersection: false, // Restricts shapes to simple polygons
      drawError: {
        color: '#e1e100', // Color the shape will turn when intersects
        message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
      },
      shapeOptions: {
        color: '#97009c'
      }
    },
    polyline: {
    	shapeOptions: {
        color: '#f357a1',
        weight: 10
          }
    },
    // disable toolbar item by setting it to false
    polyline: true,
    circle: true, // Turns off this drawing tool
    polygon: true,
    marker: true,
    rectangle: true,
  },
  edit: {
    featureGroup: editableLayers, //REQUIRED!!
    remove: true
  }
};

// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw(options);
map.addControl(drawControl);

var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

map.on('draw:created', function(e) {
  var type = e.layerType,
    layer = e.layer;

  if (type === 'polyline') {
    layer.bindPopup('A polyline!');
  } else if ( type === 'polygon') {
  	layer.bindPopup('A polygon!');
  } else if (type === 'marker') 
  {layer.bindPopup('marker!');}
  else if (type === 'circle') 
  {layer.bindPopup('A circle!');}
   else if (type === 'rectangle') 
  {layer.bindPopup('A rectangle!');}


  editableLayers.addLayer(layer);
});