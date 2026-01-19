import { APIRequestContext, expect } from "@playwright/test";

export class ApiClient {
  constructor(private request: APIRequestContext, private baseURL: string) {}

  async get(path: string, headers?: Record<string, string>) {
    const res = await this.request.get(this.baseURL + path, { headers });
    return res;
  }

  async post(path: string, data: unknown, headers?: Record<string, string>) {
    const res = await this.request.post(this.baseURL + path, { data, headers });
    return res;
  }

  async assertJson(res: any) {
    expect(res.ok()).toBeTruthy();
    const contentType = res.headers()["content-type"] ?? "";
    expect(contentType).toContain("application/json");
  }
}
