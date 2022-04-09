import { Component, OnInit } from '@angular/core';

import { Store } from '../models/store';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  stores: Store[];
  message: string | undefined;

  constructor(private storeService: StoreService) {
    this.stores = new Array();
  }

  ngOnInit(): void {
    this.storeService.getStores().subscribe({
      next: (response) => {
        this.stores = response;
        this.message = "Success message"
      },
      error: (error) => {
        this.message = "Error message"
        console.log('********** IndexComponent.ts: ' + error);
      },
    });
  }
}
