public var yourTexture: Texture2D;
public var uvAnimationTileX = 1; //Here you can place the number of columns of your sheet. 
                           //The above sheet has 24
 
public var uvAnimationTileY = 1; //Here you can place the number of rows of your sheet. 
                          //The above sheet has 1
function Update(){
	var size = Vector2 (1.0 / uvAnimationTileX, 1.0 / uvAnimationTileY);
    renderer.material.mainTexture = yourTexture;
    renderer.material.SetTextureScale ("_MainTex", size);
}