// create a class called SurrealDB. It will use a http client to make requests to the database server. it will also be a singleton, so it will be a static class.
//
// It will have functions to SELECT, INSERT, UPDATE and DELETE data from the database, along with a function to use raw SQL queries.

import axios, { AxiosInstance } from "axios";
import { SurrealResponse } from "./surrealResponse";

export class Surreal {
  private static instance: Surreal;
  private client: AxiosInstance;

  private constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:8000/",
      headers: {
        Authorization: `Basic ${Buffer.from("root:root").toString("base64")}`,
        Accept: "application/json",
        NS: "pachibot",
        DB: "pachibot",
      },
    });
  }

  public static getInstance(): Surreal {
    if (!Surreal.instance) {
      Surreal.instance = new Surreal();
    }
    return Surreal.instance;
  }

  public async select<type>(table: string): Promise<type[]> {
    const response = await this.client.get(`key/${table}`);

    const responseData = response.data as SurrealResponse<type>[];

    const results = responseData.map((data) => data.result).flat();

    return results;
  }

  public async insert<type>(
    table: string,
    data: any
  ): Promise<SurrealResponse<type>[]> {
    const response = await this.client.post(`key/${table}`, data);
    return response.data as SurrealResponse<type>[];
  }

  public async rawQuery<type>(query: string): Promise<SurrealResponse<type>[]> {
    const response = await this.client.post(`sql`, query);
    return response.data as SurrealResponse<type>[];
  }

  public async update<type>(
    table: string,
    data: any
  ): Promise<SurrealResponse<type>[]> {
    const response = await this.client.put(`key/${table}`, data);
    return response.data as SurrealResponse<type>[];
  }

  public async delete<type>(
    table: string,
    data: any
  ): Promise<SurrealResponse<type>[]> {
    const response = await this.client.delete(`key/${table}`, data);
    return response.data as SurrealResponse<type>[];
  }
}
