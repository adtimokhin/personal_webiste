import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Constants
const NUMBER_OF_CLOUDS = 40;
const SPHERES_PER_CLOUD = 15;
// Setup
const scene = new THREE.Scene();

scene.background = new THREE.Color(0xd1ffff);

const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 35;
camera.position.y = 5;

// Renderer
const renderer = new THREE.WebGLRenderer();
document.querySelector("#sky-bg-canvas").appendChild(renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

// Objects

// Creating and animating clouds
function createCloud() {
  // Cloud parameters
  const x = THREE.MathUtils.randFloatSpread(100) - 100;
  const y = Math.max(THREE.MathUtils.randFloatSpread(100), -3);
  const z = THREE.MathUtils.randFloatSpread(100);

  const animationDuration = Math.random() * 100 + 50;
  const randomValue = Math.random() * 10;

  for (var i = 0; i < SPHERES_PER_CLOUD; i++) {
    const radius = Math.random() * 3 + 1;
    const sphereGeometry = new THREE.SphereGeometry(radius);
    const cloudMaterial = new THREE.MeshStandardMaterial({ color: 0xf1f1f1 });

    // Setting random position to the cloud
    const sphereX = x + THREE.MathUtils.randFloatSpread(10);
    const sphereY = y + Math.random() * 7;
    const sphereZ = z + THREE.MathUtils.randFloatSpread(3);

    const sphere = new THREE.Mesh(sphereGeometry, cloudMaterial);
    sphere.position.set(sphereX, sphereY, sphereZ);
    scene.add(sphere);

    // Animating a sphere
    gsap.to(sphere.position, {
      duration: animationDuration,
      x: sphere.position.x + 200,
      y: sphere.position.y + randomValue,
      z: sphere.position.z + 50,
    });
  }

  // return cloud;
}

// Generating clouds
for (var i = 0; i < NUMBER_OF_CLOUDS; i++) {
  createCloud();
}

// Lights
const pointlight = new THREE.PointLight(0xffffff); // A-la "The Sun"
pointlight.position.set(100, 100, 100);
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointlight, ambientLight);

// const controls = new OrbitControls(camera, renderer.domElement);
var lastScrollTop = 0;
function moveCamera() {
  var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
  if (st > lastScrollTop) {
    camera.position.x -= 0.1;
    camera.position.y -= 0.4;

    // if (camera.position.y > 0){
    // window.scroll(0, lastScrollTop);
    // }
  } else {
    camera.position.x += 0.1;
    camera.position.y += 0.4;
  }
  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}

// Actions
document.onscroll = moveCamera;

// Clock

const clock = new THREE.Clock();
var delta = 0;

// animate loop
function animate() {
  requestAnimationFrame(animate);

  delta += clock.getDelta();

  if (delta > 10) {
    // Generating clouds
    for (var i = 0; i < NUMBER_OF_CLOUDS; i++) {
      createCloud();
    }
    delta = 0;
  }

  // controls.update();
  renderer.render(scene, camera);
}

animate();
