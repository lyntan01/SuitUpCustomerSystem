import { Injectable } from '@angular/core';

import { Staff } from '../models/staff';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  // Temp, hard-coded, not linked to web services
  getStaff(): Staff[] | null
		{		
			try
			{
				return JSON.parse(sessionStorage['staff']);
			}
			catch
			{
				return null;
			}
		}



		setStaff(staff: Staff[]): void
		{
			sessionStorage['staff'] = JSON.stringify(staff);
		}
}
