import axiosClient from "./axiosClient";
import { Currency } from "./domain/interfaces";

class BitnovoApiClient {
  private axiosClient: any;

  constructor(axiosClient: any) {
    this.axiosClient = axiosClient;
  }

  async getCurrencies(): Promise<Currency[]> {
    const response = await this.axiosClient.get("/currencies");
    return response.data;
  }

  async makeOrder(payload: any): Promise<any> {
    const response = await this.axiosClient.post("/orders/", payload);

    return response.data;
  }
}

const bitnovoApiClient = new BitnovoApiClient(axiosClient);

export default bitnovoApiClient;
