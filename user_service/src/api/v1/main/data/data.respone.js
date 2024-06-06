class DataResponse {
  constructor(code = null, message = "", data = {}) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static Clone(obj) {
    const dataResponse = new DataResponse();
    dataResponse.code = obj.code;
    dataResponse.message = obj.message;
    dataResponse.data = obj.data;
    return dataResponse;
  }

  static Oke(data, message = "oke") {
    return new DataResponse(200, message, data);
  }

  static Created(data, message = "created") {
    return new DataResponse(201, message, data);
  }

  static NoContent(message = "created") {
    return new DataResponse(204, message, null);
  }

  static BadRequest(message) {
    return new DataResponse(400, message, null);
  }

  static Unauthorized(message) {
    return new DataResponse(401, message, null);
  }

  static Forbidden(message = "forbidden") {
    return new DataResponse(403, message, null);
  }

  static Notfound(message = "not found") {
    return new DataResponse(404, message, null);
  }

  static ServerError(message = "server error", data) {
    return new DataResponse(500, message, data);
  }
}

module.exports = DataResponse;
