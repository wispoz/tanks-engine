//Rotation of the turret, This is the most simple script we will do, so enjoy it thouroghly.

var rotSpeed : float = 30; //The speed at which the turret shall rotate

//The Update() function. Every frame this is called.
function Update () {
	//While the user is holding down the D key.
	if (Input.GetKey (KeyCode.D)) {
		transform.Rotate(Vector3(0, 0, rotSpeed * Time.deltaTime)); //Rotate the object that this script is attached to, in the right direction.
	}
	//While the user is holding down the A key.
	if (Input.GetKey (KeyCode.A)) {
		transform.Rotate(Vector3(0, 0, -rotSpeed * Time.deltaTime)); //Rotate the object that this script is attached to, in the left direction.
	}
}