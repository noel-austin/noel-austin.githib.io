

function adjustSize(size, value) {
    return size - (size * value);

}

function adjustArrayValues(arr, x, y) {
    // arr = the array, x = the percentage change given from the slider, 
    // and y = the target bin
    // calculate valueToAdd and directly adjust the value at index y
    let valueToAdd = (1 - arr[y]) * x;
    arr[y] += valueToAdd;
    // calculate the total value that needs to be subtracted from other values
    let totalSubtractionNeeded = valueToAdd;
    let distributedSubtraction = totalSubtractionNeeded / (arr.length - 1);

    // subtract the distributed value from other values until the hit zero
    for (let i = 0; i < arr.length; i++) {
        if (i !== y) {
            let maxSubtractable = arr[i] - distributedSubtraction > 0 ? distributedSubtraction : arr[i];
            arr[i] -= maxSubtractable;
            totalSubtractionNeeded -= maxSubtractable;
        }
    }

    // if there's still value to subtract after the first pass, distribute the remainder
    if (totalSubtractionNeeded > 0) {
        for (let i = 0; i < arr.length && totalSubtractionNeeded > 0; i++) {
            if (i !== y) {
                let maxSubtractable = arr[i] > totalSubtractionNeeded ? totalSubtractionNeeded : arr[i];
                arr[i] -= maxSubtractable;
                totalSubtractionNeeded -= maxSubtractable;
            }
        }
    }

    // round all values
    arr = arr.map(value => Math.round(value * 100) / 100);

    // adjust the array to ensure the sum equals 1
    let sum = arr.reduce((acc, value) => acc + value, 0);
    let error = 1 - sum;
    arr[y] += error;

    // Ensure no negative values and re-adjust to ensure the sum equals 1
    arr = arr.map(value => value < 0 ? 0 : value); //replaces negative values with a zero
    sum = arr.reduce((acc, value) => acc + value, 0); //iterates throuh array adding up the values
    error = 1 - sum;
    if (error !== 0) {
        // find an index to adjust that's not y and has a positive value
        for (let i = 0; i < arr.length; i++) {
            if (i !== y && arr[i] > 0) {
                arr[i] += error;
                break;
            }
        }
    }

    // final rounding after adjustment
    arr = arr.map(value => Math.round(value * 100) / 100);

    return arr;
}





