const request = require("supertest");
const app = require("../../app");
const cache = require("../../cache/cache"); 
describe("POST /api/v1/audit", () => {
  jest.setTimeout(30000);
 
  beforeEach(() => {
  cache.flushAll();
});

  test("should audit a valid website successfully", async () => {
    const res = await request(app)
      .post("/api/v1/audit")
      .send({
        url: "https://developer.mozilla.org",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    expect(res.body.data).toHaveProperty("overall");
    expect(res.body.data).toHaveProperty("seo");
    expect(res.body.data).toHaveProperty("images");
    expect(res.body.data).toHaveProperty("links");
    expect(res.body.data).toHaveProperty("security");
    expect(res.body.data).toHaveProperty("robots");
    expect(res.body.data).toHaveProperty("performance");
  });

  test("should return 400 when URL is missing", async () => {
    const res = await request(app)
      .post("/api/v1/audit")
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("should return 400 for an invalid URL", async () => {
    const res = await request(app)
      .post("/api/v1/audit")
      .send({
        url: "not-a-valid-url",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("should return an error for an unreachable website", async () => {
    const res = await request(app)
      .post("/api/v1/audit")
      .send({
        url: "https://this-domain-does-not-exist-xyz-12345.com",
      });
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
    expect(res.body.success).toBe(false);
  });
  test("should return cached response on repeated request", async () => {
  const body = {
    url: "https://developer.mozilla.org",
  };

  const first = await request(app)
    .post("/api/v1/audit")
    .send(body);

  const second = await request(app)
    .post("/api/v1/audit")
    .send(body);

  expect(first.statusCode).toBe(200);
  expect(second.statusCode).toBe(200);

  expect(first.body.data.cached).toBe(false);
  expect(second.body.data.cached).toBe(true);
});
});