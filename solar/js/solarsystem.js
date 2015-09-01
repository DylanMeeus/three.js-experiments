/**
 * Created by Dylan on 31/08/2015.
 */
/**
*/

var exists = false;

// Billboard & 2-sided textures.



var orbit = false;

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
function display() {


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

    camera.position.z = 200;

    // generate all the shapes
    //console.log(pascalnumbers);


    //console.log(currentNumber);
    // let's visualize our solar system.

    var geom, mat, mesh;







    // SET UP FOR ORBIT
    parent = new THREE.Object3D();
    scene.add( parent );

    // pivots




    // CELESTIAL BODIES


    // sun

    geom = new THREE.SphereGeometry(109,32,32);
    mat = new THREE.MeshBasicMaterial();
    mat.map = THREE.ImageUtils.loadTexture("images/sun.jpg");
    mesh = new THREE.Mesh(geom,mat);
    mesh.name = "sun";
    scene.add(mesh);


    // Mercury
    geom = new THREE.SphereGeometry(0.42,32,32);
    mat = new THREE.MeshBasicMaterial();
    mat.map = THREE.ImageUtils.loadTexture("images/mercury.jpg");
    mesh = new THREE.Mesh(geom,mat);
    mesh.position.set(150,0,0);
    mesh.name = "mercury";
    scene.add(mesh);





    // Venus
    geom = new THREE.SphereGeometry(0.94,32,32);
    mat = new THREE.MeshBasicMaterial();
    mat.map = THREE.ImageUtils.loadTexture("images/venus.jpg");
    mesh = new THREE.Mesh(geom,mat);
    mesh.position.set(175,0,0);
    mesh.name = "venus";
    scene.add(mesh);

    // planet earth
    geom = new THREE.SphereGeometry(1,32,32);
    mat = new THREE.MeshBasicMaterial();
    //  mat = new THREE.MeshPhongMaterial();
    mat.map = THREE.ImageUtils.loadTexture("images/earthmap1k.jpg");
    mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(200,0,0);
    mesh.name = "earth";
    scene.add(mesh);



    // Mars

    geom = new THREE.SphereGeometry(0.53,32,32);
    mat = new THREE.MeshBasicMaterial();
    mat.map = THREE.ImageUtils.loadTexture("images/mars.jpg");
    mesh = new THREE.Mesh(geom,mat);
    mesh.position.set(200,0,0);
    mesh.name = "mars";
    scene.add(mesh);



    // Jupiter

    geom = new THREE.SphereGeometry(10.97,32,32);
    mat = new THREE.MeshBasicMaterial();
    mat.map = THREE.ImageUtils.loadTexture("images/jupiter.jpg");
    mesh = new THREE.Mesh(geom,mat);
    mesh.position.set(275,0,0);
    mesh.name = "jupiter";
    scene.add(mesh);


    // Saturn (needs some rings though!)

    geom = new THREE.SphereGeometry(9.14,32,32);
    mat = new THREE.MeshBasicMaterial();
    mat.map = THREE.ImageUtils.loadTexture("images/saturn.jpg");
    mesh = new THREE.Mesh(geom,mat);
    mesh.position.set(350,0,0);
    mesh.name = "saturn";
    scene.add(mesh);

    // Uranus

    geom = new THREE.SphereGeometry(3.98,32,32);
    mat = new THREE.MeshBasicMaterial();
    mat.map = THREE.ImageUtils.loadTexture("images/uranus.jpg");
    mesh = new THREE.Mesh(geom,mat);
    mesh.position.set(400,0,0);
    mesh.name = "uranus";
    scene.add(mesh);


    // Neptune

    geom = new THREE.SphereGeometry(3.86,32,32);
    mat = new THREE.MeshBasicMaterial();
    mat.map = THREE.ImageUtils.loadTexture("images/neptune.jpg");
    mesh = new THREE.Mesh(geom,mat);
    mesh.position.set(450,0,0);
    mesh.name = "neptune";
    scene.add(mesh);


    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        parent.rotation.z += 0.01;
        scene.traverse(function (node)
        {
            if(node instanceof THREE.Mesh)
            {
                if(node.name == "earth")
                {
                    node.rotation.y += 0.01;
                } else if(node.name == "sun")
                {
                    node.rotation.y += 0.005;
                }
                else if(node.name == "mercury"){
                    node.rotation.y += 0.0075;
                }
                else{
                    node.rotation.y += 0.0095;
                }
            }
        });




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
const VIEW_INCREMENT    = 2;        // amount to move in degrees
const Z = 90;
const S = 83;
const A = 65;
const D = 68;
const Q = 81;
const distance = 1.25; // how much does the camera move during forward/backward/left/right
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
