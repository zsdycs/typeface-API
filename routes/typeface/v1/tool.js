const { CustomError } = require('../../../lib/customError');
const { TypefaceName } = require('../../../lib/constants');

const checkTypefaceParameter = ({ text, typeface }) => {
  if (!text) {
    throw new CustomError.ParameterException('001P001');
  } else if (!TypefaceName[typeface]) {
    throw new CustomError.ParameterException('001P002');
  }
};

module.exports = {
  checkTypefaceParameter,
};
