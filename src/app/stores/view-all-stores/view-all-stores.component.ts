import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/models/store';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-view-all-stores',
  templateUrl: './view-all-stores.component.html',
  styleUrls: ['./view-all-stores.component.css'],
})
export class ViewAllStoresComponent implements OnInit {
  stores: Store[];

  constructor(private storeService: StoreService) {
    this.stores = new Array();
  }

  ngOnInit(): void {
    this.storeService.getStores().subscribe({
      next: (response) => {
        this.stores = response;
        console.log(this.stores);
      },
      error: (error) => {
        console.log('********** Retrieve all credit cards' + error);
      },
    });
  }
}
