// Client types for clientDB

export interface Client {
  id: number;
  first_name: string | null;
  last_name: string | null;
  address_1: string | null;
  address_2: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  email: string | null;
  phone?: string | null;
  account_no: number;
  expiry: number;
  cvv: number;
  IP: string | null;
  mmn: string | null;
  date_of_birth?: string | null;
  phone_verified: boolean;
  address_verified: boolean;
  dob_verified: boolean;
  ip_geolocation_performed: boolean;
  ip_geolocation_results: string | null;
  notes?: string | null;
}

export interface ClientCreate {
  id: number;
  first_name: string | null;
  last_name: string | null;
  address_1: string | null;
  address_2: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  email: string | null;
  phone?: string | null;
  account_no: number;
  expiry: number;
  cvv: number;
  IP: string | null;
  mmn: string | null;
  date_of_birth?: string | null;
  phone_verified: boolean;
  address_verified: boolean;
  dob_verified: boolean;
  ip_geolocation_performed: boolean;
  ip_geolocation_results: string | null;
  notes?: string | null;
}

export interface ClientUpdate {
  id: number;
  first_name: string | null;
  last_name: string | null;
  address_1: string | null;
  address_2: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  email: string | null;
  phone?: string | null;
  account_no: number;
  expiry: number;
  cvv: number;
  IP: string | null;
  mmn: string | null;
  date_of_birth?: string | null;
  phone_verified: boolean;
  address_verified: boolean;
  dob_verified: boolean;
  ip_geolocation_performed: boolean;
  ip_geolocation_results: string | null;
  notes?: string | null;
}
// Client types for clientDB

export interface Client {
  id: number;
  first_name: string | null;
  last_name: string | null;
  address_1: string | null;
  address_2: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  email: string | null;
  phone?: string | null;
  account_no: number;
  expiry: number;
  cvv: number;
  IP: string | null;
  mmn: string | null;
  date_of_birth?: string | null;
  phone_verified: boolean;
  address_verified: boolean;
  dob_verified: boolean;
  ip_geolocation_performed: boolean;
  ip_geolocation_results: string | null;
  notes?: string | null;
}

export interface ClientCreate {
  id: number;
  first_name: string | null;
  last_name: string | null;
  address_1: string | null;
  address_2: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  email: string | null;
  phone?: string | null;
  account_no: number;
  expiry: number;
  cvv: number;
  IP: string | null;
  mmn: string | null;
  date_of_birth?: string | null;
  phone_verified: boolean;
  address_verified: boolean;
  dob_verified: boolean;
  ip_geolocation_performed: boolean;
  ip_geolocation_results: string | null;
  notes?: string | null;
}

export interface ClientUpdate {
  id: number;
  first_name: string | null;
  last_name: string | null;
  address_1: string | null;
  address_2: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  email: string | null;
  phone?: string | null;
  account_no: number;
  expiry: number;
  cvv: number;
  IP: string | null;
  mmn: string | null;
  date_of_birth?: string | null;
  phone_verified: boolean;
  address_verified: boolean;
  dob_verified: boolean;
  ip_geolocation_performed: boolean;
  ip_geolocation_results: string | null;
  notes?: string | null;
}
