import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  version_app: string = '2.0.1, 18-01-2024'
  constructor() { }

  ngOnInit(): void {
  }

}
