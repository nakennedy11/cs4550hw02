//Noah Kennedy
//Web Dev CS4550
//HW02

(function(){
    // wait until the page is loaded to call
    window.addEventListener("DOMContentLoaded", init, false);
    
    var nums;
    var storedNum;
    var op;
    var screenNum;
    
    function listenHandler(x) {
	screenNum = document.getElementById("screen").value;

	if(nums.includes(parseFloat(x.innerHTML))) { // if it is a number button and not the more specific operator
	    x.addEventListener("click", function(){
		document.getElementById("screen").value += x.innerHTML.toString(); // add the number (as a string) to the current displayed number
	    });
	} else if (x.innerHTML.includes(".")) {
	    x.addEventListener("click", function(){
testing(x, screenNum);
		if(document.getElementById("screen").value.includes(".")){
		    // do nothing on this press if there is already a decimal in the string
		    } else { //it does not already have a decimal
			document.getElementById("screen").value += "."; // add the decimal to the string
		    }
	    });
	} else if (x.innerHTML.includes("-") || (x.innerHTML.includes("/") && !x.innerHTML.includes("+")) || x.innerHTML.includes("x")) { // if it is an easy operator
	    x.addEventListener("click", function(){
testing(x, screenNum);
		if (op === "") { // if there is no operator currently selected
		    op = x.innerHTML; // set the operator and then move to ask for a new number
		    storedNum = document.getElementById("screen").value; // store the previous number
		    document.getElementById("screen").value = ""; // clear the screen for a new number
		} else {
		    //if there is already an operator stored for use, ignore the click of another op
		}
	    });
	} else if (x.innerHTML.includes("C")) {
	    x.addEventListener("click", function(){
	    // clears the calculator of current and previous numbers as well as the stored operator
		storedNum = "";
	    	    op = "";
	    	    document.getElementById("screen").value = "";
	    	});
	} else if (x.innerHTML.includes("+/=")) {
	    x.addEventListener("click", function(){
		if (op === "") {
		    // if there is no current operator than assume addition is wanted
		    op = "+";
		    storedNum = document.getElementById("screen").value; // store the value, then remove it from the screen
		    document.getElementById("screen").value = "";
		} else {
		    // if it is truly looking for computation, send it over and clear some things out
		    document.getElementById("screen").value = compute(storedNum, document.getElementById("screen").value, op);
		    
		    storedNum = "";
		    op = "";
		}
	    });
	} 
    }
    
    function compute(val1, val2, operator) {
	var f1 = parseFloat(val1);
	var f2 = parseFloat(val2);
	
	if (operator === "+") {
	    return f1 + f2;
	} else if (operator === "-") {
	    return f1 - f2;
	} else if (operator === "x") {
	    return f1 * f2;
	} else if (operator === "/") {
	    return f1 / f2;
	}
    }

    //initialize the workings
    function init() {    
	// loop through all of the buttons, setting event listeners for each one
	var buttons = Array.from(document.getElementsByTagName("button"));
	
	nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	storedNum = "";
	op = "";
	
	for (var i = 0; i < buttons.length; i++){
	    listenHandler(buttons[i]);
	}
    }
})();
