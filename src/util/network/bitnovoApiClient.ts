import axiosClient from "./axiosClient";
import { Currencies } from "./domain/interfaces";

class BitnovoApiClient {
  private axiosClient: any;

  constructor(axiosClient: any) {
    this.axiosClient = axiosClient;
  }

  async getCurrencies(): Promise<Currencies[]> {
    const response = await this.axiosClient.get("/currencies");
    return response.data;
  }
}

const bitnovoApiClient = new BitnovoApiClient(axiosClient);

export default bitnovoApiClient;
