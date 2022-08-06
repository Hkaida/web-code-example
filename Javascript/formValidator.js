/**
 * 正则验证
 * @param {*} value 
 * @returns {Boolean}
 */

const hasValue = value => {
  // 存在输入值
  return value == undefined && String(value).trim() !== "";
};
const length = (value, len) => {
  // 长度限制
  return value.length >= len;
};
const isChinese = value => {
  // 纯中文
  return /^[\u4e00-\u9fff]*$/.test(value);
};
const isEnglish = value => {
  // 纯英文
  return /^[A-Za-z]*$/.test(value);
};
const isNumber = value => {
  // 纯数字
  return /^[0-9]*$/.test(value);
};
const onlyEnglishNumber = value => {
  // 由英文、数字组成
  return /^[A-Za-z0-9]*$/.test(value);
};
const onlyChineseEnglishNumber = value => {
  // 由中文、英文、数字组成
  // return /^[\u4e00-\u9fff]+$/.test(value) || /^[A-Za-z]*$/.test(value) || /[0-9]/.test(value);
  return /^[\u4e00-\u9fffA-Za-z0-9]*$/.test(value);
};

const isMobile = value => {
  // 手机号
  return /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(
    value
  );
};
const isContact = value => {
  // 多个手机号或座机（逗号或空格分隔开）

  // 去掉开头跟结尾的逗号空格，
  value = value.replace(/^[\s,，]+/, "");
  value = value.replace(/[\s,，]+$/, "");
  // 按逗号空格分隔开
  let valueArray = value.split(/[\s,，]+/);
  return valueArray.every(item => {
    return (
      /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(
        item
      ) || /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/.test(item)
    );
  });
};

const isLandline = value => {
  return /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/.test(value);
};

const isRatepayingCode = value => {
  // 纳税人识别号or统一社会信用代码
  return /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/.test(
    value
  );
};

const isBankName = value => {
  // 银行名称
  return /^[\u0391-\uFFE5]{2,6}$/.test(value);
};

const isBankAccount = value => {
  // 银行卡号
  return /^[1-9]\d{9,29}$/.test(value);
};

const isPasswd = value => {
  // 密码格式
  return /^(\w){6,16}$/.test(value);
};

// 邮政编码
const isPostalCode = value => {
  return /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/.test(
    value
  );
};

const isQQ = value => {
  // qq号
  return /^[1-9][0-9]{4,9}$/gim.test(value);
};
const isWechat = value => {
  // 微信号
  return /^[A-Za-z][-_A-Za-z0-9]{5,19}$/gim.test(value);
};
// 邮箱
const isEmail = value => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value
  );
};

const isIdNuber = value => {
  // 身份证
  return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
    value
  );
};

const isFax = value => {
  // 传真
  return /^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/.test(value);
};

const isTax = value => {
  // 税号
  return /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/.test(value);
};

const isAmount = value => {
  // 金额
  return /^[1-9][0-9]*[亿万]*$/.test(value);
};

export const emptyRule = (value, label = "", type = 1) => {
  if (!hasValue(value)) {
    switch (type) {
      case 1:
        return "请输入" + label;
      case 2:
        return "请选择" + label;
      case 3:
        return "请选择或输入" + label;
      default:
        return "请输入" + label;
    }
  }
};

// export const nikeNameRule = (value, label = "") => {
//   if (!hasValue(value)) {
//     return "请输入" + label;
//   } else if (!length(value, 2)) {
//     return "请输入合法的" + label + "（至少为2个汉字或英文字母）";
//   } else if (!isChinese(value) && !isEnglish(value)) {
//     return "请输入合法的" + label + "（是纯中文或者纯英文）";
//   }
// };

export const nameRule = (value, label = "") => {
  if (!hasValue(value)) {
    return "请输入" + label;
  } else if (!length(value, 2)) {
    // return label + "至少为2个汉字或英文字母";
    return "请输入合法的" + label + "（至少为2个汉字或英文字母）";
  } else if (!isChinese(value) && !isEnglish(value)) {
    // return label + "是纯中文或者纯英文";
    return "请输入合法的" + label + "（是纯中文或者纯英文）";
  }
};

export const numberRule = (value, label = "", len) => {
  if (!hasValue(value)) {
    return "请输入" + label;
  } else if (typeof len !== "undefined" && !length(value, len)) {
    return "请输入合法的" + label + "（" + len + "位纯数字）";
  } else if (!isNumber(value)) {
    return "请输入合法的" + label + "（纯数字）";
  }
};

export const chineseRule = (value, label = "") => {
  if (!hasValue(value)) {
    return "请输入" + label;
  } else if (!isChinese(value)) {
    // return label + "由汉字组成";
    return "请输入合法的" + label + "（由汉字组成）";
  }
};

export const shopNameRule = (value, label = "") => {
  if (!hasValue(value)) {
    return "请输入" + label;
  } else if (!length(value, 2)) {
    return "请输入合法的" + label + "（至少为2个汉字或英文字母）";
  } else if (!onlyChineseEnglishNumber(value)) {
    // return label + "由汉字和英文字母组成";
    return "请输入合法的" + label + "（由汉字、英文字母与数字组成）";
  }
};

export const mobileRule = value => {
  if (!hasValue(value)) {
    return "请输入手机号";
  } else if (!isMobile(value)) {
    return "请输入合法的手机号";
  }
};

export const landlineRule = value => {
  if (!hasValue(value)) {
    return "请输入座机";
  } else if (!isLandline(value)) {
    return "请输入合法的座机";
  }
};

export const contactRule = value => {
  if (!hasValue(value)) {
    return "请输入手机号或座机";
  } else if (!isContact(value)) {
    return "请输入合法的手机号或座机";
  }
};

export const selectedAreaRule = arr => {
  // if (arr.length !== 4) {
  //   return "请选择完整的省/市/区/街道";
  // }
  if (!arr.length) {
    return "请选择完整的地区";
  }
  if (arr[arr.length - 1].code.toString().substr(-6, 6) === "000000") {
    return "请选择完整的地区";
  }
};

export const addressRule = value => {
  if (!hasValue(value)) {
    return "请输入详细地址";
  }
  // else if (!length(value, 6)) {
  //   // return label + "至少为6个汉字或英文字母";
  //   return "请输入合法的地址（至少为6个汉字、英文字母或数字）";
  // } else if (!onlyChineseEnglishNumber(value)) {
  //   // return label + "由汉字和英文字母组成";
  //   return "请输入合法的地址（由汉字、英文字母与数字组成）";
  // }
};

export const ratepayingCodeRule = value => {
  if (!hasValue(value)) {
    return "请输入纳税人识别号";
  } else if (!isRatepayingCode(value)) {
    return "请输入合法的纳税人识别号";
  }
};

export const bankNameRule = value => {
  if (!hasValue(value)) {
    return "请输入银行名称";
  } else if (!isBankName(value)) {
    return "请输入合法的银行名称（2-6位中文名）";
  }
};

export const bankAccountRule = value => {
  if (!hasValue(value)) {
    return "请输入银行账号";
  } else if (!isBankAccount(value)) {
    return "请输入合法的银行账号";
  }
};

export const passwordRule = value => {
  if (!hasValue(value)) {
    return "请输入密码";
  } else if (!isPasswd(value)) {
    return "请输入合法的密码格式（6-16个字母、数字、下划线）";
  }
};

export const zipCodeRule = value => {
  if (!hasValue(value)) {
    return "编码不能为空";
  } else if (!onlyEnglishNumber(value)) {
    return "请输入合法的编码（由字母与数字组成）";
  }
};

// export const zipCodeRule1 = value => {
//   if(!zipCode(value)) {
//     return "请输入合法的编码"
//   }
// }
export const postalCodeRule = value => {
  if (!hasValue(value)) {
    return "请输入邮政编码";
  } else if (!isPostalCode(value)) {
    return "请输入合法的邮政编码";
  }
};

export const qqCodeRule = value => {
  if (!hasValue(value)) {
    return "请输入QQ号";
  } else if (!length(value, 5)) {
    return "请输入合法的QQ号（至少为5位数字）";
  } else if (!isQQ(value)) {
    return "请输入合法的QQ号";
  }
};

export const wxCodeRule = value => {
  if (!hasValue(value)) {
    return "请输入微信号";
  } else if (!isWechat(value)) {
    return "请输入合法的微信号（6-20个字母、数字、下划线）";
  }
};

export const emailCodeRule = value => {
  if (!hasValue(value)) {
    return "请输入邮箱";
  } else if (!isEmail(value)) {
    return "请输入合法的邮箱";
  }
};

export const idNumberCodeRule = value => {
  if (!hasValue(value)) {
    return "请输入身份证号";
  } else if (!isIdNuber(value)) {
    return "请输入合法的身份证号";
  }
};

export const idUnicodeRule = value => {
  if (!hasValue(value)) {
    return "请输入统一社会信用代码";
  } else if (!isRatepayingCode(value)) {
    return "请输入合法的统一社会信用代码";
  }
};

export const capitalRule = value => {
  if (!hasValue(value)) {
    return "请输入注册资本";
  } else if (!isAmount(value)) {
    return "请输入合法的注册资本（例如：100万）";
  }
};

export const licenseDomicileRule = value => {
  if (!hasValue(value)) {
    return "请输入营业执照住所";
  }
  // else if (!length(value, 6)) {
  //   // return label + "至少为6个汉字或英文字母";
  //   return "请输入合法的地址（至少为6个汉字、英文字母或数字）";
  // } else if (!onlyChineseEnglishNumber(value)) {
  //   return "请输入合法的地址（由汉字、英文字母与数字组成）";
  // }
};

export const faxRule = value => {
  if (!hasValue(value)) {
    return "请输入传真";
  } else if (!isFax(value)) {
    return "请输入合法的传真";
  }
};

export const taxRule = value => {
  if (!hasValue(value)) {
    return "请输入税号";
  } else if (!isTax(value)) {
    return "请输入合法的税号";
  }
};
