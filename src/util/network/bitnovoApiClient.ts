import { AxiosInstance } from "axios";
import axiosClient from "./axiosClient";
import {
  Currency,
  Order,
  OrderPayload,
  OrderPayment,
} from "./domain/interfaces";

class BitnovoApiClient {
  private axiosClient: AxiosInstance;

  constructor(axiosClient: AxiosInstance) {
    this.axiosClient = axiosClient;
  }

  async getCurrencies(): Promise<Currency[]> {
    const response = await this.axiosClient.get("/currencies");
    return response.data;
  }

  async makeOrder(payload: OrderPayload): Promise<Order> {
    const response = await this.axiosClient.post("/orders/", payload);

    return response.data;
  }

  async getOrder(identifier: string): Promise<OrderPayment> {
    const response = await this.axiosClient.get(`/orders/info/${identifier}`);

    return response.data[0];
  }
}

const bitnovoApiClient = new BitnovoApiClient(axiosClient);

export default bitnovoApiClient;
