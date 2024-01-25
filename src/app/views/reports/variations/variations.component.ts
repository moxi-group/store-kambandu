import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-variations',
  templateUrl: './variations.component.html',
  styleUrls: ['./variations.component.scss']
})
export class VariationsComponent implements OnInit {
  loading: boolean =  false
  constructor() { }

  ngOnInit(): void {
  }

}
