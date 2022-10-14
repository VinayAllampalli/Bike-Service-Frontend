import { Component, OnInit } from '@angular/core';

import { Loader } from '@googlemaps/js-api-loader';
import { styles } from '../../mapstyles';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})


export class MapsComponent implements OnInit {

  title = 'google-maps';

  private map: google.maps.Map | undefined

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyBs2J-Avb6Y7jTaIJwnBs9WTI7fySH52NM'
    })

    loader.load().then(() => {
      console.log('loaded gmaps')

      const location = { lat: 17.686815, lng: 	83.218483 }

      this.map = new google.maps.Map(document.getElementById("map")!, {
        center: location,
        zoom: 6,
        styles: styles
      })

      const marker = new google.maps.Marker({
        position: location,
        map: this.map,
      });
    })
  }
}



