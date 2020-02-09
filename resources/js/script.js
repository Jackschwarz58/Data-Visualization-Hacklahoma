/*eslint-env es6*/
//Sort algorithms: https://github.com/yeb9925/sorting-algorithms-javascript

var array;
var sortedArray;


function setText() {
    var input = document.getElementById("input").value;
    if(input.length == 0) {
        array = Array.from({length: 8}, () => Math.floor(Math.random() * 40));
        document.getElementById("demo").textContent = "No Input, generating array: " + array;
    } else {
        document.getElementById("demo").textContent = "Input String: " + input;
        arrayInp = input.split(',');
        array = arrayInp.map(Number);
    }
    var paragraph = document.getElementById("output-section");
    paragraph.innerHTML = "";


    if (document.getElementById('insertion-check').checked) {
        start = performance.now();
        sortedArray = insertionSort(array.slice());
        end = performance.now();
        timeLength = end - start;
        if(timeLength > 1000) {
            timeLength = timeLength / 1000;
            paragraph.innerHTML += "<b> Insertion sort </b> took " + (Math.round(timeLength * 10000) / 10000) + " seconds\n" + sortedArray + "<br>";
            document.getElementById("collapse1").innerHTML = "Insertion Sort | " + "<font size = 5>" + (Math.round(timeLength * 100) / 100) + " sec</font>";
        }
        else {
            paragraph.innerHTML += "<b> Insertion sort </b> took " + (Math.round(timeLength * 10000) / 10000) + " milliseconds\n" + sortedArray + "<br>";
            document.getElementById("collapse1").innerHTML = "Insertion Sort | " + "<font size = 5>" + (Math.round(timeLength * 100) / 100) + " ms</font>";
        }
        timeLength = 0;
    }
    else {
        document.getElementById("collapse1").innerHTML = "Insertion Sort";
    }
    if (document.getElementById('selection-check').checked) {
        start = performance.now();
        sortedArray = selectionSort(array.slice());
        end = performance.now();
        timeLength = end - start;
        if(timeLength > 1000) {
            timeLength = timeLength / 1000;
            paragraph.innerHTML += "<b> Selection sort </b> took " + (Math.round(timeLength * 10000) / 10000) + " seconds\n" + sortedArray + "<br>";
            document.getElementById("collapse2").innerHTML = "Selection Sort | " + "<font size = 5>" + (Math.round(timeLength * 100) / 100) + " sec</font>";
        }
        else {
            paragraph.innerHTML += "<b> Selection sort </b> took " + (Math.round(timeLength * 10000) / 10000) + " milliseconds\n" + sortedArray + "<br>";
            document.getElementById("collapse2").innerHTML = "Selection Sort | " + "<font size = 5>" + (Math.round(timeLength * 100) / 100) + " ms</font>";
        }
        timeLength = 0;
    }
    else {
        document.getElementById("collapse2").innerHTML = "Selection Sort";
    }
    if (document.getElementById('merge-check').checked) { 
        var start = performance.now();
        console.log("Merge Start: " + start);
        sortedArray = mergeSort(array.slice());
        var end = performance.now();
        console.log("Merge End: " + start);
        timeLength = end - start;
        if(timeLength > 1000) {
            timeLength = timeLength / 1000;
            paragraph.innerHTML += "<b> Merge sort </b> took " + (Math.round(timeLength * 10000) / 10000) + " seconds\n" + sortedArray + "<br>";
            document.getElementById("collapse3").innerHTML = "Merge Sort | " + "<font size = 5>" + (Math.round(timeLength * 100) / 100) + " sec</font>";
        }
        else {
            paragraph.innerHTML += "<b> Merge sort </b> took " + (Math.round(timeLength * 10000) / 10000) + " milliseconds\n" + sortedArray + "<br>";
            document.getElementById("collapse3").innerHTML = "Merge Sort | " + "<font size = 5>" + (Math.round(timeLength * 100) / 100) + " ms</font>";
        }
        timeLength = 0;
    }
    else {
        document.getElementById("collapse3").innerHTML = "Merge Sort";
    }
    if (document.getElementById('quick-check').checked) { 
        start = performance.now();
        sortedArray = qSort(array.slice(),0,array.length - 1);
        end = performance.now();
        timeLength = end - start;
        if(timeLength > 1000) {
            timeLength = timeLength / 1000;
            paragraph.innerHTML += "<b> Quick sort </b> took " + (Math.round(timeLength * 10000) / 10000) + " seconds\n" + sortedArray + "<br>";
            document.getElementById("collapse4").innerHTML = "Quick Sort | " + "<font size = 5>" + (Math.round(timeLength * 100) / 100) + " sec</font>";
        }
        else {
            paragraph.innerHTML += "<b> Quick sort </b> took " + (Math.round(timeLength * 10000) / 10000) + " milliseconds\n" + sortedArray + "<br>";
            document.getElementById("collapse4").innerHTML = "Quick Sort | " + "<font size = 5>" + (Math.round(timeLength * 100) / 100) + " ms</font>";
        }
        timeLength = 0;
    }
    else {
        document.getElementById("collapse4").innerHTML = "Quick Sort";
    }
    if (document.getElementById('bubble-check').checked) { 
        start = performance.now();
        console.log("Bub Start: " + start);
        bubArray = bubbleSort(array.slice());
        end = performance.now();
        console.log("Bub End: " + start);
        timeLength = end - start;
        if(timeLength > 1000) {
            timeLength = timeLength / 1000;
            paragraph.innerHTML += "<b> Bubble sort </b> took " + (Math.round(timeLength * 10000) / 10000) + " seconds\n" + bubArray + "<br>";
            document.getElementById("collapse5").innerHTML = "Bubble Sort | " + "<font size = 5>" + (Math.round(timeLength * 100) / 100) + " sec</font>";
        }
        else {
            paragraph.innerHTML += "<b> Bubble sort </b> took " + (Math.round(timeLength * 10000) / 10000) + " milliseconds\n" + bubArray + "<br>";
            document.getElementById("collapse5").innerHTML = "Bubble Sort | " + "<font size = 5>" + (Math.round(timeLength * 100) / 100) + " ms</font>";
        }
        timeLength = 0;
    }
    else {
        document.getElementById("collapse5").innerHTML = "Bubble Sort";
    }
}

function qSwap(arr,l,r) {
    var temp = arr[l];
    arr[l] = arr[r];
    arr[r] = temp;
}

function partition(arr, left, right) {
    var pivot = arr[Math.floor((right + left) / 2)]; //middle element
    var i = left; //left pointer
    var j = right; //right pointer
    while (i <= j) {
        while (arr[i] < pivot) {
            i++;
        }
        while (arr[j] > pivot) {
            j--;
        }
        if (i <= j) {
            qSwap(arr, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

function qSort(arr,l,r) {
    //console.log("QSort -> " + arr);
    var index;
    var uarray = arr;
    document.getElementById("quick-content").innerHTML += uarray + "<br>";

    if(uarray.length > 1) {
        index = partition(uarray,l,r);

        if(l < index - 1) {
            qSort(uarray,l,index - 1);
        }
        if(index < r) {
            qSort(uarray,index,r);
        }
    }
    return uarray;
}

function insertionSort (items) {
    for (var i = 0; i < items.length; i++) {
        let value = items[i]
        // store the current item value so it can be placed right
        for (var j = i - 1; j > -1 && items[j] > value; j--) {
            // loop through the items in the sorted array (the items from the current to the beginning)
            // copy each item to the next one
            items[j + 1] = items[j]
            //document.getElementById("work-section").innerHTML += items + "<br>";
        }
        // the last item we've reached should now hold the value of the currently sorted item
        items[j + 1] = value;
        document.getElementById("insertion-content").innerHTML += items + "<br>";
    }

    return items;
}

function selectionSort (arr) {
    //console.log("Selection -> " + arr);
    uarray = arr;
    if (uarray.length <= 1) {
        return uarray;
    }

    for (let i = 0; i < uarray.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < uarray.length; j++) {
            if (uarray[j] < uarray[minIndex]) {
                minIndex = j;
            }
        }
        // Swap the current element with the smaller element
        [uarray[i], uarray[minIndex]] = [uarray[minIndex], uarray[i]]; // ES6 Swap
        document.getElementById("selection-content").innerHTML += uarray + "<br>";
    }

    return uarray;
}

function bubbleSort (items) {
    document.getElementById("bubble-content").innerHTML += items + "<br>";
    var length = items.length;
    //Number of passes
    for (var i = 0; i < length; i++) { 
        //Notice that j < (length - i)
        for (var j = 0; j < (length - i - 1); j++) { 
            //Compare the adjacent positions
            if(items[j] > items[j+1]) {
                //Swap the numbers
                var tmp = items[j];  //Temporary variable to hold the current number
                items[j] = items[j+1]; //Replace current number with adjacent number
                items[j+1] = tmp; //Replace adjacent number with current number
            }
            document.getElementById("bubble-content").innerHTML += items + "<br>";
        }        
    }
    return items;
}


function mergeSort(arr) {
    //console.log("Merge -> " + arr);
    uarray = arr;
    document.getElementById("merge-content").innerHTML += uarray + "<br>";
    // No need to sort the array if the array only has one element or empty
    if (uarray.length <= 1) {
        return uarray;
    }
    // In order to divide the array in half, we need to figure out the middle
    const middle = Math.floor(uarray.length / 2);

    // This is where we will be dividing the array into left and right
    const left = uarray.slice(0, middle);
    const right = uarray.slice(middle);

    // Using recursion to combine the left and right
    return merge(
        mergeSort(left), mergeSort(right)
    );

}

// Merge the two arrays: left and right
function merge (left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;

    // We will concatenate values into the resultArray in order
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex]);
            leftIndex++; // move left array cursor
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++; // move right array cursor
        }
    }

    // We need to concat to the resultArray because there will be one element left over after the while loop
    return resultArray
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
}