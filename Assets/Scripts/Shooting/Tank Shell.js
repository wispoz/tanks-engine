/*
Right, well what this script basically does is everything to do with the tank shell.
It gives it a life timer, explosion, sets the explosion power, and the radius if 
maximum effect of the explosion and more. It is put on the shell prefab, so no worries
about adding all this code to the shoot script, because it is done here.
*/

var lifeTimer : float = 0.0; //The timer of life for this projectile.
var lifeTimerMax : float = 12.0; //The max amount of time that this shell will live.
var explosionRadius : float = 5.0; //The radius of our collision.
var explosionPower : float = 350.0;  //The amount of power the explosion shall have.

var explosion : GameObject; //The GameObject that will replace this wonderful shell of destruction.

//The less used FixedUpdate() function. Everything to do with physics should go in this function simply because this way they will be updated every frame that is and that should be.
function FixedUpdate() {
	//The line below sets the variables thisPosition to the forward direction of the projectile.
	var thisDirection : Vector3 = transform.position + transform.TransformDirection(Vector3.forward); 
	rigidbody.AddForceAtPosition(Vector3.up * -9.81, thisDirection); //This line, basically states that it will add a force at the position of the variable thisPosition.
}
//The Update() function I like to keep explaining.
function Update() {
	lifeTimer += 1 * Time.deltaTime; //Adds one to the lifeTimer variable every second.
	//If lifeTimer is greater than or equal to lifeTimerMax.
	if(lifeTimer >= lifeTimerMax) {
		Destroy (gameObject); //This is rather self explaing. It states that this object will be destroyed.
	}
}

//The OnCollisionEnter() function. Very useful indeed. When this object enters a collision, the stuff inside this function happens.
function OnCollisionEnter() {
	explosionThing(); //Go to the explosionThing() function.
	var explosionInstantiation = Instantiate(explosion, this.transform.position, this.transform.rotation); //Instantiate the explosion GameObject, at the position of this projectile, and rotation.
	Destroy (gameObject); //Destroy this GameObject.
}

//Our own function that lets us make boom (lets us create an explosion).
function explosionThing() {	
	var colliders : Collider[] = Physics.OverlapSphere (transform.position, explosionRadius); //Sets a collider sphere variable.
	//For each new thing the hit var, that we define in the function, that the explosionRadius collides with.
	for (var hit in colliders) { 	
		//If the thing we hit is a rigidbody.
		if (hit.rigidbody)  { 
			hit.rigidbody.AddExplosionForce(explosionPower, transform.position, explosionRadius); //Add an explosion force that affects all rigidbody's.
		} 
	}
}