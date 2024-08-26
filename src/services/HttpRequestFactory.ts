import axios from "axios";
import { HttpResponse } from "../response/HttpResponse";

export class HttpRequestFactory {
  public async getRequest<T = any>(url: string): Promise<HttpResponse> {
    const response = await axios.get<T>(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      console.log(response);
      throw new Error(`Error status ${response.status} -- ${response.data}`);
    } else {
      return { status: response.status, response: response.data };
    }
  }

  public async postRequest<T = any>(
    url: string,
    data: any
  ): Promise<HttpResponse> {
    const response = await axios.post<T>(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      console.log(response);
      throw new Error(`Error status ${response.status} -- ${response.data}`);
    } else {
      return { status: response.status, response: response.data };
    }
  }

  public async deleteRequest<T = any>(url: string): Promise<HttpResponse> {
    const response = await axios.delete<T>(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      console.log(response);
      throw new Error(`Error status ${response.status} -- ${response.data}`);
    } else {
      return { status: response.status, response: response.data };
    }
  }
}
