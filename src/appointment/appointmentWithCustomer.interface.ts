import { Business } from '../business/business.entity';
import { Customer } from '../customer/customer.entity';
import Status from '../status/status.entity';

export interface AppointmentWithCustomerName {
  id: number;
  service: string;
  date: Date;
  dateEnd: Date;
  status: Status;
  business: Business;
  customer: Customer;
}
