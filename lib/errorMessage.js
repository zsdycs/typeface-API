const errorMessage = new Map();

/**
 * errorCode 规则说明
 *
 * 构成定义 : <功能域><错误类型><错误编号>
 *
 * 功能域 : 功能模块，三位数字
 * 001 : 字体
 * 999 : 系统
 *
 * 错误类型 : 一位大写字母
 * W : 微信 API 相关
 * P : 参数错误
 * B : 业务错误
 *
 * 错误编号 : 从 001 自增，三位数字
 * 001
 * 002
 * ……
 * 999
 */
errorMessage.set('001P001', 'text不可为空');
errorMessage.set('001P002', 'typeface参数有误');
// customError 默认错误消息
errorMessage.set('999B001', '系统出错');
errorMessage.set('999B002', '参数错误');
errorMessage.set('999B003', '授权失败');
errorMessage.set('999B004', '请求资源找不到');
errorMessage.set('999B005', '禁止访问');
errorMessage.set('999B006', '资源已存在');

module.exports.errorMessage = errorMessage;
