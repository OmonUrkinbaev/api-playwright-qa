import { test, expect } from "@playwright/test";
import { ApiClient } from "../utils/apiClient";
import { expectProductShape } from "../utils/validators";

test.describe("Products API (DummyJSON)", () => {
  test("GET /products returns a non-empty products array", async ({ request, baseURL }) => {
    const api = new ApiClient(request, baseURL!);

    const res = await api.get("/products");
    expect(res.status()).toBe(200);
    await api.assertJson(res);

    const body = await res.json();
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);

    expectProductShape(body.products[0]);
  });

  test("GET /products/:id returns correct product shape (data-driven)", async ({ request, baseURL }) => {
    const api = new ApiClient(request, baseURL!);
    const ids = [1, 2, 3, 4];

    for (const id of ids) {
      const res = await api.get(`/products/${id}`);
      expect(res.status(), `id=${id}`).toBe(200);
      await api.assertJson(res);

      const body = await res.json();
      expectProductShape(body);
      expect(body.id).toBe(id);
    }
  });

  test("GET /products/:id returns 404 or an error payload for invalid id (negative)", async ({ request, baseURL }) => {
    const api = new ApiClient(request, baseURL!);

    const res = await api.get("/products/999999");

    // Делаем тест устойчивым: либо 404, либо res.ok=false, либо error/message в body
    if (res.ok()) {
      const body = await res.json();
      expect(body).toHaveProperty("message");
    } else {
      expect([400, 404]).toContain(res.status());
    }
  });
});
