import { Request, Response, NextFunction } from "express";
import { sanitizeInput } from "../../src/middleware/sanitizeInput";

describe("santitizeInput middleware - req.body", () => {
  it("should trim and escape strings in req.body", () => {
    const req = {
      body: {
        name: "   <script>alert('x')</script>   ",
        email: "   user@example.com   ",
      },
    } as Request;

    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    sanitizeInput(req, res, next);

    expect(req.body.name).toBe(
      "&lt;script&gt;alert(&#x27;x&#x27;)&lt;&#x2F;script&gt;"
    );
    expect(req.body.email).toBe("user@example.com");
    expect(next).toHaveBeenCalled();
  });

  it("should skip non-string fields", () => {
    const req = {
      body: {
        age: 30,
        active: true,
      },
    } as Request;

    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    sanitizeInput(req, res, next);

    expect(req.body.age).toBe(30);
    expect(req.body.active).toBe(true);
    expect(next).toHaveBeenCalled();
  });
});

describe("sanitizeInput middleware - req.query", () => {
  it("should trim and escape query string fields", () => {
    const req = {
      query: {
        search: " <script>alert('x')</script> ",
        page: " 1 ",
      },
    } as unknown as Request;

    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    sanitizeInput(req, res, next);

    expect(req.query.search).toBe(
      "&lt;script&gt;alert(&#x27;x&#x27;)&lt;&#x2F;script&gt;"
    );
    expect(req.query.page).toBe("1");
    expect(next).toHaveBeenCalled();
  });

  it("should ignore non-string query fields", () => {
    const req = {
      query: {
        limit: 10,
        active: true,
      },
    } as unknown as Request;

    const res = {} as Response;
    const next = jest.fn();

    sanitizeInput(req, res, next);

    expect(req.query.limit).toBe(10);
    expect(req.query.active).toBe(true);
    expect(next).toHaveBeenCalled();
  });
});

describe("sanitizeInput middleware - req.params", () => {
  it("should trim and escape string fields in req.params", () => {
    const req = {
      params: {
        id: " <script>123</script> ",
        slug: " some-course ",
      },
    } as unknown as Request;

    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    sanitizeInput(req, res, next);

    expect(req.params.id).toBe("&lt;script&gt;123&lt;&#x2F;script&gt;");
    expect(req.params.slug).toBe("some-course");
    expect(next).toHaveBeenCalled();
  });

  it("should ignore non-string values in req.params", () => {
    const req = {
      params: {
        numericId: 456,
        isActive: true,
      },
    } as unknown as Request;

    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    sanitizeInput(req, res, next);

    expect(req.params.numericId).toBe(456);
    expect(req.params.isActive).toBe(true);
    expect(next).toHaveBeenCalled();
  });
});
