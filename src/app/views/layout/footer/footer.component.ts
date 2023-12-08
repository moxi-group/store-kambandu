import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  version_app: string = '1.0.1, 08-12-2023'
  constructor() { }

  ngOnInit(): void {
  }

}
