import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customized-main',
  templateUrl: './customized-main.component.html',
  styleUrls: ['./customized-main.component.css']
})
export class CustomizedMainComponent implements OnInit {

  headerImg1 = 'assets/images/customized-main.jpeg';
  headerImg2 = 'assets/images/customized-main-2.jpeg';

  constructor() { }

  ngOnInit(): void {
  }

}
