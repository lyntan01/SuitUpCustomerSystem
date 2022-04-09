import { Component, OnInit } from '@angular/core';

import { Staff } from '../models/staff';
import { StaffService } from '../services/staff.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  staffs: Staff[] | null;

  constructor(private staffService: StaffService) {
    this.staffs = new Array();
   }

  ngOnInit(): void {
    this.staffs = this.staffService.getStaff();
  }

}
