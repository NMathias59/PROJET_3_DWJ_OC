class BikeStation {

    constructor(stationArray) {
        this.number = stationArray.number;
        this.name = stationArray.name;
        this.adress = stationArray.address;
        this.position = new Position(stationArray.position);
        this.banking = stationArray.banking;
        this.status = stationArray.status;
        this.totalStands = new Availability(stationArray.totalStands);

    }
}

class Position {
    constructor(positionArray) {
        this.latitude = positionArray.latitude;
        this.longitude = positionArray.longitude;
    }
}

class Availability {

    constructor(availabilityArray) {
        this.bikes = availabilityArray.bikes;
        this.stands = availabilityArray.stands;

    }
}

const station = async () => {

    //create icon custom

    let iconBike = L.icon({
        iconUrl: 'img/side.svg',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
    });
    let iconEmptyBike = L.icon({
        iconUrl: 'img/emptybike.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
    });

    let iconSelectedBike = L.icon({
        iconUrl: 'img/bicycle.svg',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
    });

    let iconReservedBike = L.icon({
        iconUrl: 'img/emptybike.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
    });

    let selectedMarker = null;

    //localisation map
    const ly = [45.750000, 4.850000];

// map creation
    let map = L.map('map').setView(ly, 11);

    // creating the image layer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/ ">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/ ">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/ ">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    }).addTo(map);

    let listStations = [];

    let stationsArray = await $.get('https://api.jcdecaux.com/vls/v3/stations?contract=Lyon&apiKey=aa5d028a35d8a2131cf019c1b7b9790f493c9cbe');

    for (let stationArray of stationsArray) {
        if (stationArray.status === 'CLOSED') {
            continue;
        }
        let bikeStation = new BikeStation(stationArray);
        listStations.push(bikeStation);
        let marker = L.marker([bikeStation.position.latitude, bikeStation.position.longitude], {
            title: bikeStation.adress,
            icon: (bikeStation.totalStands.bikes === 0) ? iconEmptyBike : iconBike
        }).addTo(map);
        marker.on('click', function (e) {
            if (!localStorage.getItem('id'))
             {
                let Address = document.getElementById("address");
                Address.value = bikeStation.adress;
                let id = document.getElementById("id");
                id.value = bikeStation.number;
                if (selectedMarker !== null) {
                    selectedMarker.setIcon((bikeStation.totalStands.bikes === 0) ? iconEmptyBike : iconBike)
                }
                selectedMarker = marker;
                selectedMarker.setIcon(iconSelectedBike);
             }else{
                alert('Réservation en cours');

            }
        })
    }
    ;
};


station();

