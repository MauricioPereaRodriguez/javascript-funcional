// Sin currying
function sumThreeNumbers(a, b, c){
  return a + b + c
}

// Con Currying
function sumThreeNumbersCurrying(a){
  return function(b){
    return function(c){
      return a + b + c
    }
  }
}

// Arrow functions
const sumThreeNumbersAF = a => b => c => a + b + c