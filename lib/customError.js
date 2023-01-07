/* eslint-disable max-classes-per-file */
const { errorMessage } = require('./errorMessage');

class HttpException extends Error {
  constructor(massage = '系统出错', errorCode = '999B001', statusCode = 500) {
    super();
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.massage = massage;
  }
}

class ParameterException extends HttpException {
  constructor(errorCode = '999B002') {
    super();
    this.statusCode = 400;
    this.massage = errorMessage.get(errorCode) || '参数错误';
    this.errorCode = errorCode;
  }
}

class AuthFailed extends HttpException {
  constructor(errorCode = '999B003') {
    super();
    this.statusCode = 401;
    this.massage = errorMessage.get(errorCode) || '授权失败';
    this.errorCode = errorCode;
  }
}

class NotFound extends HttpException {
  constructor(errorCode = '999B004') {
    super();
    this.statusCode = 404;
    this.massage = errorMessage.get(errorCode) || '请求资源找不到';
    this.errorCode = errorCode;
  }
}

class Forbidden extends HttpException {
  constructor(errorCode = '999B005') {
    super();
    this.statusCode = 403;
    this.massage = errorMessage.get(errorCode) || '禁止访问';
    this.errorCode = errorCode;
  }
}

class Existing extends HttpException {
  constructor(errorCode = '999B006') {
    super();
    this.statusCode = 412;
    this.massage = errorMessage.get(errorCode) || '资源已存在';
    this.errorCode = errorCode;
  }
}

const CustomError = {
  HttpException,
  ParameterException,
  AuthFailed,
  NotFound,
  Forbidden,
  Existing,
};

module.exports = { CustomError };
