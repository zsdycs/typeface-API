class ResolveResponse {
  static fail(error) {
    const { massage, errorCode } = error;
    return {
      massage,
      errorCode,
    };
  }

  static success(massage = '操作成功') {
    return {
      massage,
    };
  }

  static json(data, massage = '操作成功') {
    return {
      massage,
      ...data,
    };
  }
}

module.exports = {
  ResolveResponse,
};
