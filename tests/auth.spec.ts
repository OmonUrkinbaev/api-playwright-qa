import { test, expect } from "@playwright/test";
import { ApiClient } from "../utils/apiClient";

test.describe("Auth API (DummyJSON)", () => {
  test("POST /auth/login returns accessToken and refreshToken for valid credentials", async ({ request, baseURL }) => {
    const api = new ApiClient(request, baseURL!);

    const res = await api.post("/auth/login", {
      username: "emilys",
      password: "emilyspass",
      expiresInMins: 30,
    });

    expect(res.status()).toBe(200);
    await api.assertJson(res);

    const body = await res.json();
    expect(body).toHaveProperty("accessToken");
    expect(body).toHaveProperty("refreshToken");
    expect(typeof body.accessToken).toBe("string");
    expect(typeof body.refreshToken).toBe("string");
    expect(body.accessToken.length).toBeGreaterThan(10);
  });

  test("POST /auth/login fails for invalid credentials (negative)", async ({ request, baseURL }) => {
    const api = new ApiClient(request, baseURL!);

    const res = await api.post("/auth/login", {
      username: "wrong_user",
      password: "wrong_pass",
    });

    // у разных API может быть 400/401 — главное что не OK
    expect(res.ok()).toBeFalsy();
  });
});
