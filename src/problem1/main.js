/*
 Provide 3 unique implementations of the following function in JavaScript.
 Input: `n` - any integer
 Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
 Output: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
*/

//All functions will check if n is negative then sum to n accordingly

// @param n: any integer
// @return summation of n
var sum_to_n_a = function (n) {
  let total = 0;
  if (n > 0) for (let i = 0; i <= n; i++) total += i;
  else for (let i = 0; i >= n; i--) total += i;
  return total;
};

// @param n: any integer
// @return summation of n
var sum_to_n_b = function (n) {
  if (n >= 0) return (n * (n + 1)) / 2;
  else return -((Math.abs(n) * (Math.abs(n) + 1)) / 2);
};

// @param n: any integer
// @return summation of n
var sum_to_n_c = function (n) {
  if (n === 0) return 0;
  if (n > 0) return n + sum_to_n_c(n - 1);
  else return n + sum_to_n_c(n + 1);
};

console.log("Sum to n A:", sum_to_n_a(5));
console.log("Sum to n B:", sum_to_n_b(5));
console.log("Sum to n C:", sum_to_n_c(5));

console.log("Sum to n A - negative:", sum_to_n_a(-5));
console.log("Sum to n B - negative:", sum_to_n_b(-5));
console.log("Sum to n C - negative:", sum_to_n_c(-5));
