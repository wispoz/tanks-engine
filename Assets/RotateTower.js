var rotateJoystick : Joystick;
function Update () {
transform.Rotate(Vector3(0,0,rotateJoystick.position.x));
}