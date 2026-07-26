const request = require("supertest");
const app = require("../../app");

describe("GET /health", () => {
  test("should return API health status", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("PagePulse API is running 🚀");
  });
});