import { Injectable } from '@angular/core';

import { SessionService } from '../services/session.service';
import { Staff } from '../models/staff';
import { AccessRightEnum } from '../models/enum/access-right-enum';

@Injectable({
  providedIn: 'root',
})

export class StaffService {

  staff: Staff[] | null;

  // Hard-coded, not linked to web services
  
  constructor(private sessionService: SessionService) {
    this.staff = this.sessionService.getStaff();

    if (this.staff == null) {

      this.staff = new Array();

      let newStaff: Staff;
      newStaff = new Staff(1, "Manager", "One", AccessRightEnum.MANAGER, "manager", "password");
      this.staff.push(newStaff);
      newStaff = new Staff(2, "Cashier", "One", AccessRightEnum.CASHIER, "cashier", "password");
      this.staff.push(newStaff);
      newStaff = new Staff(3, "Tailor", "One", AccessRightEnum.TAILOR, "tailor", "password");
      this.staff.push(newStaff);

      this.sessionService.setStaff(this.staff);
    }
  }

  getStaff() {
    return this.staff;
  }
}
