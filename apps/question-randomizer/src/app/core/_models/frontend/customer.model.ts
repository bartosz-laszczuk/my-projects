import { IOrder } from './order.model';

export interface ICustomer {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  address: string;
  city: string;
  orders?: IOrder[];
  orderTotal?: number;
  latitude?: number;
  longitude?: number;
}
