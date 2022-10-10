import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-coursel',
  templateUrl: './coursel.component.html',
  styleUrls: ['./coursel.component.css']
})
export class CourselComponent implements OnInit {
  images = ["../../assets/images/bike 3.jpg","../../assets/images/bike 4.png","../../assets/images/bike 5.jpg"]
  constructor(config: NgbCarouselConfig){
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
   }

  ngOnInit(): void {
  }

}
