//import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
//import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';



const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}; // scene width


/***************** RENDERER SETTINGS ******************/

const canvas = document.querySelector(".webgl"); // link webgl to this canvas
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); // create webgl renderer
renderer.setSize(sizes.width, sizes.height); // renderer er size set korsi

// SLIDE:- BEAUTIFY IT
renderer.setClearColor(0x0, 1); //pura canvas space er color set kore : BLACK
renderer.clear();

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//NEW SCENE create korlam , renderer er shate niche add korsi
const scene = new THREE.Scene();
//?
let angle = 0;

/***************** LIGHT SETTINGS ******************/
//POINT LIGHT + AMBIENT LIGHT 
//POINT LIGHT (COLOR, INTENITY, DISTANCE)
const pointLight = new THREE.PointLight(0xfffff0, 0.5, 100); // POINT LIGHT
pointLight.position.set(0, 30, -50); // POINT LIGHT er position set korsi aikhane
pointLight.castShadow = true; // default false 
pointLight.shadow.mapSize.width = 1048; //2
pointLight.shadow.mapSize.height = 1048;
scene.add(pointLight);

// Left Lamp
const pointLight1 = new THREE.PointLight(0xdb2754, 0.5, 1000); // POINT LIGHT
pointLight1.position.set(37, 15, -20); // POINT LIGHT er position set korsi aikhane
pointLight1.castShadow = true; // default false 
pointLight1.shadow.mapSize.width = 1048; //2
pointLight1.shadow.mapSize.height = 1048;
var leftlampState = 0;

// Right Lamp
const pointLight2 = new THREE.PointLight(0xdbba27, 0.5, 1000); // POINT LIGHT
pointLight2.position.set(37, 15, 20); // POINT LIGHT er position set korsi aikhane
pointLight2.castShadow = true; // default false 
pointLight2.shadow.mapSize.width = 1048; //2
pointLight2.shadow.mapSize.height = 1048;
var rightlampState = 0;

//AMBIENT LIGHT (COLOR, INTENITY)
const ambientLight = new THREE.AmbientLightProbe(0xffffe0, 0.8); // Ambient light create korsi
ambientLight.position.set(-40, 30, 10);
ambientLight.castShadow = true;
var ambientlightState = 1;
scene.add(ambientLight); // light scene e add korlam
/***************** LIGHT SETTINGS ENDS ******************/


/***************** CAMERA STARTS ******************/
// CAMERA INITIAL POSITIONS
let cameraRotationVar = 0.; // -0.3
let cameraPositionY = 30; //20

/// SLIDE:- CREATING A CAMERA (FOV, viewAspectRatio, znear, zfar)
const camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height,1,100);
//?

camera.position.x = Math.sin(cameraRotationVar) * 50; // 70 
camera.position.y = cameraPositionY;  
//?
camera.position.z = Math.cos(cameraRotationVar) * 40; // 40 
//camera.position.set(0, 50, 80); // Adjust the camera position
camera.lookAt(scene.position);
//camera.lookAt(windowMesh.position);
scene.add(camera);

//SLDIE:- RENDER THE SCENE FROM CAMERA
renderer.render(scene, camera);

/***************** CAMERA ENDS ******************/


// Shader code
const vertexShaderShowPiece = `
varying vec2 globecord;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  globecord = uv;
}`;

const fragmantShaderShowPiece = `
varying vec2 globecord;
uniform sampler2D u_texture_globe;
void main() {
  gl_FragColor = texture2D(u_texture_globe, globecord);
}`;


/***************** FLOOR STARTS ******************/
const tilesTexture = new THREE.TextureLoader().load("textures/mainfloor.jpg");
tilesTexture.wrapS = THREE.RepeatWrapping;
tilesTexture.wrapT = THREE.RepeatWrapping;
tilesTexture.repeat.set(3, 3);
tilesTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

let floor = new THREE.PlaneGeometry(80, 160);
const floorMaterial = new THREE.MeshStandardMaterial({
  map: tilesTexture,
});
floor = new THREE.Mesh(floor, floorMaterial);
floor.rotation.x = (-90 * Math.PI) / 180;
floor.receiveShadow = true; //default
scene.add(floor);
/***************** FLOOR ENDS ******************/


/***************** MINIFRIDGE ENDS ******************/
var fridgeLength = 10;
var fridgeWidth = 10;
var fridgeHeight = 20;

var fridgegeometry = new THREE.BoxBufferGeometry(fridgeLength, fridgeHeight, fridgeWidth);
var loader = new THREE.TextureLoader();

var material = [
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/fridge_side.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/fridge_front.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/fridge_top.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/fridge_side.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/fridge_side.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/fridge_side.png')})
];

var mesh = new THREE.Mesh(fridgegeometry, material);
mesh.position.set(30, 5, 67);
scene.add(mesh);

//door open
var fridgegeometry1 = new THREE.BoxBufferGeometry(fridgeLength, fridgeHeight, fridgeWidth);
var material1 = [
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/fridge_side.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/fridge_open.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/fridge_top.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/fridge_side.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/fridge_side.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/fridge_side.png')})
];

var mesh1 = new THREE.Mesh(fridgegeometry1, material1);
mesh1.position.set(30, 5, 67);

//the door
var fridgegeometry2 = new THREE.BoxBufferGeometry(fridgeLength-0.05, fridgeHeight, 0.1);
var material2 = [
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/fridge_side.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/fridge_side.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/fridge_top.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/fridge_side.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/fridge_side.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/fridge_door.png')})
];

var mesh2 = new THREE.Mesh(fridgegeometry2, material2);
mesh2.position.set(20, 5, 72);

// Keyboard interaction
var cnt=0;
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  var keyCode = event.which;
  if (keyCode == 70) { //f
    if(cnt==0) {
      scene.remove(mesh);
      scene.add(mesh1);
      scene.add(mesh2);
      cnt+=1;
      renderer.render(scene, camera);
    }
    else if(cnt=1) {
      scene.remove(mesh1);
      scene.remove(mesh2);
      scene.add(mesh);
      cnt-=1;
      renderer.render(scene, camera); 
    }
  }
}
/***************** MINIFRIDGE ENDS ******************/


/***************** CLOSET STARTS ******************/
var closetLength = 15;
var closetWidth = 30;
var closetHeight = 30;
var cnt_closet = 0;

var drawerLength = closetLength;
var drawerWidth = closetWidth;
var drawerHeight = 5;

var closetgeometry = new THREE.BoxBufferGeometry(closetLength, closetHeight, closetWidth);

var closetmaterial = [
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/closet_closed.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')})
];
var closet = new THREE.Mesh(closetgeometry, closetmaterial);
closet.position.set(30, 20, 45);
scene.add(closet);

//opened
var closetgeometry1 = new THREE.BoxBufferGeometry(closetLength, closetHeight, closetWidth);

var closetmaterial1 = [
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/cupboard_innerside.jpg')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')})
];
var closet1 = new THREE.Mesh(closetgeometry1, closetmaterial1);
closet1.position.set(30, 20, 45);

//left door
var closetgeometry2 = new THREE.BoxBufferGeometry(closetLength-0.05, closetHeight, 0.5);
var closetmaterial2 = [
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/closet_door1.png')})
];
var closet2 = new THREE.Mesh(closetgeometry2, closetmaterial2);
closet2.position.set(15, 20, 30);

//right door
var closetgeometry3 = new THREE.BoxBufferGeometry(closetLength-0.05, closetHeight, 0.5);
var closetmaterial3 = [
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/closet_door2.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')})
];
var closet3 = new THREE.Mesh(closetgeometry3, closetmaterial3);
closet3.position.set(15, 20, 60);


var drawergeometry = new THREE.BoxBufferGeometry(drawerLength, drawerHeight, drawerWidth);

var drawermaterial = [
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load("textures/drawer.png")}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/wood.png')})
];

var drawer = new THREE.Mesh(drawergeometry, drawermaterial);
drawer.position.set(30, 3, 45);
scene.add(drawer);     
/***************** CLOSET ENDS ******************/


/************** LAMP STARTS *************/
var lamplightLength = 2;
var lamplightWidth = 5;
var lamplightHeight = 2;

var lamplightgeometry = new THREE.BoxBufferGeometry(lamplightLength, lamplightHeight, lamplightWidth);

var lamplightmaterial = [
  new THREE.MeshStandardMaterial({emissive: 0xfffff0, color: 0xFFFFF0,roughness: 1,metalness: 0.4}),
  new THREE.MeshStandardMaterial({emissive: 0xfffff0, color: 0xFFFFF0,roughness: 1,metalness: 0.4}),
  new THREE.MeshStandardMaterial({emissive: 0xfffff0, color: 0xFFFFF0,roughness: 1,metalness: 0.4}),
  new THREE.MeshStandardMaterial({emissive: 0xfffff0, color: 0xFFFFF0,roughness: 1,metalness: 0.4}),
  new THREE.MeshStandardMaterial({emissive: 0xfffff0, color: 0xFFFFF0,roughness: 1,metalness: 0.4}),
  new THREE.MeshStandardMaterial({emissive: 0xfffff0, color: 0xFFFFF0,roughness: 1,metalness: 0.4})
];
var lamplightmaterialOff = [
  new THREE.MeshStandardMaterial({emissive: 0xffffd0, color: 0x999999,roughness: 1,metalness: 0.2}),
  new THREE.MeshStandardMaterial({emissive: 0xffffd0, color: 0x999999,roughness: 1,metalness: 0.2}),
  new THREE.MeshStandardMaterial({emissive: 0xffffd0, color: 0x999999,roughness: 1,metalness: 0.2}),
  new THREE.MeshStandardMaterial({emissive: 0xffffd0, color: 0x999999,roughness: 1,metalness: 0.2}),
  new THREE.MeshStandardMaterial({emissive: 0xffffd0, color: 0x999999,roughness: 1,metalness: 0.2}),
  new THREE.MeshStandardMaterial({emissive: 0xffffd0, color: 0x999999,roughness: 1,metalness: 0.2})
];

//ambience lamp light ON
var lamplight = new THREE.Mesh(lamplightgeometry, lamplightmaterial);
lamplight.position.set(-40, 30, 10);
scene.add(lamplight);
//ambience lamp light OFF
var lamplightoff = new THREE.Mesh(lamplightgeometry, lamplightmaterialOff);
lamplightoff.position.set(-40, 30, 10);
//scene.add(lamplightoff);


//left lamp light
var lamplight1 = new THREE.Mesh(lamplightgeometry, lamplightmaterial);
lamplight1.position.set(40, 15, -20);
//left lamp light OFF
var lamplight1off = new THREE.Mesh(lamplightgeometry, lamplightmaterialOff);
lamplight1off.position.set(40, 15, -20);
scene.add(lamplight1off);


//right lamp light
var lamplight2 = new THREE.Mesh(lamplightgeometry, lamplightmaterial);
lamplight2.position.set(40, 15, 20);
//right lamp light OFF
var lamplight2off = new THREE.Mesh(lamplightgeometry, lamplightmaterialOff);
lamplight2off.position.set(40, 15, 20);
scene.add(lamplight2off);
/************** LAMP ENDS **************/



/************** DESK STARTS *************/
var deskLength = 10;
var deskWidth = 15;
var deskHeight = 10;

var deskgeometry = new THREE.BoxBufferGeometry(deskLength, deskHeight, deskWidth);

var deskmaterial = [
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/Texture_table3.jpg')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/Texture_table3_front.jpg')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/Texture_table3.jpg')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/Texture_table3.jpg')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/Texture_table3.jpg')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/Texture_table3.jpg')})
];

var desk1 = new THREE.Mesh(deskgeometry, deskmaterial);
desk1.position.set(35, 5, -20);
scene.add(desk1);

var desk2 = new THREE.Mesh(deskgeometry, deskmaterial);
desk2.position.set(35, 5, 20);
scene.add(desk2);
/************** DESK ENDS **************/


/************** DOOR STARTS *************/
var doorLength = 15;
var doorWidth = 1;
var doorHeight = 19;

var door1Length = 1;
var door1Width = 15;

var doorState = 1;

var doorgeometry = new THREE.BoxBufferGeometry(doorLength, doorHeight, doorWidth);
var door1geometry = new THREE.BoxBufferGeometry(door1Length, doorHeight, door1Width);

var doormaterial = [
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/door.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/door.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/door.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/door.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/door.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/door.png')})
];
var door1material = [
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/door_open.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/door_open.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/door_open.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/door_open.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/door_open.png')}),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF,roughness: 0.5,metalness: 0.4, map: new THREE.TextureLoader().load('./textures/door_open.png')})
];
//closed door
var door = new THREE.Mesh(doorgeometry, doormaterial);
door.position.set(-32, 9.5, 80);
scene.add(door);

//open door
var door1 = new THREE.Mesh(door1geometry, door1material);
door1.position.set(-39.5, 9.5, 73);

/************** DOOR ENDS **************/


// Initialize Three.js components
//const scene = new THREE.Scene();
//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//const renderer = new THREE.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);


/***********************TV STARTS***********************/
document.body.appendChild(renderer.domElement);

// Load textures
const textureLoader1 = new THREE.TextureLoader();
const texturePaths1 = [
    'textures/tv_animation/IMG_4597.PNG', 'textures/tv_animation/IMG_4598.PNG', 'textures/tv_animation/IMG_4599.PNG',
    'textures/tv_animation/IMG_4600.PNG','textures/tv_animation/IMG_4601.PNG','textures/tv_animation/IMG_4602.PNG',
    'textures/tv_animation/IMG_4603.PNG','textures/tv_animation/IMG_4604.PNG','textures/tv_animation/IMG_4605.PNG',
    'textures/tv_animation/IMG_4606.PNG','textures/tv_animation/IMG_4607.PNG','textures/tv_animation/IMG_4608.PNG',
    'textures/tv_animation/IMG_4609.PNG','textures/tv_animation/IMG_4610.PNG','textures/tv_animation/IMG_4611.PNG',
    'textures/tv_animation/IMG_4612.PNG','textures/tv_animation/IMG_4613.PNG','textures/tv_animation/IMG_4614.PNG',
    'textures/tv_animation/IMG_4615.PNG','textures/tv_animation/IMG_4616.PNG','textures/tv_animation/IMG_4617.PNG',
    'textures/tv_animation/IMG_4618.PNG','textures/tv_animation/IMG_4619.PNG','textures/tv_animation/IMG_4620.PNG',
    'textures/tv_animation/IMG_4621.PNG','textures/tv_animation/IMG_4622.PNG','textures/tv_animation/IMG_4623.PNG',
    'textures/tv_animation/IMG_4624.PNG','textures/tv_animation/IMG_4625.PNG','textures/tv_animation/IMG_4626.PNG',
    'textures/tv_animation/IMG_4627.PNG','textures/tv_animation/IMG_4628.PNG','textures/tv_animation/IMG_4629.PNG',
    'textures/tv_animation/IMG_4630.PNG','textures/tv_animation/IMG_4632.PNG',
    'textures/tv_animation/IMG_4633.PNG','textures/tv_animation/IMG_4634.PNG','textures/tv_animation/IMG_4635.PNG',
    'textures/tv_animation/IMG_4636.PNG','textures/tv_animation/IMG_4637.PNG','textures/tv_animation/IMG_4638.PNG',
    'textures/tv_animation/IMG_4639.PNG','textures/tv_animation/IMG_4640.PNG','textures/tv_animation/IMG_4641.PNG',
    'textures/tv_animation/IMG_4642.PNG','textures/tv_animation/IMG_4643.PNG','textures/tv_animation/IMG_4644.PNG',
    'textures/tv_animation/IMG_4645.PNG', 'textures/tv_animation/IMG_4646.PNG', 'textures/tv_animation/IMG_4647.PNG',

]; // Paths to image frames
const textures = [];

// Load each texture and push it to the textures array
texturePaths1.forEach(path => {
    const texture = textureLoader1.load(path);
    textures.push(texture);
});

// Create TV screen geometry
const tvWidth = 30; // Adjust dimensions based on your TV model
const tvHeight = 18;
const tvDepth = 1.5;
const tvUniforms = {
  u_tv_texture: { type: 't', value: null }
};
const vertexShaderTV = `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
const fragmentShaderTV = `
uniform sampler2D u_tv_texture;
varying vec2 v_uv;
void main() {
  gl_FragColor = texture2D(u_tv_texture, v_uv);
}`

var tvState = 0;
const tvScreenGeometry = new THREE.BoxGeometry(tvWidth, tvHeight, tvDepth);
const tvScreenMaterial = new THREE.MeshBasicMaterial({ map: textures[0] });
const tvScreen2Material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./textures/tvOff2.png') });
const tvScreen3Material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./textures/tvscreen2.jpg') });

const tvScreen = new THREE.Mesh(tvScreenGeometry, tvScreenMaterial);
const tvScreen2 = new THREE.Mesh(tvScreenGeometry, tvScreen2Material);
const tvScreen3 = new THREE.Mesh(tvScreenGeometry, tvScreen3Material);

scene.add(tvScreen);
scene.add(tvScreen2);
  tvScreen.rotation.y = Math.PI / 2;
  //-38.6, (tvHeight / 3) + 10, 48
  tvScreen.position.x = -38.6;
  tvScreen.position.y = (tvHeight / 3) + 10;
  tvScreen.position.z = 0;
  
  // Animation variables
  let currentFrame = 0;
  const frameRate = 7; // Frames per second
  const frameDelay = 1000 / frameRate; // Delay in milliseconds
  
  // Animation loop
  let lastFrameTime = 0;
  function animate1(currentTime) {
      const deltaTime = currentTime - lastFrameTime;
      if (deltaTime >= frameDelay) {
        lastFrameTime = currentTime;
  
        // Update texture based on current frame
        tvScreen.material.map = textures[currentFrame];
        tvScreen.material.needsUpdate = true;
  
        // Calculate next frame index
        currentFrame = (currentFrame + 1) % textures.length;
    }
      requestAnimationFrame(animate1);
      
     
  
      renderer.render(scene, camera);
  }
  
  // Set up camera position
  //camera.position.set(0, 0, 8); // Adjust the Z-coordinate to position the camera correctly
  
  // Start the animation loop
  animate1();

  tvScreen2.rotation.y = Math.PI / 2;
  tvScreen2.position.x = -38.5;
  tvScreen2.position.y = (tvHeight / 3) + 10;
  tvScreen2.position.z = 0;

  tvScreen3.rotation.y = Math.PI / 2;
  tvScreen3.position.x = -38.4;
  tvScreen3.position.y = (tvHeight / 3) + 10;
  tvScreen3.position.z = 0;


const tvborderTexture = new THREE.TextureLoader().load("textures/tvscreen2.jpg");
tvborderTexture.wrapS = THREE.RepeatWrapping;
tvborderTexture.wrapT = THREE.RepeatWrapping;
tvborderTexture.repeat.set(1, 1);

// Create a wooden material for the border
const tvborderMaterial = new THREE.MeshStandardMaterial({
  map: tvborderTexture,
});

// Dimensions of the window and border

const tvborderWidth = 0.5;

// Create geometries for the border sides
const tvleftBorderGeometry = new THREE.BoxGeometry(tvborderWidth, 16.8 + 2 * tvborderWidth, tvDepth);
const tvrightBorderGeometry = new THREE.BoxGeometry(tvborderWidth, 16.8 + 2 * tvborderWidth, tvDepth);
const tvtopBorderGeometry = new THREE.BoxGeometry(30 + 2 * tvborderWidth, tvborderWidth, tvDepth);
const tvbottomBorderGeometry = new THREE.BoxGeometry(30 + 2 * tvborderWidth, tvborderWidth, tvDepth);
//const leftBorderGeometry2 = new THREE.PlaneGeometry(2.5, 27 + 2 * 2.5);



// Create mesh for each border side
const tvleftBorderMesh = new THREE.Mesh(tvleftBorderGeometry, tvborderMaterial);
const tvrightBorderMesh = new THREE.Mesh(tvrightBorderGeometry, tvborderMaterial);
const tvtopBorderMesh = new THREE.Mesh(tvtopBorderGeometry, tvborderMaterial);
const tvbottomBorderMesh = new THREE.Mesh(tvbottomBorderGeometry, tvborderMaterial);



// Position the border meshes around the tv
tvleftBorderMesh.position.set(-38.6, 16, 62.95-48);
tvrightBorderMesh.position.set(-38.6, 16, 32.95-48);
tvtopBorderMesh.position.set(-38.6, 25, 47.95-48);
tvbottomBorderMesh.position.set(-38.6, 7, 47.95-48);


// Add border meshes to the scene
scene.add(tvleftBorderMesh);
scene.add(tvrightBorderMesh);
scene.add(tvtopBorderMesh);
scene.add(tvbottomBorderMesh);
tvleftBorderMesh.rotation.y = Math.PI / 2;
tvrightBorderMesh.rotation.y = Math.PI / 2;
tvtopBorderMesh.rotation.y = Math.PI / 2;
tvbottomBorderMesh.rotation.y = Math.PI / 2;
// Add border meshes to the scene
//scene.add(leftBorderMesh2);
/******************TV ENDS***************/


/***********************BED STARTS ****************/
// Bed dimensions (similar to the table size)
const bedWidth = 40; // Width of the bed
const bedLength = 20; // Length of the bed
const bedHeight = 8; // Height of the bed

// Texture for the bed
const bedTexture = new THREE.TextureLoader().load("textures/bedsheet5.png");
bedTexture.wrapS = THREE.RepeatWrapping;
bedTexture.wrapT = THREE.RepeatWrapping;
bedTexture.repeat.set(1, 1);
bedTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

// Bed material
const bedMaterial = new THREE.MeshStandardMaterial({
  map: bedTexture,
});

// Bed geometry
const bedGeometry = new THREE.BoxGeometry(bedWidth, bedHeight, bedLength);
const bed = new THREE.Mesh(bedGeometry, bedMaterial);

// Position the bed
bed.position.set(25, bedHeight/2, 0); // Adjust the '30' value to position the bed along the right wall.

scene.add(bed);

// Wooden headboard geometry
const headboardWidth = 21;
const headboardHeight = 16;
const headboardDepth = 1;
const headboardTexture = new THREE.TextureLoader().load("textures/cothead2.png");
headboardTexture.wrapS = THREE.RepeatWrapping;
headboardTexture.wrapT = THREE.RepeatWrapping;
headboardTexture.repeat.set(1, 1);
headboardTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

const headboardMaterial = new THREE.MeshStandardMaterial({
  map: headboardTexture,
});

const headboardGeometry = new THREE.BoxGeometry(headboardWidth, headboardHeight, headboardDepth);
const headboard = new THREE.Mesh(headboardGeometry, headboardMaterial);

// Position the headboard and attach it to the right wall
headboard.position.set(38.6, headboardHeight / 2, 0);
headboard.rotation.y = THREE.MathUtils.degToRad(-90);
scene.add(headboard);

/***********************BED ENDS  *********************/


/******************SOFA STARTS***************/
const sofaWidth = 8; // Width of the bed
const sofaLength = 10; // Length of the bed
const sofaHeight = 8; // Height of the bed

// Texture for the bed
const sofaTexture = new THREE.TextureLoader().load("textures/sofap.png");
sofaTexture.wrapS = THREE.RepeatWrapping;
sofaTexture.wrapT = THREE.RepeatWrapping;
sofaTexture.repeat.set(1, 1);
sofaTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

// Bed material
const sofaMaterial = new THREE.MeshStandardMaterial({
  map: sofaTexture,
});

// Bed geometry
const sofaGeometry = new THREE.BoxGeometry(sofaWidth, sofaHeight, sofaLength);
const sofa = new THREE.Mesh(sofaGeometry, sofaMaterial);

// Position the bed
sofa.position.set(-35, bedHeight / 2, -44); 
//sofa.rotation.z = -Math.PI / 2;// Adjust the '30' value to position the bed along the right wall.

scene.add(sofa);
const sofaGeometry2 = new THREE.BoxGeometry(7, sofaHeight, sofaLength);
const sofa2 = new THREE.Mesh(sofaGeometry, sofaMaterial);

// Position the bed
sofa2.position.set(-35, bedHeight / 2, -32); // Adjust the '30' value to position the bed along the right wall.

scene.add(sofa2);
const sofaGeometry3 = new THREE.BoxGeometry(sofaWidth, 4, 3);
const sofa3 = new THREE.Mesh(sofaGeometry3, sofaMaterial);

// Position the bed
sofa3.position.set(-35, bedHeight /8, -37.5); // Adjust the '30' value to position the bed along the right wall.

scene.add(sofa3);


// Wooden headboard geometry
const sofaheadboardWidth = 22.5;
const sofaheadboardHeight = 14;
const sofaheadboardDepth = 1;
const sofaheadboardTexture = new THREE.TextureLoader().load("textures/sofap.png");
sofaheadboardTexture.wrapS = THREE.RepeatWrapping;
sofaheadboardTexture.wrapT = THREE.RepeatWrapping;
sofaheadboardTexture.repeat.set(1, 1);
sofaheadboardTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

const sofaheadboardMaterial = new THREE.MeshStandardMaterial({
  map: sofaheadboardTexture,
});

const sofaheadboardGeometry = new THREE.BoxGeometry(sofaheadboardWidth, sofaheadboardHeight, sofaheadboardDepth);
const sofaheadboard = new THREE.Mesh(sofaheadboardGeometry, sofaheadboardMaterial);

// Position the headboard and attach it to the right wall
sofaheadboard.position.set(-38.6, headboardHeight / 2, -38);
sofaheadboard.rotation.y = THREE.MathUtils.degToRad(-90);
scene.add(sofaheadboard);




const sofatWidth = 10; // Width of the bed
const sofatLength = 8; // Length of the bed
const sofatHeight = 8; // Height of the bed

// Texture for the bed
const sofatTexture = new THREE.TextureLoader().load("textures/sofap.png");
sofatTexture.wrapS = THREE.RepeatWrapping;
sofatTexture.wrapT = THREE.RepeatWrapping;
sofatTexture.repeat.set(1, 1);
sofatTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

// Bed material
const sofatMaterial = new THREE.MeshStandardMaterial({
  map: sofatTexture,
});

// Bed geometry
const sofatGeometry = new THREE.BoxGeometry(sofatWidth, sofatHeight, sofatLength);
const sofat = new THREE.Mesh(sofatGeometry, sofatMaterial);

// Position the bed0.6, 19, -54.95
sofat.position.set(3, bedHeight / 2, 72.3); 
//sofa.rotation.z = -Math.PI / 2;// Adjust the '30' value to position the bed along the right wall.

scene.add(sofat);
const sofatGeometry2 = new THREE.BoxGeometry(7, sofatHeight, sofatLength);
const sofat2 = new THREE.Mesh(sofatGeometry, sofatMaterial);

// Position the bed
sofat2.position.set(-9, bedHeight / 2, 72.3); // Adjust the '30' value to position the bed along the right wall.

scene.add(sofat2);
const sofatGeometry3 = new THREE.BoxGeometry(3, 4, 8);
const sofat3 = new THREE.Mesh(sofatGeometry3, sofatMaterial);

// Position the bed
sofat3.position.set(-3, bedHeight /8, 72.3); // Adjust the '30' value to position the bed along the right wall.

scene.add(sofat3);


// Wooden headboard geometry
const sofatheadboardWidth = 1;
const sofatheadboardHeight = 12.5;
const sofatheadboardDepth = 22.5;
const sofatheadboardTexture = new THREE.TextureLoader().load("textures/sofap.png");
sofatheadboardTexture.wrapS = THREE.RepeatWrapping;
sofatheadboardTexture.wrapT = THREE.RepeatWrapping;
sofatheadboardTexture.repeat.set(1, 1);
sofatheadboardTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

const sofatheadboardMaterial = new THREE.MeshStandardMaterial({
  map: sofatheadboardTexture,
});

const sofatheadboardGeometry = new THREE.BoxGeometry(sofatheadboardWidth, sofatheadboardHeight, sofatheadboardDepth);
const sofatheadboard = new THREE.Mesh(sofatheadboardGeometry, sofatheadboardMaterial);

// Position the headboard and attach it to the right wall
sofatheadboard.position.set(-3.6, headboardHeight / 2, 76);
sofatheadboard.rotation.y = THREE.MathUtils.degToRad(90);
scene.add(sofatheadboard);
/*************************SOFA ENDS************************/


/*********************** CARPET STARTS ****************/
const carpetTexture = new THREE.TextureLoader().load("textures/bedheadwall.jpg");
carpetTexture.wrapS = THREE.RepeatWrapping;
carpetTexture.wrapT = THREE.RepeatWrapping;
carpetTexture.repeat.set(1, 1); // Texture er pattern repeat koto bar korbe
carpetTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

let carpet = new THREE.PlaneGeometry(20, 40);
const carpetMaterial = new THREE.MeshStandardMaterial({
  map: carpetTexture,
});

carpet = new THREE.Mesh(carpet, carpetMaterial); //LINK Geometry with Texture picture
carpet.rotation.x = (-90 * Math.PI) / 180;
carpet.position.z = 0;
carpet.position.y = 1;
carpet.position.x = -6;

scene.add(carpet);
/*********************** CARTET ENDS  *****************/


/***************** WALLS ART STARTS ******************/
const wallArtTexture = new THREE.TextureLoader().load("textures/wallart3.jpg");
wallArtTexture.wrapS = THREE.RepeatWrapping;
wallArtTexture.wrapT = THREE.RepeatWrapping;
wallArtTexture.repeat.set(1, 1); // Texture er pattern repeat koto bar korbe
//?
wallArtTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();


//WALL ART ON LEFT WALL
//CREATING MESH WITH GEOMETRY 
let wallArt = new THREE.PlaneGeometry(35, 15);
const wallArtMaterial = new THREE.MeshStandardMaterial({
  map: wallArtTexture,
});

wallArt = new THREE.Mesh(wallArt, wallArtMaterial); //LINK Geometry with Texture picture
// MESH GEOMETRY POSIITON AND ROTATIONS 
wallArt.rotation.y = (90 * Math.PI) / 180;
wallArt.position.z = 40;
wallArt.position.y = 18;
wallArt.position.x = -39;
wallArt.receiveShadow = true; //default

//ADD geometry to scene
scene.add(wallArt);
/***************** WALLS ART ENDS ******************/



/***************** WALLS STARTS ******************/
const wallTexture = new THREE.TextureLoader().load("textures/wall3.jpg");
const wallTextureBedhead = new THREE.TextureLoader().load("textures/walldyes4.jpg");//add
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set(4, 4); 
wallTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

wallTextureBedhead.wrapS = THREE.RepeatWrapping;//add
wallTextureBedhead.wrapT = THREE.RepeatWrapping;//add
wallTextureBedhead.repeat.set(4, 4);//add
wallTextureBedhead.anisotropy = renderer.capabilities.getMaxAnisotropy();//add

const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });
const wallMaterialBedhead = new THREE.MeshStandardMaterial({ map: wallTextureBedhead });

// Create wall geometries
let wall = new THREE.PlaneGeometry(80, 80);
let wall2 = new THREE.PlaneGeometry(160, 80);
let wall3 = new THREE.PlaneGeometry(160, 80);
let wall4 = new THREE.PlaneGeometry(65, 40);
let wall4_1 = new THREE.PlaneGeometry(90, 22);

// Apply materials to wall faces
wall = new THREE.Mesh(wall, wallMaterial);
wall2 = new THREE.Mesh(wall2, wallMaterial);
wall3 = new THREE.Mesh(wall3, wallMaterialBedhead); // Apply the unique material to the bedhead wall
wall4 = new THREE.Mesh(wall4, wallMaterial);
wall4_1 = new THREE.Mesh(wall4_1, wallMaterial);

// Set positions and rotations for each wall
wall.rotation.x = (0 * Math.PI) / 180;
wall.position.z = -60;
wall.receiveShadow = true;

wall2.rotation.y = (90 * Math.PI) / 180;
wall2.position.x = -40;
wall2.receiveShadow = true;

wall3.rotation.y = (-135 * Math.PI) / 270;
wall3.position.x = 40;
wall3.position.z = 20;
wall3.receiveShadow = true;

wall4.rotation.x = (0 * Math.PI) / 180;
wall4.rotation.y = (-180 * Math.PI) / 180;
wall4.position.z = 80;
wall4.position.x = 8;
wall4.receiveShadow = true;

wall4_1.rotation.x = (0 * Math.PI) / 180;
wall4_1.rotation.y = (-180 * Math.PI) / 180;
wall4_1.position.z = 80;
wall4_1.position.y = 30;
wall4_1.position.x = 5;
wall4_1.receiveShadow = true;

// Add walls to the scene
scene.add(wall);
scene.add(wall2);
scene.add(wall3);
scene.add(wall4);
scene.add(wall4_1);
/***************** WALLS ENDS ******************/


/*********WINDOW STARTS***********/

const windowWidth = 68;
const windowHeight = 32;
document.body.appendChild(renderer.domElement);

// Load textures
const textureLoader = new THREE.TextureLoader();
const texturePaths = [
  'textures/sea_animation/IMG_4523.PNG', 'textures/sea_animation/IMG_4524.PNG', 'textures/sea_animation/IMG_4525.PNG',
  'textures/sea_animation/IMG_4526.PNG', 'textures/sea_animation/IMG_4527.PNG', 'textures/sea_animation/IMG_4528.PNG',
  'textures/sea_animation/IMG_4529.PNG', 'textures/sea_animation/IMG_4530.PNG', 'textures/sea_animation/IMG_4531.PNG',
   'textures/sea_animation/IMG_4532.PNG', 'textures/sea_animation/IMG_4533.PNG', 'textures/sea_animation/IMG_4534.PNG',
   'textures/sea_animation/IMG_4535.PNG', 'textures/sea_animation/IMG_4536.PNG', 'textures/sea_animation/IMG_4537.PNG',
   'textures/sea_animation/IMG_4538.PNG', 'textures/sea_animation/IMG_4539.PNG', 'textures/sea_animation/IMG_4540.PNG',
   'textures/sea_animation/IMG_4541.PNG', 'textures/sea_animation/IMG_4542.PNG', 'textures/sea_animation/IMG_4543.PNG',
   'textures/sea_animation/IMG_4544.PNG', 'textures/sea_animation/IMG_4545.PNG', 'textures/sea_animation/IMG_4546.PNG',
   'textures/sea_animation/IMG_4547.PNG', 'textures/sea_animation/IMG_4548.PNG', 'textures/sea_animation/IMG_4549.PNG',
   'textures/sea_animation/IMG_4550.PNG', 'textures/sea_animation/IMG_4551.PNG', 'textures/sea_animation/IMG_4552.PNG',
   'textures/sea_animation/IMG_4553.PNG', 'textures/sea_animation/IMG_4554.PNG',
  // Add more texture paths here as needed
];
const windowGlassTextures = texturePaths.map(path => textureLoader.load(path));

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});


// Shader uniforms
const suniforms = {
  u_texture_globe: { type: 't', value: null }
};

// Create the geometry and material for the windowGlassGeometry
const windowGlassGeometry = new THREE.PlaneGeometry(windowWidth - 0.1, windowHeight - 0.1);
const initialTexture = windowGlassTextures[0];
initialTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
suniforms.u_texture_globe.value = initialTexture;

const windowGlassMaterial = new THREE.ShaderMaterial({
  uniforms: suniforms,
  vertexShader: vertexShaderShowPiece,
  fragmentShader: fragmantShaderShowPiece,
  transparent: true,
  opacity: 0.7,
  metalness: 0.1,
  roughness: 0.8,
});

const windowGlass = new THREE.Mesh(windowGlassGeometry, windowGlassMaterial);
windowGlass.position.set(0.6, 17, -59.5);
scene.add(windowGlass);
//const windowGlass2 = new THREE.Mesh(windowGlassGeometry, windowGlassMaterial);
//windowGlass2.position.set(18, 19, -54.95);
//scene.add(windowGlass2);

// Animation loop
let windowAnimationIndex = 0;
const animateWindowAnimation = (delay) => {
  windowAnimationIndex = (windowAnimationIndex + 1) % windowGlassTextures.length;
  const texture = windowGlassTextures[windowAnimationIndex];
  suniforms.u_texture_globe.value = texture;

  //requestAnimationFrame(animateWindowAnimation);
  setTimeout(() => animateWindowAnimation(delay), delay);
  renderer.render(scene, camera);
};
const animationDelay = 110; 

// Start the animation loop
animateWindowAnimation(animationDelay);

// Load the wooden texture
const woodenTexture = new THREE.TextureLoader().load("textures/thaiglasstexture.png");
woodenTexture.wrapS = THREE.RepeatWrapping;
woodenTexture.wrapT = THREE.RepeatWrapping;
woodenTexture.repeat.set(1, 1);

// Create a wooden material for the border
const woodenMaterial = new THREE.MeshStandardMaterial({
  map: woodenTexture,
});

// Dimensions of the window and border

const borderWidth = 1.8;

// Create geometries for the border sides
const leftBorderGeometry = new THREE.PlaneGeometry(borderWidth, 30.5 + 2 * borderWidth);
const rightBorderGeometry = new THREE.PlaneGeometry(borderWidth, 30.5 + 2 * borderWidth);
const topBorderGeometry = new THREE.PlaneGeometry(67 + 2 * borderWidth, borderWidth);
const bottomBorderGeometry = new THREE.PlaneGeometry(66 + 2 * borderWidth, borderWidth);
const leftBorderGeometry2 = new THREE.PlaneGeometry(2.5, 27 + 1.5 * 2.5);


// Create mesh for each border side
const leftBorderMesh = new THREE.Mesh(leftBorderGeometry, woodenMaterial);
const rightBorderMesh = new THREE.Mesh(rightBorderGeometry, woodenMaterial);
const topBorderMesh = new THREE.Mesh(topBorderGeometry, woodenMaterial);
const bottomBorderMesh = new THREE.Mesh(bottomBorderGeometry, woodenMaterial);
const leftBorderMesh2 = new THREE.Mesh(leftBorderGeometry2, woodenMaterial);


// Position the border meshes around the window
leftBorderMesh.position.set(-34, 17, -59);
rightBorderMesh.position.set(35.6, 17, -59);
topBorderMesh.position.set(1, 33, -59);
bottomBorderMesh.position.set(0, 0.5, -59);
leftBorderMesh2.position.set(1, 16.7, -58.9);

// Add border meshes to the scene
scene.add(leftBorderMesh);
scene.add(rightBorderMesh);
scene.add(topBorderMesh);
scene.add(bottomBorderMesh);
scene.add(leftBorderMesh2);

document.body.appendChild(renderer.domElement);

/************WINDOW ENDS***************/


/***************** TABLE STARTS ******************/
///TABLE TOP SIDE
//TABLE TEXTURES
const tableTextures = [
  "textures/tabletop.png",
  "textures/tabletop.png",
  "textures/tabletop.png",
  "textures/tabletop.png",
  "textures/tabletop.png",
  "textures/tabletop.png",
  "textures/tabletop.png"
];
let tableTextureNo = 6;
let tableTexture = new THREE.TextureLoader().load(
  tableTextures[tableTextureNo]
);
tableTexture.wrapS = THREE.RepeatWrapping;
tableTexture.wrapT = THREE.RepeatWrapping;
tableTexture.repeat.set(1, 1);
tableTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
const tableMaterial = new THREE.MeshStandardMaterial({
  map: tableTexture,
});

///TABLE TOP SIDE
let tableTop = new THREE.BoxGeometry(24, 0.4, 14);
tableTop = new THREE.Mesh(tableTop, tableMaterial);
tableTop.position.set(25, 10, -48);// position of table
tableTop.castShadow = true;
scene.add(tableTop);

///TABLE LEGS SUPPORT
//RIGHT LEG
let tableBottomRight = new THREE.BoxGeometry(0.6, 10, 13.9);
tableBottomRight = new THREE.Mesh(tableBottomRight, tableMaterial);
tableBottomRight.position.set(11, -5, 0); // position of right stand of table
tableBottomRight.castShadow = true;
tableTop.add(tableBottomRight);
//LEFT LEG
let tableBottomLeft = new THREE.BoxGeometry(0.6, 10, 13.98);
tableBottomLeft = new THREE.Mesh(tableBottomLeft, tableMaterial);
tableBottomLeft.position.set(-11, -5, 0); // position of left stand of table
tableBottomLeft.castShadow = true;
tableTop.add(tableBottomLeft);
/***************** TABLE ENDS ******************/



/***************** CHAIR STARTS ******************/
//CHAIR BASE/SEAT
const seatShape = new THREE.Shape();
seatShape.moveTo(0, 0);
// CHAIR BASE/SEAT SHAPE SQUARE
seatShape.lineTo(0, 6);
seatShape.lineTo(4, 6);
seatShape.lineTo(4, 0);
// CHAIR BASE/SEAT SHAPE SETTINGS
const extrudeSettings = {
  steps: 6,
  depth: 0.2,
  bevelEnabled: true,
  bevelThickness: 0.4,
  bevelSize: .1,
  bevelOffset: 1,
  bevelSegments: 5,
};
const geometry = new THREE.ExtrudeGeometry(seatShape, extrudeSettings);
var chairSeatTexture = new THREE.TextureLoader().load(
  "textures/Texture_Chair.jpg"
);
chairSeatTexture.wrapS = THREE.RepeatWrapping;
chairSeatTexture.wrapT = THREE.RepeatWrapping;
chairSeatTexture.repeat.set(0.1, 0.1);
chairSeatTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
const chairSeatMaterial = new THREE.MeshStandardMaterial({
  map: chairSeatTexture,
});
const seatPlane = new THREE.Mesh(geometry, chairSeatMaterial);
seatPlane.position.set(30, 7, -40); // chair er position
seatPlane.rotation.x = THREE.MathUtils.degToRad(90);
seatPlane.rotation.z = THREE.MathUtils.degToRad(180);
seatPlane.castShadow = true;
scene.add(seatPlane);
// CHAIR LEGS
function createChairSupport(posX, posY, posZ, angle) {
  let chairSupportTexture = new THREE.TextureLoader().load(
    "textures/Texture_ChairLeg.jpg"
  );
  chairSupportTexture.wrapS = THREE.RepeatWrapping;
  chairSupportTexture.wrapT = THREE.RepeatWrapping;
  chairSupportTexture.repeat.set(1, 1);
  chairSupportTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const chairSupportMat = new THREE.MeshStandardMaterial({
    map: chairSupportTexture,
    side: THREE.DoubleSide,
  });
  var chairSupport = new THREE.CylinderGeometry(0.3, 0.3, 7, 36);
  chairSupport = new THREE.Mesh(chairSupport, chairSupportMat);
  chairSupport.position.set(posX, posY, posZ);
  chairSupport.rotation.x = THREE.MathUtils.degToRad(angle);
  chairSupport.castShadow = true;
  return chairSupport;
}
// CHAIR LEGS GEOMETRY

//back left
seatPlane.add(createChairSupport(4.6, 0, 3.6, -85));
//back right
seatPlane.add(createChairSupport(-0.6, 0, 3.6, -85));
//front left
seatPlane.add(createChairSupport(4.7, 6, 3.6, -97));
//front reight
seatPlane.add(createChairSupport(-.4, 6, 3.6, -97));

//CHAIR BACK / SUPPORT
var chairBackSupport1 = new THREE.BoxGeometry(5.7, 0.3, 8);
var chairBackTexture = new THREE.TextureLoader().load(
  "textures/Texture_Chair.jpg"
);
chairBackTexture.wrapS = THREE.RepeatWrapping;
chairBackTexture.wrapT = THREE.RepeatWrapping;
chairBackTexture.repeat.set(0.8, 0.8);
chairBackTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
const chairBackMaterial = new THREE.MeshStandardMaterial({
  map: chairBackTexture,
});
chairBackSupport1 = new THREE.Mesh(chairBackSupport1, chairBackMaterial);
chairBackSupport1.position.set(2, -1.7, -4);
chairBackSupport1.castShadow = true;
chairBackSupport1.rotation.x = THREE.MathUtils.degToRad(-10);
seatPlane.add(chairBackSupport1);
/***************** CHAIR ENDS ******************/



window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

/**************ANIMATION************* */ 
const animate = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(animate); // automatically creates a loop : makes renderer draw new scenes , RR 60fps
};

animate(); 

// calls created loop for animation

var clock = new THREE.Clock(); // time nicche

function lightMove() {
  // time er shate shate point light ghurbe 
  const time = clock.getElapsedTime();

  pointLight.position.x = Math.sin(time) * 30;
  pointLight.position.y = 90;
  pointLight.position.z = Math.cos(time) * 30;

  requestAnimationFrame(lightMove);
}

//lightMove();



// CAMERA MOVE ER CALCULATIONS
function moveCamera() {
  camera.position.x = Math.sin(cameraRotationVar) * 27;
  camera.position.y = cameraPositionY;
  camera.position.z = Math.cos(cameraRotationVar) * 27;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}

document.onkeydown = checkKey;

// KEY BAORD INTERACTION MOVEMENT FOR CAMERA ROATION INSIDE ROOM
function checkKey(e) {
  if (e.keyCode == "38") {
    // up key 
    cameraPositionY += 1;
    if (cameraPositionY > 90) { // up key diye max 90 uporeh gele set: 90
      cameraPositionY = 90;
    }
    moveCamera();
  } else if (e.keyCode == "40") { 
    // down arrow
    cameraPositionY -= 1;
    if (cameraPositionY < 5) { // down key diye max 5 uporeh gele set: 5
      cameraPositionY = 5;
    }
    moveCamera();
  } else if (e.keyCode == "37") {
    // left arrow
    cameraRotationVar += 0.09;
    moveCamera();
  } else if (e.keyCode == "39") {
    // right arrow
    cameraRotationVar -= 0.09;
    moveCamera();
  }
  else if (e.keyCode == "87") {
    // w
    if (camera.position.z <= -55) { // w key diye max 55 shamne jabe
      camera.position.z = -55;
    }
    camera.position.z -= 1;
  } else if (e.keyCode == "83") {
    // s
    if (camera.position.z >= 65) { // s key diye max 65 piche jabe
      camera.position.z = 65;
    }
    camera.position.z += 1;
  } else if (e.keyCode == "65") {
    // a
    if (camera.position.x <= -38) { // up key diye max 38 dan e jabe
      camera.position.x = -38;
    }
    camera.position.x -= 1;
  } else if (e.keyCode == "68") {
    // d
    if (camera.position.x >= 38) { // up key diye max 38 dan e jabe
      camera.position.x = 38;
    }
    camera.position.x += 1;
  } else if (e.keyCode == "90") {
    // z
    if (camera.position.y >= 50) { // z key diye max 50 upore jabe
      camera.position.y = 50;
    }
    camera.position.y += 1;
  } else if (e.keyCode == "88") {
    // x
    if (camera.position.y <= 5) { // x key diye max 5 niche jabe
      camera.position.y = 5;
    }
    camera.position.y -= 1;
  } 
  else if (e.keyCode == "74") {
    // j
    if (ambientlightState == 0) {
      scene.add(ambientLight);
      scene.add(lamplight);
      scene.remove(lamplightoff);
      ambientlightState += 1;
    }
    else if (ambientlightState == 1) {
      scene.remove(ambientLight);
      scene.add(lamplightoff);
      scene.remove(lamplight);
      ambientlightState -= 1;
    }
  } else if (e.keyCode == "75") {
    // k
    if (leftlampState == 0) {
      scene.add(pointLight1);
      scene.add(lamplight1);
      scene.remove(lamplight1off);
      leftlampState += 1;
    }
    else if (leftlampState == 1) {
      scene.remove(pointLight1);
      scene.add(lamplight1off);
      scene.remove(lamplight1);
      leftlampState -= 1;
    }
  } else if (e.keyCode == "76") {
    // l
    if (rightlampState == 0) {
      scene.add(pointLight2);
      scene.add(lamplight2);
      scene.remove(lamplight2off);
      rightlampState += 1;
    }
    else if (rightlampState == 1) {
      scene.remove(pointLight2);
      scene.add(lamplight2off);
      scene.remove(lamplight2);
      rightlampState -= 1;
    }
  }
  else if (e.keyCode == "67") { 
    // c
    if(cnt_closet==0) {
      scene.remove(closet);
      scene.add(closet1);
      scene.add(closet2);
      scene.add(closet3);
      cnt_closet+=1;
      renderer.render(scene, camera);
    }
    else if(cnt_closet == 1) {
      scene.remove(closet1);
      scene.remove(closet2);
      scene.remove(closet3);
      scene.add(closet);
      cnt_closet-=1;
      renderer.render(scene, camera); 
    }
  }
  else if (e.keyCode == "73") {
    // i
    if(doorState == 0) {
      scene.remove(door);
      scene.add(door1);
      doorState += 1;
      renderer.render(scene, camera);
    }
    else if(doorState == 1) {
      scene.remove(door1);
      scene.add(door);
      doorState -= 1;
      renderer.render(scene, camera); 
    }
  }
   else if (e.keyCode == "84") {
    // t
    if(tvState == 0) {
      scene.remove(tvScreen2);
      tvState = 1;
    }
    else if(tvState == 1) {
      scene.add(tvScreen3);
      tvState = 2;
    }
    else if(tvState == 2) {
      scene.remove(tvScreen3);
      scene.add(tvScreen2)     
      tvState = 0;
    }
    
    /*tableTextureNo += 1;
    tableTextureNo = tableTextureNo % 7;

    tableTexture.dispose();
    tableTexture = new THREE.TextureLoader().load(tableTextures[tableTextureNo]);

    tableTexture.wrapS = THREE.RepeatWrapping;
    tableTexture.wrapT = THREE.RepeatWrapping;
    tableTexture.repeat.set(1, 1);
    tableTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    tableMaterial.map = tableTexture;
    uniforms["u_texture"].value = tableTexture;*/
  }

}
/***************** CAMERA ENDS ******************/




/***************** MOUSE CLICK TABLE TEXTURE CHANGING STARTS******************/
addEventListener("click", (event) => {
  //?
  

});
/***************** TABLE TEXTURE CHANGING ENDS******************/
