import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
import { v4 as uuidv4 } from 'uuid';
import { Place } from 'src/app/interfaces/place.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private map!: mapboxgl.Map;

  places: Place[] = [{
    id: uuidv4(),
    name: 'Luis',
    lng: -75.75512993545835,
    lat: 45.351977429012345,
    color: '#dd8fee'
  },
  {
    id: uuidv4(),
    name: 'Fernando',
    lng: -75.75195645527508,
    lat: 45.351584045823756,
    color: '#790af0'
  },
  {
    id: uuidv4(),
    name: 'Coral',
    lng: -75.75900589557777,
    lat: 45.34794635758547,
    color: '#19884b'
  }];

  constructor() { }

  ngOnInit(): void {

    this.createMap();

    this.places.forEach(place => this.addMarker(place));

  }

  createMap() {

    (mapboxgl as any).accessToken = environment.MAPBOX_ACCESS_TOKEN;

    this.map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-75.75512993582937, 45.349977429009954],
      zoom: 15.8
    });

  }

  addMarker(marker: Place) {

    const div = document.createElement('div');
    div.setAttribute('style', 'padding: 7px 14px; text-align: center;')

    const h2 = document.createElement('h2');
    h2.innerText = marker.name;

    const btn = document.createElement('button');
    btn.innerText = 'Borrar';
    btn.setAttribute('style',`padding: 10px 20px;
                      color: white;
                      background-color: #C3002F;
                      border: none;
                      outline: none;
                      border-radius: 4px;
                      cursor: pointer;`);

    div.append(h2, btn);

    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false
    }).setDOMContent(div);

    const markerMap = new mapboxgl.Marker({
      draggable: true,
      color: marker.color,
    })
    .setLngLat([marker.lng, marker.lat])
    .setPopup(customPopup)
    .addTo(this.map);

    markerMap.on('drag', () => {

      const lngLat = markerMap.getLngLat();

      console.log(lngLat);

    });

    btn.addEventListener('click', () => {

      markerMap.remove();

    });

  }


  createMarker(input: HTMLInputElement) {

    if (input.value.length === 0) {

      input.setAttribute('class', 'require');

      return;

    }

    const customMasrker: Place = {
      id: uuidv4(),
      lng: -75.75512993582937,
      lat: 45.349977429009954,
      name: input.value,
      color: '#' + Math.floor(Math.random()*16777215).toString(16)

    }

    this.addMarker(customMasrker);

    input.value = '';

  }

}
