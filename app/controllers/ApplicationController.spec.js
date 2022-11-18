const ApplicationController = require("./ApplicationController");
const NotFoundError = require("../errors/NotFoundError");
const ApplicationError = require("../errors/ApplicationError");

describe("ApplicationController", () => {
  describe("handleGetRoot", () => {
    it("should return a 200 status code", () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const controller = new ApplicationController();
      controller.handleGetRoot({}, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "BCR API is up and running!",
      });
    });
  });

  describe("handleNotFound", () => {
    it("should return a 404 status code", () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const err = new NotFoundError();
      const controller = new ApplicationController();

      controller.handleNotFound({}, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: err.name,
          message: err.message,
          details: err.details,
        },
      });
    });
  });

  describe("handleError", () => {
    it("should return a 500 status code", () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const err = new ApplicationError();

      const controller = new ApplicationController();
      controller.handleError(err, {}, mockResponse, {});

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: err.name,
          message: err.message,
          details: err.details || null,
        },
      });
    });
  });

  describe("getOffsetFromRequest", () => {
    it("should return the offset", () => {
      const mockRequest = {
        query: {
          page: 1,
          pageSize: 10,
        },
      };

      const controller = new ApplicationController();
      const offset = controller.getOffsetFromRequest(mockRequest);

      expect(offset).toBe(0);
    });
  });

  describe("buildPaginationObject", () => {
    it("should return pagination object", () => {
      const mockRequest = {
        query: {
          page: 1,
          pageSize: 10,
        },
      };
      const count = 1;

      const controller = new ApplicationController();
      const result = controller.buildPaginationObject(mockRequest, count);

      expect(result).toEqual({
        page: 1,
        pageCount: 1,
        pageSize: 10,
        count: 1,
      });
    });
  });
});
