@script RequireComponent( CharacterController )

var moveJoystick : Joystick;
var rotateJoystick : Joystick;
var speed : float = 5;								// Ground speed
var jumpSpeed : float = 8;
var inAirMultiplier : float = 0.25; 				// Limiter for ground speed while jumping
var rotationSpeed : Vector2 = Vector2( 50, 25 );	// Camera rotation speed for each axis
var cameraTransform : Transform;
private var thisTransform : Transform;
private var character : CharacterController;
private var velocity : Vector3;		
	var gravity : float = 20.0;
function Start()
{
	// Cache component lookup at startup instead of doing this every frame	
	thisTransform = GetComponent( Transform );
	character = GetComponent( CharacterController );	
	// Move the character to the correct start position in the level, if one exists
	var spawn = GameObject.Find( "PlayerSpawn" );
	if ( spawn )
		thisTransform.position = spawn.transform.position;	
}


function FaceMovementDirection()
{	
	var horizontalVelocity : Vector3 = character.velocity;
	horizontalVelocity.y = 0; // Ignore vertical movement
	
	// If moving significantly in a new direction, point that character in that direction
	if ( horizontalVelocity.magnitude > 0.1 )
		thisTransform.forward = horizontalVelocity.normalized;
}

function Update()
{


	
	var movement = cameraTransform.TransformDirection( Vector3( moveJoystick.position.x, 0, moveJoystick.position.y ) );
	// We only want the camera-space horizontal direction
	movement.y = 0;
	movement.Normalize(); // Adjust magnitude after ignoring vertical movement
	
	// Let's use the largest component of the joystick position for the speed.
	var absJoyPos = Vector2( Mathf.Abs( moveJoystick.position.x ), Mathf.Abs( moveJoystick.position.y ) );
	movement *= speed * ( ( absJoyPos.x > absJoyPos.y ) ? absJoyPos.x : absJoyPos.y );
	
	// Check for jump
	if ( character.isGrounded )
	{
		if ( rotateJoystick.tapCount == 2 )
		{
			// Apply the current movement to launch velocity
			velocity = character.velocity;
			velocity.y = jumpSpeed;
		}
	}
	else
	{			
		// Apply gravity to our velocity to diminish it over time
		velocity.y += Physics.gravity.y * Time.deltaTime;
		
		// Adjust additional movement while in-air
		movement.x *= inAirMultiplier;
		movement.z *= inAirMultiplier;
	}
	
	movement += velocity;
	movement += Physics.gravity;
	movement *= Time.deltaTime;
	
	// Actually move the character
	character.Move( movement );
		if ( character.isGrounded )
		// Remove any persistent velocity after landing
		velocity = Vector3.zero;
	
	// Face the character to match with where she is moving
	FaceMovementDirection();	
	
}

function OnGUI () {
GUI.Label (Rect (10, 10, 100, 20), "x:"+moveJoystick.position.x +"z:"+0+"y:"+moveJoystick.position.y);
}