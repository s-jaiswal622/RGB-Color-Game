// Variables
var numOfSquares = 6;		// Number of squares to be displayed.
var colors = [];			// For storing colors of squares.
var victoryColor;			// Selecting a target color.

// Element selectors.
var squares = document.querySelectorAll(".square");
var display = document.getElementById("display");
var messageDisplay = document.querySelector("#message");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");
var h1 = document.querySelector("h1");

init();

// Runs at the start of page. 
function init()
{
	setUpModeButtons();
	setUpSquares();
	reset();

	// Event listener for reset button.
	resetButton.addEventListener("click", function(){
		reset();
	});

}

// set up event listeners for mode buttons i.e. easy/hard buttons.
function setUpModeButtons()
{
	// Adding event listener to each mode button.
	for (var i=0; i<modeButtons.length; i++)
	{
		modeButtons[i].addEventListener("click", function(){
			// Removing the selected class from all butoons.
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");

			// Adding the selected class to the button clicked.
			this.classList.add("selected");
			// Setting number of squares.
			if(this.textContent === "EASY")
			{
				numOfSquares = 3;
			}
			else
			{
				numOfSquares = 6;
			}
			// Filling the colors in squares.
			reset();
		});
	}
}

// To set up square listeners and other properties.
function setUpSquares()
{
	// Adding event listener to all squares.
	for( var i = 0; i<squares.length; i++)
	{
		squares[i].addEventListener("click", function(){

			// Getting the color of square the user clicked.
			var clickedColor = this.style.backgroundColor;
			// Checking if the clicked square was the target color.
			if(clickedColor === victoryColor)	
			{
				// Displaying the correct messages.
				messageDisplay.textContent = "CORRECT!";
				resetButton.textContent = "Play Again?";
				// Changing the Upper display.
				h1.style.backgroundColor = clickedColor;
				// Changing the color of all squares.
				changeColors(clickedColor);
			}
			else
			{
				// Making the box disappear.
				this.style.backgroundColor = '#333333';
				// Displaying proper message.
				messageDisplay.textContent = "TRY AGAIN!";
			}

		});
	}
}

// To reset the game.
function reset()
{
	// Generate random colors.
	colors = generateRandomColors(numOfSquares);
	// Select new target color.
	victoryColor = pickColor(colors);
	// Set the target color on HTML.
	display.textContent = victoryColor;
	// Assign the random colors to squares.
	for(var i=0; i<squares.length; i++)
	{
		if(colors[i])
		{
			// For showing the square on screen.
			squares[i].style.display = "block";
			// Setting the color.
			squares[i].style.backgroundColor = colors[i];
		}
		else
		{
			// For hiding the square on screen.
			squares[i].style.display = "none";
		}
	}

	// Setting the other properties.
	// Setting the upper half color. 
	h1.style.backgroundColor = "steelblue";
	// Setting the content of buttons
	resetButton.textContent = "NEW COLORS";
	messageDisplay.textContent = "";
}

// To change color of all squares to given color.
function changeColors(color)
{
	// Changing color of squares.
	for(var i=0; i<squares.length; i++)
	{
		squares[i].style.backgroundColor = color;
	}
}

// To pick a random color from given array of colors.
function pickColor(colors)
{
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// To generate random colors for the number of squares given
function generateRandomColors(num)
{
	// Array to store random colors.
	var colors = [];

	// Looping for correct number of colors.
	for(var i=0; i<num; i++)
	{
		// Generate a random color.
		colors.push(randomColor());
	}

	return colors;
}

// To generate a random rgb color.
function randomColor()
{
	// Random value of red i.e. r (between 0-255)
	var red = Math.floor(Math.random() * 256);

	// Random value of green i.e. r (between 0-255)
	var green = Math.floor(Math.random() * 256);

	// Random value of blue i.e. r (between 0-255)
	var blue = Math.floor(Math.random() * 256);

	// Generating the color.
	var color = "rgb(" + red + ", " + green + ", " + blue + ")";
	return color;
		
}