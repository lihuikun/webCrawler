function curry (fn) {
  return function curried (...args) {
    // 检查已经提供的参数数量是否足以调用fn
    console.log("🚀 ~ curried ~ fn.length:", fn.length)
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      // 如果不够参数则返回一个新函数，等待剩余参数
      return function (...moreArgs) {
        // 合并参数列表并递归curried函数
        return curried.apply(this, args.concat(moreArgs));
      }
    }
  };
}

// 使用说明：
function sum (a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3)); // 输出 6
console.log(curriedSum(1, 2)(3)); // 输出 6
console.log(curriedSum(1, 2, 3)); // 输出 6