export interface Currency {
  symbol: string;
  name: string;
  min_amount: string;
  max_amount: string;
  image: string;
  blockchain: string;
}

export interface Order {
  payment_uri: string;
  identifier: string;
  web_url: string;
  address: string;
  tag_memo: string;
  input_currency: string;
  expected_input_amount: number;
  rate: number;
  notes: string;
  reference: null;
  fiat: string;
  language: string;
}

export interface OrderPayload {
  input_currency: string;
  notes: string;
  expected_output_amount: string;
}

export interface OrderPayment {
  identifier: string;
  reference: null;
  created_at: Date;
  edited_at: Date;
  status: Status;
  fiat_amount: number;
  crypto_amount: number;
  unconfirmed_amount: number;
  confirmed_amount: number;
  currency_id: string;
  merchant_device_id: number;
  merchant_device: string;
  address: string;
  tag_memo: string;
  url_ko: null;
  url_ok: null;
  url_standby: null;
  expired_time: Date;
  good_fee: boolean;
  notes: string;
  rbf: boolean;
  safe: boolean;
  fiat: string;
  language: string;
  percentage: number;
  received_amount: number;
  balance_based: string;
  internal_data: null;
  transactions: Transaction[];
}

export interface Transaction {
  confirmed: boolean;
  currency: string;
  amount: number;
  tx_hash: string;
  block: null;
  created_at: Date;
}

export enum Status {
  NR = "NR",
  PE = "PE",
  AC = "AC",
  IA = "IA",
  CO = "CO",
  CA = "CA",
  EX = "EX",
  OC = "OC",
  RF = "RF",
  FA = "FA",
  DE = "DE",
}
