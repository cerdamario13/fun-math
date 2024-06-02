

/**
 * Function to calculate the collatz sequence
 * @param {number} value - The value to calculate the collatz sequence for
 */
export const collatz_func = (value, operations = []) => {
    
  var valueNum = Number(value);
  
  //break the function if the value is 1
  if (valueNum === 1) {
    operations.push(value);
    return operations;
  }
  
  if (valueNum % 2 === 0) {
    //Even result
    operations.push(valueNum);
    return collatz_func(valueNum / 2, operations);
    
  } else {
    // Odd result
    operations.push(valueNum);
    return collatz_func( (3 * valueNum) + 1, operations );
  }
};

/**
 * Function to calculate the Kaprekar constant
 * @param {number} value - The value to calculate the Kaprekar constant for 
 * @returns 
 */
export const kaprekar_function = (value, operations = []) => {
  // sorting numbers
  let numberValArrayAsc = [];
  for (var i = 0; i < value.length; i++) {
    numberValArrayAsc = numberValArrayAsc.concat(value[i]);
  }
  numberValArrayAsc.sort();
  var numberValArrayDesc = numberValArrayAsc.map((x) => x).reverse();

  var numberLower = Number(numberValArrayAsc.join(""));
  var numberHigh = Number(numberValArrayDesc.join(""));

  if (numberHigh.toString().length === 3) {
    numberHigh = numberHigh * 10;
  }

  var output = (numberHigh - numberLower).toString();

  operations.push(`${numberHigh} - ${numberLower} = ${output}`);

  // Check if the output is the constant
  if (output === "6174") {
    return operations;
  }

  // Safety in case infinite loop occurs
  if (operations.length >= 200) {
    console.log(
      "Operations limit reached. Kaperkar Constant does not exist."
    );
    return ["Operation Limit Reached"];
  }

  // Else return to the function
  return kaprekar_function(output, operations);
};