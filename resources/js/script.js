/*eslint-env es6*/
//Sort algorithms: https://github.com/yeb9925/sorting-algorithms-javascript

var array;
var sortedArray;
var sortPaneHTML;
var sortSidebarPaneHTML;
var treePaneHTML;
var treeSidebarPaneHTML;
var arrayPaneHTML;
var arraySidebarPaneHTML;
var buttonclicked;
var arrayToRun = "";
var svg ="";

function treeButton()
{    
    if(buttonclicked == "tree")
        return;

    if(buttonclicked == "array") {
        arrayPaneHTML = document.getElementById("main-content").innerHTML;
        arraySidebarPaneHTML = document.getElementById("sidebar").innerHTML;
    }
    if(buttonclicked == "sort") {
        sortPaneHTML = document.getElementById("main-content").innerHTML;
        sortSidebarPaneHTML = document.getElementById("sidebar").innerHTML;
    }

    buttonclicked = "tree";
    document.getElementById("main-content").innerHTML = "<div id='tree-headline'>Please enter input and click run below to create an AVL Tree...</div>";
    document.getElementById("sidebar").innerHTML = "";

    document.getElementById("sort-button").style.opacity = "100%";
    document.getElementById("tree-button").style.opacity = "50%";
    document.getElementById("array-button").style.opacity = "100%";
    document.getElementById("run-button").value = "Run";


    var width = 800;
    var height = 500;
    svg = d3.select("#main-content")
        .append("svg").attr("width", width)
        .attr("height", height);

    document.getElementById("run-button").onclick = doArray;
}

function sortButton() {
    if(buttonclicked == "sort")
        return;
    if(buttonclicked == "array") {
        arrayPaneHTML = document.getElementById("main-content").innerHTML;
        arraySidebarPaneHTML = document.getElementById("sidebar").innerHTML;
    }
    if(buttonclicked == "tree") {
        treePaneHTML = document.getElementById("main-content").innerHTML;
        treeSidebarPaneHTML = document.getElementById("sidebar").innerHTML;
    }

    buttonclicked = "sort";
    treePaneHTML = document.getElementById("main-content").innerHTML;
    document.getElementById("main-content").innerHTML = sortPaneHTML;
    document.getElementById("sidebar").innerHTML = sortSidebarPaneHTML;
    document.getElementById("sort-button").style.opacity = "50%";
    document.getElementById("tree-button").style.opacity = "100%";
    document.getElementById("array-button").style.opacity = "100%";
    document.getElementById("run-button").value = "Run";

    document.getElementById("run-button").onclick = setText;
}

function arrayButton() {
    var input = document.getElementById("input").value;
    if(input.length == 0) {
        array = Array.from({length: 8}, () => Math.floor(Math.random() * 40));
        document.getElementById("demo").innerHTML = "<id = 'input-val'>" + array;
    } else {
        document.getElementById("demo").textContent = "Input String: " + input;
        arrayInp = input.split(',');
        array = arrayInp.map(Number);
    }

    if(buttonclicked == "array")
        return;
    if(buttonclicked == "sort") {
        sortPaneHTML = document.getElementById("main-content").innerHTML;
        sortSidebarPaneHTML = document.getElementById("sidebar").innerHTML;
    }
    if(buttonclicked == "tree") {
        treePaneHTML = document.getElementById("main-content").innerHTML;
        treeSidebarPaneHTML = document.getElementById("sidebar").innerHTML;
    }

    buttonclicked = "array";
    document.getElementById("main-content").innerHTML = "<div id='tree-headline'>Please Select a Sort from the Sidebar...</div><div id='next-tree-headline'></div>";
    document.getElementById("sidebar").innerHTML = "<div class='sidebar' id='sidebar'> <div id='sidebar-options'><div id = 'sidebar-label'>Select a Sort...<br></div><div class='sidenav-item'><button class='array-button' id='insertion-run' name='insertion-run'value='1'>Insertion Sort</div><div class='sidenav-item'><button class='array-button' id='selection-run' name='selection-run' value='1'>Selection Sort</div><div class='sidenav-item'><button class='array-button' id='quick-run' name='quick-run' value='1'>Quick Sort</div><div class='sidenav-item'><button class='array-button' id='bubble-run' name='bubble-run' value='1'>Bubble Sort</div></div></div>";
    document.getElementById("run-button").value = "Step";

    //function() { clickTest(rowID); };
    document.getElementById("sort-button").style.opacity = "100%";
    document.getElementById("tree-button").style.opacity = "100%";
    document.getElementById("array-button").style.opacity = "50%";

    document.getElementById("run-button").onclick = nextStep;
    
    document.getElementById("insertion-run").onclick = function() { cinsertionSort(array); document.getElementById("next-tree-headline").innerHTML =""; document.getElementById("next-tree-headline").innerHTML += " Insertion Sort"; };

    document.getElementById("selection-run").onclick = function() { cselectionSort(array); document.getElementById("next-tree-headline").innerHTML =""; document.getElementById("next-tree-headline").innerHTML += " Selection Sort";};

    document.getElementById("quick-run").onclick = function() { cqSort(array, 0, array.length -1);document.getElementById("next-tree-headline").innerHTML =""; document.getElementById("next-tree-headline").innerHTML += " Quick Sort";};

    document.getElementById("bubble-run").onclick = function() { cbubbleSort(array);document.getElementById("next-tree-headline").innerHTML =""; document.getElementById("next-tree-headline").innerHTML += " Bubble Sort";};
}

function setText() {
    var input = document.getElementById("input").value;
    if(input.length == 0) {
        array = Array.from({length: 8}, () => Math.floor(Math.random() * 40));
        document.getElementById("demo").innerHTML = "<id = 'input-val'>" + array;
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

function doArray() {
    var tree = new AvlTree();
    var numArray = [];
    var input = document.getElementById("input").value;
    arrayInp = input.split(',');
    numArray = arrayInp.map(Number);

    console.log(arrayInp);

    if(arrayInp.length <= 1) {
        numArray = Array.from({length: 8}, () => Math.floor(Math.random() * 40));
    }

    console.log(numArray);

    var i;
    var dupes = false;
    for(i=0;i<numArray.length;i++)
    {
        if(!tree.contains(numArray[i]))
        {
            tree.insert(numArray[i]);
        }
    }
    if(dupes) {
        alert("Duplicates in array!");
    }

    //printTree(tree.root());
    index = 0;
    rootHeight = tree.root().height;
    svg.selectAll("*").remove();
    displayTree(tree.root());

}

function printTree(node) {
    if(node != null) {
        printTree(node.left);
        console.log(node.key);
        printTree(node.right);
    }
}

function displayTree(node) {
    if(node != null) {
        displayTree(node.left);
        index++;

        var nodeXLoc = index * 50 + 5;
        var nodeYLoc = Math.abs(rootHeight - node.height) * 75 + 75;
        var grup = svg.append("g");

        var sqr = grup.append("circle")
        .attr("id", function(d){ return "node"+node.key; })
        .attr("r", 30).attr("fill", "white")
        .attr("stroke", "black")
        .attr("cx", nodeXLoc).attr("cy", nodeYLoc);

        var txt = grup.append("text")
        .attr("x", nodeXLoc - 5)
        .attr("y", nodeYLoc)
        .attr("fill", "black")
        .text(node.key);
        displayTree(node.right);

        if(node.left) {
            var lnode = d3.select("#node" + node.left.key);
            var lcon = grup.append("line")
            .attr("x1", nodeXLoc).attr("y1", nodeYLoc+30)
            .attr("x2", lnode.attr("cx")).attr("y2", lnode.attr("cy")-(lnode.attr("r")))
            .attr("stroke", "black").attr("stroke-width", 1);
        }

        if(node.right) {
            var rnode = d3.select("#node" + node.right.key);

            var rcon = grup.append("line")
            .attr("x1", nodeXLoc).attr("y1", nodeYLoc+30)
            .attr("x2", rnode.attr("cx")).attr("y2", rnode.attr("cy")-(rnode.attr("r")))
            .attr("stroke", "black").attr("stroke-width", 1);
        }

    }
}



/////////////////////////////////////////////////////////////////

function transition(left, right){
    rectangles[left].transition()
        .duration(1500)
        .delay(2000)
        .attr("y", 250)
        .transition()
        .attr("x", (right * 100) + 50)
        .transition()
        .attr("y", 150)
        .each("end", function () { d3.select(this).style("stroke", "blue"); });

    numbers[left].transition()
        .duration(1500)
        .delay(2000)
        .attr("y", 276)
        .transition()
        .attr("x", (right * 100) + 73)
        .transition()
        .attr("y", 180)
        .each("end", function () { d3.select(this).style("fill", "blue"); });

    rectangles[right].transition()
        .duration(1500)
        .delay(2000)
        .attr("y", 50)
        .transition()
        .attr("x", (left * 100) + 50)
        .transition()
        .attr("y", 150)
        .each("end", function () { d3.select(this).style("stroke", "blue"); });

    numbers[right].transition()
        .duration(1500)
        .delay(2000)
        .attr("y", 76)
        .transition()
        .attr("x", (left * 100) + 73)
        .transition()
        .attr("y", 180)
        .each("end", function () { d3.select(this).style("fill", "blue"); });

    [rectangles[left], rectangles[right]] = [rectangles[right], rectangles[left]];
    [numbers[left], numbers[right]] = [numbers[right], numbers[left]];

}

function nextStep(){
    console.log(arrayMoves[step]);
    console.log(arrayMoves[step + 1]);
    transition(arrayMoves[step], arrayMoves[step + 1]);
    step = step + 2;   
    console.log(step);
}



//THIS IS THE PART OF CODE WHERE I CALL AND RUN SORT ALGORITHMS 
//THIS IS THE SELECTION SORT


function cselectionSort (arr) {
    //console.log("Selection -> " + arr);
    step = 0;
    // THIS PART OF THE CODE IS RESPOSIBLE FOR GENERATING THE BOXES FOR DISPLAY
    
    svg = d3.select("#main-content")
    .append("svg")
    .attr("width", 800)
    .attr("height", 500);

    var array = [5, 4, 3, 2, 9, 6];
    arrayMoves = new Array();
    rectangles = new Array();
    numbers = new Array();
    var loop;
    var position = 50;
    var translate = 100;
    for (loop = 0; loop < array.length; loop++){

        var rectangle = svg.append("rect")
        .attr("width", 50)
        .attr("height", 50)
        .attr("x", position)
        .attr("y", 150)
        .attr("fill", "#cccccc")
        .attr("stroke", "red");

        rectangles.push(rectangle);

        var arrayNumber = svg.append("text")
        .attr("x", position + 22)
        .attr("fill", "red")
        .attr("y", 180)
        .text(array[loop]);

        numbers.push(arrayNumber);

        position = position + translate;

    }
    
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
        arrayMoves.push(i);
        arrayMoves.push(minIndex);
    }
    console.log(arrayMoves);
    return uarray;
}


//THIS IS THE INSERTION SORT

function cinsertionSort (items) {
    step = 0;
    // THIS PART OF THE CODE IS RESPOSIBLE FOR GENERATING THE BOXES FOR DISPLAY 
    svg = d3.select("#main-content")
    .append("svg")
    .attr("width", 800)
    .attr("height", 500);

    var array = [5, 4, 3, 2, 9, 6];
    arrayMoves = new Array();
    rectangles = new Array();
    numbers = new Array();
    var loop;
    var position = 50;
    var translate = 100;
    for (loop = 0; loop < array.length; loop++){

        var rectangle = svg.append("rect")
        .attr("width", 50)
        .attr("height", 50)
        .attr("x", position)
        .attr("y", 150)
        .attr("fill", "#cccccc")
        .attr("stroke", "red");

        rectangles.push(rectangle);

        var arrayNumber = svg.append("text")
        .attr("x", position + 22)
        .attr("fill", "red")
        .attr("y", 180)
        .text(array[loop]);

        numbers.push(arrayNumber);

        position = position + translate;

    }
    
    for (var i = 0; i < items.length; i++) {
        let value = items[i]
        // store the current item value so it can be placed right
        for (var j = i - 1; j > -1 && items[j] > value; j--) {
            // loop through the items in the sorted array (the items from the current to the beginning)
            // copy each item to the next one
            items[j + 1] = items[j]
            arrayMoves.push(j);
            arrayMoves.push(j + 1);
            //document.getElementById("work-section").innerHTML += items + "<br>";
        }
        // the last item we've reached should now hold the value of the currently sorted item
        items[j + 1] = value;
        //arrayMoves.push(j + 1);
        //arrayMoves.push(i);
    }
}

//THIS IS THE BUBBLE SORT           

function cbubbleSort (items) {
    step = 0;
    // THIS PART OF THE CODE IS RESPOSIBLE FOR GENERATING THE BOXES FOR DISPLAY 
    svg = d3.select("#main-content")
    .append("svg")
    .attr("width", 800)
    .attr("height", 500);

    var array = [5, 4, 3, 2, 9, 6];
    arrayMoves = new Array();
    rectangles = new Array();
    numbers = new Array();
    var loop;
    var position = 50;
    var translate = 100;
    for (loop = 0; loop < array.length; loop++){

        var rectangle = svg.append("rect")
        .attr("width", 50)
        .attr("height", 50)
        .attr("x", position)
        .attr("y", 150)
        .attr("fill", "#cccccc")
        .attr("stroke", "red");

        rectangles.push(rectangle);

        var arrayNumber = svg.append("text")
        .attr("x", position + 22)
        .attr("fill", "red")
        .attr("y", 180)
        .text(array[loop]);

        numbers.push(arrayNumber);

        position = position + translate;

    }
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
                arrayMoves.push(j);
                arrayMoves.push(j + 1);

            }
        }        
    }
    return items;
}

function cqSwap(arr,l,r) {
    var temp = arr[l];
    arr[l] = arr[r];
    arr[r] = temp;
    arrayMoves.push(l);
    arrayMoves.push(r);
}

function cpartition(arr, left, right) {
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
            cqSwap(arr, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

function cqSort(arr,l,r) {
    step = 0;
    // THIS PART OF THE CODE IS RESPOSIBLE FOR GENERATING THE BOXES FOR DISPLAY 
    svg = d3.select("#main-content")
    .append("svg")
    .attr("width", 800)
    .attr("height", 500);

    var array = [5, 4, 3, 2, 9, 6];
    arrayMoves = new Array();
    rectangles = new Array();
    numbers = new Array();
    var loop;
    var position = 50;
    var translate = 100;
    for (loop = 0; loop < array.length; loop++){

        var rectangle = svg.append("rect")
        .attr("width", 50)
        .attr("height", 50)
        .attr("x", position)
        .attr("y", 150)
        .attr("fill", "#cccccc")
        .attr("stroke", "red");

        rectangles.push(rectangle);

        var arrayNumber = svg.append("text")
        .attr("x", position + 22)
        .attr("fill", "red")
        .attr("y", 180)
        .text(array[loop]);

        numbers.push(arrayNumber);

        position = position + translate;

    }
    //console.log("QSort -> " + arr);
    var index;
    var uarray = arr;

    if(uarray.length > 1) {
        index = cpartition(uarray,l,r);

        if(l < index - 1) {
            cqSort(uarray,l,index - 1);
        }
        if(index < r) {
            cqSort(uarray,index,r);
        }
    }
    return uarray;
}