var operationsArray = []
var currentNum = ''
var numToDisplay = ''

$(document).ready(function() {
  $('.calc-num').click(function() {
    var num = $(this).text()
    addToCurrentNumber(num)
    displayNumber()
  })

  $('.calc-op').click(function() {
    var op = $(this).text()
    handleOperation(op)
    displayNumber()
  })

  $('.calc-clear').click(function() {
    var op = $(this).text()
    handleClear(op)
    displayNumber()
  })

  $('button').click(function() {
    $(this).blur()
  })
})

function addToCurrentNumber(num) {
  currentNum += num
  numToDisplay = currentNum
}

function displayNumber() {
  $('#display').text(numToDisplay)
}

function handleClear(op) {
  if (op === 'AC') {
    operationsArray = []
  }
  currentNum = ''
  numToDisplay = ''
}

// Design decisions
// Don't allow an operation as first in array or consecutive operations
// Don't assume any number if one hasn't been punched in yet
function handleOperation(op) {
  if (currentNum.length > 0) {
    operationsArray.push(currentNum)
    currentNum = ''
  }

  if (op !== '=' && operationsArray.length % 2 === 1) {
    operationsArray.push(op)
  }

  if (op === '=' && operationsArray.length > 0) {
    var ops = ['+', '-', 'x', '/']
    if (ops.indexOf(operationsArray[operationsArray.length - 1]) > -1) {
      operationsArray.pop()
    }

    var result = Number(operationsArray[0])
    for (var i = 2; i < operationsArray.length; i += 2) {
      var num = operationsArray[i]
      var operation = operationsArray[i - 1]
      switch (operation) {
        case '+':
          result += Number(num)
          break
        case '-':
          result -= Number(num)
          break
        case 'x':
          result *= Number(num)
          break
        case '/':
          result /= Number(num)
          break
      }
    }

    numToDisplay = result
    operationsArray = [result]
  }
}