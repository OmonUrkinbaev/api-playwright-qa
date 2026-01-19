import { test, expect } from "@playwright/test";
import { ApiClient } from "../utils/apiClient";

test.describe("Auth API (DummyJSON)", () => {
  test("GET /auth/me returns user profile when authorized (token)", async ({ request, baseURL }) => {
    const api = new ApiClient(request, baseURL!);

    // 1) Login to get token
    const loginRes = await api.post("/auth/login", {
      username: "emilys",
      password: "emilyspass",
      expiresInMins: 30,
    });

    expect(loginRes.status()).toBe(200);
    await api.assertJson(loginRes);

    const loginBody = await loginRes.json();
    expect(loginBody).toHaveProperty("accessToken");
    const token = loginBody.accessToken as string;
    expect(token.length).toBeGreaterThan(10);

    // 2) Call protected endpoint with Bearer token
    const meRes = await api.get("/auth/me", {
      Authorization: `Bearer ${token}`,
    });

    expect(meRes.status()).toBe(200);
    await api.assertJson(meRes);

    const meBody = await meRes.json();

    // 3) Assertions that matter for QA (shape + consistency)
    expect(meBody).toHaveProperty("id");
    expect(meBody).toHaveProperty("username");
    expect(typeof meBody.id).toBe("number");
    expect(typeof meBody.username).toBe("string");

    // Optional: confirm same username (if API returns it in login payload)
    // DummyJSON обычно возвращает username в логине — если есть, проверим
    if (loginBody.username) {
      expect(meBody.username).toBe(loginBody.username);
    }
  });

  test("GET /auth/me fails without token (negative)", async ({ request, baseURL }) => {
    const api = new ApiClient(request, baseURL!);

    const res = await api.get("/auth/me");
    expect(res.ok()).toBeFalsy();
    // обычно 401, но пусть будет устойчиво:
    expect([400, 401, 403]).toContain(res.status());
  });
});
