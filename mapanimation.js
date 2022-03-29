mapboxgl.accessToken = 'pk.eyJ1Ijoid2FyYnVydG9uaHVudGVyIiwiYSI6ImNsMHp2aWFqdTJlankzY3BudWZwM210a2IifQ.YcgnkxozD0Sn5Eh6plILaw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/navigation-night-v1',
    center: [-71.104081,42.365554],
    zoom: 12
});

//setup markers
var markerArray = [];

markerArray[0] = new mapboxgl.Marker({
	color: "#FF0000",//red
	rotationAlignment: 'map'
})
.setLngLat([-71.192761, 42.357575])
.addTo(map);
markerArray[1] = new mapboxgl.Marker({
	color: "#00ff00",//green
	rotationAlignment: 'map'
})
.setLngLat([0, 0])
.addTo(map);
markerArray[2] = new mapboxgl.Marker({
	color: "#0000ff",//blue
	rotationAlignment: 'map'
})
.setLngLat([0,0])
.addTo(map);
markerArray[3] = new mapboxgl.Marker({
	color: "#FF00ff",//prpl
	rotationAlignment: 'map'
})
.setLngLat([0, 0])
.addTo(map);
markerArray[4] = new mapboxgl.Marker({
	color: "#FFFF00",//yellow
	rotationAlignment: 'map'
})
.setLngLat([0, 0])
.addTo(map);
markerArray[5] = new mapboxgl.Marker({
	color: "#00FFFF",//Aqua
	rotationAlignment: 'map'
})
.setLngLat([0, 0])
.addTo(map);
markerArray[6] = new mapboxgl.Marker({
	color: "#FFFFFF",//White
	rotationAlignment: 'map'
})
.setLngLat([0, 0])
.addTo(map);
markerArray[7] = new mapboxgl.Marker({
	color: "#000000",//blak
	rotationAlignment: 'map'
})
.setLngLat([0, 0])
.addTo(map);
markerArray[8] = new mapboxgl.Marker({
	color: "#552500",//brown
	rotationAlignment: 'map'
})
.setLngLat([0, 0])
.addTo(map);
markerArray[9] = new mapboxgl.Marker({
	color: "#450080",//prpl
	rotationAlignment: 'map'
})
.setLngLat([0, 0])
.addTo(map);

async function run(){
    // get bus data    
	const locations = await getBusLocations();

	//go through the set of vehicles (there's 4 of them) and mark their locations
	locations.forEach((vehicle, i) =>{
		//console.log(locations[i].attributes.latitude);
		let coordinates = [locations[i].attributes.longitude, locations[i].attributes.latitude];
		markerArray[i].setLngLat(coordinates);
		markerArray[i].setRotation(locations[i].attributes.bearing+45);
	});

	// timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();