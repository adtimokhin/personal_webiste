import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

// Constants
const INITIAL_CAMERA_HEIGHT = 30;
const CHARACTER_STEP_SIZE = 0.5

// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Setting initial camera position
camera.position.setY(INITIAL_CAMERA_HEIGHT);
camera.rotateX(-Math.PI / 4);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

// Objects

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: 0x4f421e })
);

ground.rotateX((-2 * Math.PI) / 5);
const groundParameters = ground.geometry.parameters;

scene.add(ground);

// Character
const character = new THREE.Mesh(
  new THREE.BoxGeometry(3, 5, 2),
  new THREE.MeshStandardMaterial({ color: 0x14c6c9 })
);

const characterParameters = character.geometry.parameters;

// Setting initial position of the character on the ground (dependent on position of the ground object)
character.position.x =
  ground.position.x -
  groundParameters.width / 2 +
  characterParameters.width / 2;

character.position.z =
  ground.position.z -
  (groundParameters.width / 2) * -Math.sin(ground.rotation.x) +
  characterParameters.width / 2;

character.position.y =
  -character.position.z * Math.tan(ground.rotation.x + Math.PI / 2) +
  characterParameters.height / 2;

scene.add(character);


// Lights
const pointlight = new THREE.PointLight(0xffffff); // A-la "The Sun"
pointlight.position.set(100, 100, 100);
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointlight, ambientLight);



// Rotating Camera Event
var previousClientY = 0;
var previousClientX = 0;

var movingUp = false;
var movingRight = false;
var movingDown = false;
var movingLeft = false;

function moveObjectsAndCamera(event) {
  const keyCode = event.keyCode;

  if (keyCode === 37 || keyCode === 65) {
    // Left
    movingLeft = true;
  }

  if (keyCode === 38 || keyCode === 87) {
    // Up
    movingUp = true;
  }

  if (keyCode === 40 || keyCode === 83) {
    // Down
    movingDown = true;
  }

  if (keyCode === 39 || keyCode === 68) {
    // Right
    movingRight = true;
  }
}

function stopObjectsAndCamera(event) {
  const keyCode = event.keyCode;

  if (keyCode === 37 || keyCode === 65) {
    // Left
    movingLeft = false;
  }

  if (keyCode === 38 || keyCode === 87) {
    // Up
    movingUp = false;
  }

  if (keyCode === 40 || keyCode === 83) {
    // Down
    movingDown = false;
  }

  if (keyCode === 39 || keyCode === 68) {
    // Right
    movingRight = false;
  }
}

function updateCharacterPosition() {
  if (movingLeft) {
    // Left
    character.position.x -= CHARACTER_STEP_SIZE;
  }

  if (movingUp) {
    // Up
    character.position.z -= CHARACTER_STEP_SIZE;
    character.position.y =
      -character.position.z * Math.tan(ground.rotation.x + Math.PI / 2) +
      characterParameters.height / 2;
  }

  if (movingDown) {
    // Down
    character.position.z += CHARACTER_STEP_SIZE;
    character.position.y =
      -character.position.z * Math.tan(ground.rotation.x + Math.PI / 2) +
      characterParameters.height / 2;
  }

  if (movingRight) {
    // Right
    character.position.x += CHARACTER_STEP_SIZE;
  }
}

function centreCamera() {
  gsap.to(camera.position, {
    x: character.position.x,
    y:
      INITIAL_CAMERA_HEIGHT -
      camera.position.z * Math.tan(ground.rotation.x + Math.PI / 2),
    z: character.position.z + 30,
    duration: 0.5,
  });
}

document.onkeydown = moveObjectsAndCamera;
document.onkeyup = stopObjectsAndCamera;

// Helper
const size = 1000;
const divisions = 1000;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

// animate loop
function animate() {
  requestAnimationFrame(animate);
  centreCamera();
  updateCharacterPosition();
  renderer.render(scene, camera);
}

animate();
