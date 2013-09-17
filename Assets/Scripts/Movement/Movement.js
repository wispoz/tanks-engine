/*
The most difficult script this tutorial has to offer, and it really isnt that hard.
Basically there is acceleration and decceleration. We have a max speed along with
a rotation speed. It makes sure that we are rotating correctly when we are in reverse as well.
*/

var moveAcceleration : float = 3; //The acceleration speed that we use
var moveDecceleration : float = -3; //The decelleration speed that we use
var tanksVelocity : float = 0; //This is the variable of our velocity. Very important is this.
var maxSpeed : float = 5; //This is the max speed we are allowed going.
var rotSpeed : float = 30; //The speed at which we shall rotate.
var jitControl : float = 0.02; //The ammount at which velocity is set back to 0.
var rotateJoystick : Joystick;
var moveJoystick : Joystick;
//Update(), a very important function indeed. It lets us do actions every frame.
function FixedUpdate () {
/*Move our object forward every frame at the speed of tanksVelocity * Time.deltaTime. 
This means every second, we will have moved as far as the amount of the number of the tanksVelocity variable is. */
	transform.Translate(Vector3(0, 0, tanksVelocity * Time.deltaTime));
	//if tanksVelocity is less than or equal to 0.05 & is also greater than or equal to -0.05.
	if (tanksVelocity <= jitControl && tanksVelocity >= -jitControl) {
		tanksVelocity = 0; //Set the velocity to 0, so there is no jittering of the tank when not moving.
	}
	//If the user is holding down the up arrow.
	if (Input.GetKey (KeyCode.UpArrow)) {
		//If tanksVelocity is less than or equal to maxspeed.
		if (tanksVelocity <= maxSpeed) {
			tanksVelocity += moveAcceleration * Time.deltaTime; //Add moveAcceleration to tanksVelocity every second.
		}
	//If the user is holding down the down arrow.
	} else if (Input.GetKey (KeyCode.DownArrow)) {
		//If tanksVelocity is greater thank or equal to -maxspeed.
		if (tanksVelocity >= -maxSpeed) {
			tanksVelocity -= moveAcceleration * Time.deltaTime; //Take away moveAcceleration from tanksVelocity every second.
		}
	//If those two arrow keys are not being pressed.
	} else {
		//If tanksVelocity is greater than 0.
		if (tanksVelocity > 0) {
			tanksVelocity += moveDecceleration * Time.deltaTime; //Slow down tanksVelocity by moveDecceleration every second.
		//If tanksVelocity is less than 0
		} else if (tanksVelocity < 0) {
			tanksVelocity -= moveDecceleration * Time.deltaTime; //Speed tanksVelocity up by -moveDecceleration every second.
		}
	}
	//If the user is holding down the left arrow.
	if (Input.GetKey (KeyCode.LeftArrow)) {
		//If the user is also holding down the down arrow.
		if (Input.GetKey(KeyCode.DownArrow)) {
			transform.Rotate(Vector3(0, rotSpeed * Time.deltaTime, 0)); //Rotate the tank to the right, to simulate actual physics.
		//If the user is not holding the down arrow down.
		} else {
			transform.Rotate(Vector3(0, -rotSpeed * Time.deltaTime, 0)); //Rotate the tank to the left.
		}
	}
	//If the user is holding down the right arrow.
	if (Input.GetKey (KeyCode.RightArrow)) {
		//If the user is also holding down the down arrow.
		if (Input.GetKey(KeyCode.DownArrow)) {
			transform.Rotate(Vector3(0, -rotSpeed * Time.deltaTime, 0)); //Rotate the tank to the left, to simulate actual physics.
		//If we are not holding the down arrow key as well.
		} else {
			transform.Rotate(Vector3(0, rotSpeed * Time.deltaTime, 0)); //Rotate the tank to the right.
		}
	}
}