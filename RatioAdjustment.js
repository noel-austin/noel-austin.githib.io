function adjustRatio(ratios, index, value) {
    if (ratios[index] != 1) {
        const total = 1.0; // Total sum of percentages (100% or 1.0)

        // Add to the specified index
        ratios[index] += value;

        // Adjust if the percentage exceeds the total
        if (ratios[index] > total) {
            ratios[index] = total;
        }

        // Calculate the excess amount
        let excess = ratios.reduce((a, b) => a + b) - total;

        // Evenly deduct from other ratios
        for (let i = 0; i < ratios.length; i++) {
            if (i !== index && ratios[i] > 0) {
                let deduction = excess / ratios.filter((val, idx) => idx !== index && val > 0).length;
                ratios[i] = Math.max(ratios[i] - deduction, 0);
            }
        }

        // Final rounding adjustment
        let currentTotal = ratios.reduce((a, b) => a + b, 0);
        if (currentTotal !== total) {
            ratios[index] += total - currentTotal;
        }
    }

    return ratios;
}

function adjustSize(size, value) {
    return size - (size * value);

}

function adjustArrayValues(arr, x, y) {
    // Calculate valueToAdd and directly adjust the value at index y
    let valueToAdd = (1 - arr[y]) * x;
    arr[y] += valueToAdd;

    // Calculate the total value that needs to be subtracted from other elements
    let totalSubtractionNeeded = valueToAdd;
    let distributedSubtraction = totalSubtractionNeeded / (arr.length - 1);

    // Subtract the distributed value from other elements, avoiding negative results
    for (let i = 0; i < arr.length; i++) {
        if (i !== y) {
            let maxSubtractable = arr[i] - distributedSubtraction > 0 ? distributedSubtraction : arr[i];
            arr[i] -= maxSubtractable;
            totalSubtractionNeeded -= maxSubtractable;
        }
    }

    // If there's still value to subtract after the first pass, distribute the remainder
    if (totalSubtractionNeeded > 0) {
        for (let i = 0; i < arr.length && totalSubtractionNeeded > 0; i++) {
            if (i !== y) {
                let maxSubtractable = arr[i] > totalSubtractionNeeded ? totalSubtractionNeeded : arr[i];
                arr[i] -= maxSubtractable;
                totalSubtractionNeeded -= maxSubtractable;
            }
        }
    }

    // Round all values to 2 decimal places
    arr = arr.map(value => Math.round(value * 100) / 100);

    // Adjust the array to ensure the sum equals 1
    let sum = arr.reduce((acc, value) => acc + value, 0);
    let error = 1 - sum;
    arr[y] += error;

    // Ensure no negative values and re-adjust to ensure the sum equals 1
    arr = arr.map(value => value < 0 ? 0 : value);
    sum = arr.reduce((acc, value) => acc + value, 0);
    error = 1 - sum;
    if (error !== 0) {
        // Find an index to adjust that's not y and has a positive value
        for (let i = 0; i < arr.length; i++) {
            if (i !== y && arr[i] > 0) {
                arr[i] += error;
                break;
            }
        }
    }

    // Final rounding after adjustment
    arr = arr.map(value => Math.round(value * 100) / 100);

    return arr;
}





