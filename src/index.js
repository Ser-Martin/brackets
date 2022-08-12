module.exports = function check(str, bracketsConfig) {
  const mirror = (ch) => {
    for (let i = 0; i < bracketsConfig.length; i++) {
      if (bracketsConfig[i].includes(ch)) return bracketsConfig[i][0];
    }
  };

  const stack = [];

  const isSame = (ch) => {
    for (let i = 0; i < bracketsConfig.length; i++) {
      if (
        ch === bracketsConfig[i][1] &&
        ch === bracketsConfig[i][0] &&
        stack.at(-1) !== ch
      ) {
        return true;
      }
    }
    return false;
  };

  let opens = [];
  for (let i = 0; i < bracketsConfig.length; i++) {
    if (bracketsConfig[i][0] !== bracketsConfig[i][1])
      opens.push(bracketsConfig[i][0]);
  }

  for (let i = 0; i < str.length; i++) {
    let current = str[i];

    if (isSame(current) || opens.includes(current)) {
      stack.push(current);
    } else {
      let topElement = stack.at(-1);

      if (topElement === mirror(current)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};
