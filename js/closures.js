function buildSum(a){
  return function(b){
    return a + b
  }
}

const addFive = buildSum(5)
console.log(5); // 10

const buildSum = a => b => a + b