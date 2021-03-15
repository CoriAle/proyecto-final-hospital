export interface Hospital {
  _id: string;
  name: string;
  adress: string;
  phone: string;
}

export interface Hospitals_State {
  hospitals: Hospital[] | any;
  current: Hospital| any;
  filtered: Hospital[]| any;
  error: any;
  loading: Boolean;
}