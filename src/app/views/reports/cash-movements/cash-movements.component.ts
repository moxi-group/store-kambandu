import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cash-movements',
  templateUrl: './cash-movements.component.html',
  styleUrls: ['./cash-movements.component.scss']
})
export class CashMovementsComponent implements OnInit {
  loading: boolean = false
  constructor() { }

  ngOnInit(): void {
  }

}
