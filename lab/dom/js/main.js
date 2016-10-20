"use strict";

var boxOne = document.getElementById('one'),
	boxTwo = document.getElementById('two'),
	boxThree = document.getElementById('three'),
	boxFour = document.getElementById('four'),
	boxFive = document.getElementById('five'),
	boxSix = document.getElementById('six');
// ONE
boxOne.addEventListener("click", function() {
	boxOne.classList.add("black");
});
// TWO
boxTwo.addEventListener("click", function() {
	boxTwo.classList.add("fall");
});
// THREE
boxThree.addEventListener("mouseover", function() {
	boxThree.classList.add("fade-to-white");
	boxThree.classList.add("white");
});
boxThree.addEventListener("mouseout", function() {	
	console.log("mouse out event");
	boxThree.classList.remove("white");
})
// FOUR
boxFour.addEventListener("click", function() {
	if (boxFour.classList.contains("fall")) {
		boxFour.classList.remove("fall");
		boxFour.classList.add("remove");
	} else if (boxFour.classList.contains("float")) {
		boxFour.classList.remove("float");
		boxFour.classList.add("fall");
	} else {
		boxFour.classList.add("fall");
	}
})

// five
boxFive.addEventListener("click", function() {
	console.log("click event");
	var left = 0;
	var timer = setInterval(function(){
		console.log("inside interval");
        boxFive.style.padding = (left += 10) +  "px";
		boxFive.style.left = 400;
		if (left == 400) {
			clearInterval(timer);
			boxFive.style.display = "none";
		}
    }, 10 )
})