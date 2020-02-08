/*eslint-env es6*/

var array;
var sortedArray;

function setText()
{
    var input = document.getElementById("input").value;
    document.getElementById("demo").textContent = input;
    array = input.split(',');
    
    
    var start = performance.now();
    sortedArray = mergeSort(array);
    var end = performance.now();
    
    timeLength = end - start;
    document.getElementById("demo").textContent = "Merge sort took " + (Math.round(timeLength * 100) / 100) + " seconds\n" + sortedArray[0];
}

function mergeSort(uarray)
{
    if (uarray.length < 2) {
      return uarray;
    }

    var mid = Math.floor(uarray.length / 2);
    var subLeft = mergeSort(uarray.slice(0, mid));
    var subRight = mergeSort(uarray.slice(mid));

    return merge(subLeft, subRight);
}

function merge (s, t) {
    var result = [];
    while (s.length > 0 && t.length > 0)
        result.push(s[0] < t[0]? s.shift() : t.shift());
    
    return result.concat(s.length? s : t);
}