export interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  adress: string;
  speciality: string;
  hospitals: any;
  
}

export interface Doctors_State {
  doctors: Doctor[] | any;
  current: Doctor| any;
  filtered: Doctor[]| any;
  error: any;
  loading: Boolean;
}
