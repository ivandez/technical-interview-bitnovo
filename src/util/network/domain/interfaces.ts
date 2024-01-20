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
