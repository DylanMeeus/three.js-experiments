/**
 * Created by Dylan on 27/08/2015.
 */

var exists = false;

// Billboard & 2-sided textures.

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
function displayMatrix() {


    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if(!exists){
        document.getElementById("renderframe").appendChild(renderer.domElement);
        exists = true;
    }else{ // we empty the scene

        while(document.getElementById("renderframe").hasChildNodes()){
            document.getElementById("renderframe").removeChild(document.getElementById("renderframe").lastChild);
        }
        scene = new THREE.Scene();
        document.getElementById("renderframe").appendChild(renderer.domElement);

    }

    camera.position.z = 5;

    // generate all the shapes
    //console.log(pascalnumbers);


    //console.log(currentNumber);
    var shapes, geom, mat, mesh;
    var letters = [];


    function render() {

        requestAnimationFrame(render);
        renderer.render(scene, camera);

        scene.traverse(function (node)
        {
            if(node instanceof THREE.Mesh)
            {

                //node.quaternion.copy(camera.quaternion); // BILLBOARD
                node.position.y-=0.05;
                node.rotation.x += 0.1;
            }
        });


        // Clear the scene

        var obj, i;
        for ( i = scene.children.length - 1; i >= 0 ; i -- ) {
            obj = scene.children[i];
            if ( obj instanceof THREE.Mesh) {
                  if(obj.position.y < -5) {
                      console.log("removing");
                      scene.remove(obj);
                  }
            }
        }




        for(var i = 0; i < 5; i++){
        shapes = THREE.FontUtils.generateShapes(getRandomLetter(), {
            font: "helvetiker",
            weight: "normal",
            size: 0.25
        });

        geom = new THREE.ShapeGeometry(shapes);

        mat = new THREE.MeshBasicMaterial({color:"#" + Math.random().toString(16).slice(2, 8)});
        mat.side = THREE.DoubleSide;
        mesh = new THREE.Mesh(geom, mat);
        var randomx = ((Math.random() * 20)-10);
            var randomz = ((Math.random() * 20 - 10));
        mesh.position.set(randomx, +6, randomz);
        scene.add(mesh);
        }

    }
    render();
}
var letterammount = 0;
function getRandomLetter()
{
    letterammount++;
    console.log("rendered letters: " + letterammount);
    return letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
}







//*************** BEGIN CAMERA MANIPULATION ******************************\\

// testing camera movement

THREE.PerspectiveCamera.prototype.setRotateX = function( deg ){
    if ( typeof( deg ) ==  'number' &&parseInt( deg ) == deg ){
        this.rotation.x = deg * ( Math.PI / 180 );
    }
};
THREE.PerspectiveCamera.prototype.setRotateY = function( deg ){
    if ( typeof( deg ) == 'number' && parseInt( deg ) == deg ){
        this.rotation.y = deg * ( Math.PI / 180 );
    }
};
THREE.PerspectiveCamera.prototype.setRotateZ = function( deg ){
    if ( typeof( deg ) == 'number' && parseInt( deg ) == deg ){
        this.rotation.z = deg * ( Math.PI / 180 );
    }
};
THREE.PerspectiveCamera.prototype.getRotateX = function(){
    return Math.round( this.rotation.x * ( 180 / Math.PI ) );
};
THREE.PerspectiveCamera.prototype.getRotateY = function(){
    return Math.round( this.rotation.y * ( 180 / Math.PI ) );
};
THREE.PerspectiveCamera.prototype.getRotateZ = function(){
    return Math.round( this.rotation.z * ( 180 / Math.PI ) );
};

// forward backward implementation


const KEYUP             = 38;        // up key
const KEYDOWN             = 40;        // down key
const KEYLEFT             = 37;        // left key
const KEYRIGHT            = 39;        // right key
const Z_ROT_INC            = 86;
const Z_ROT_DEC            = 87;
const VIEW_INCREMENT    = 1;        // amount to move in degrees
const Z = 90;
const S = 83;
const A = 65;
const D = 68;
const Q = 81;
const distance = 0.25; // how much does the camera move during forward/backward/left/right
document.addEventListener('keydown', function(e) {
    var key = e.keyCode;
    //console.log(key);

    switch (key) {

        case Z:
            camera.translateZ(-distance);
            break;

        case S:
            camera.translateZ(distance);
            break;

        case A:
            camera.translateX(-distance);
            break;
        case D:
            camera.translateX(distance);
            break;

        case Q:
            console.log("Q!");
            camera.translateX(-distance);
            break;
        case KEYUP:
            // x increments, z depends of current y

            if (camera.getRotateX() < 90) {
                camera.setRotateX(camera.getRotateX() + VIEW_INCREMENT);
            }
            break;

        case KEYDOWN:

            if (camera.getRotateX() > -90) {
                camera.setRotateX(camera.getRotateX() - VIEW_INCREMENT);
            }
            break;

        case KEYLEFT:

            camera.setRotateY(camera.getRotateY() + VIEW_INCREMENT);
            break;

        case KEYRIGHT:

            camera.setRotateY(camera.getRotateY() - VIEW_INCREMENT);
            break;

        case Z_ROT_INC:

            camera.setRotateZ(camera.getRotateZ() + VIEW_INCREMENT);
            break;

        case Z_ROT_DEC:

            camera.setRotateZ(camera.getRotateZ() - VIEW_INCREMENT);
            break;

    }
});
