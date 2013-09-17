/*
The script for rotation of our gun belongs 
right in this .js file. Don't you love scripting?
*/

var rotSpeed : float = 15; //The rotational speed of our gun.
var thisRotation : float = 0; //The variable for how much the gun has rotated so we can stop the rotation before it looks really dumb.

//The Update() function which I hold so close to myself.
function Update () {
	//While the W key is continually held down.
	if(Input.GetKey(KeyCode.W)) {
		//As long as the value of thisRotation is greater than -11.
		if(thisRotation > -11) {
			transform.Rotate(Vector3(rotSpeed * Time.deltaTime, 0, 0)); //Rotate the gun on the x axis in the down direction.
			thisRotation -= rotSpeed * Time.deltaTime; //thisRotation goes down in value that same amount that the rotation does.
		}
	}
	//While the S key is continually held down.
	if(Input.GetKey(KeyCode.S)) {
		//As long as the value of thisRotation is less than 89.
		if(thisRotation < 89) {
			transform.Rotate(Vector3(-rotSpeed * Time.deltaTime, 0, 0)); //Rotate the gun on the x axis in the up direction.
			thisRotation += rotSpeed * Time.deltaTime; //thisRotation goes up in value the same amount that the rotation does.
		}
	}
}