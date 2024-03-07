import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  version_app: string = '3.0.2, 07/03/2024'
  constructor() { }

  ngOnInit(): void {
  }

}
