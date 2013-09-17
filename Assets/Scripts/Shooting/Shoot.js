//The script that shoots the projectile

var tankShell : GameObject; //The object we choose in the inspector, that will be shot out of our tank. Technically we could shoot a tank out of our tank.

var boomNoise : AudioClip; //The audio we want to play when a projectile is shot. We choose this in the inspector.

var timer : float = 1; //The timer that tells us when we are again allowed to shoot.
var timerMax : float = 1; //The time that our timer has to reach before the tank can shoot again.
var powerOfShot : float = 30; //The power at which our projectile moves forward.

//The awesome Update() function. I am in love with this lovely thing.
function Update () {
	timer += 1 * Time.deltaTime; //Adds 1 to our timer variable every second.
	//While space is continually being held down.
	if (Input.GetKey(KeyCode.Space)) {
		//If our timer variable is greater than or equal to timerMax.
		if(timer >= timerMax) {
			shootProjectile(); //Go to our shootProjectile() function that we made.
		}
	}
}
//The uber shootProjectile() function that we have made to produce projectiles that go weeeeeeeeeeeeeeeeeeeeeeee then boom.
function shootProjectile() {
	timer = 0; //This resets the timer so as to make sure we cant fire every milisecond. 
	var shellInstance = Instantiate(tankShell, transform.position, transform.rotation); //This instantiates a projectile based on what the tankShell variable is.
	audio.PlayOneShot(boomNoise); //This plays the noise we picked in the boomNoise variable.
	shellInstance.rigidbody.AddRelativeForce(Vector3.forward * powerOfShot, ForceMode.Impulse); //This accesses the instantiation we made, and then applies a force equal to powerOfShot in the forward direction (z-axis).
}