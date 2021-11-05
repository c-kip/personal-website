import * as THREE from "../modules/build/three.module.js";

// Main function
function main() {
    console.log("Started three-rendering.js");
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});

    // Create a camera
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1; // clipping close boundary
    const far = 5; // clipping far boundary (only renders in clipping range)
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // Move the camera back slightly
    camera.position.z = 2;

    // Create a scene to render
    const scene = new THREE.Scene();

    // Create the geometry for a cube (box)
    const cubeWidth = 1;
    const cubeHeight = 1;
    const cubeDepth = 1;
    const geometry = new THREE.BoxGeometry(cubeWidth, cubeHeight, cubeDepth);

    // Create a material for the cube
    const material = new THREE.MeshBasicMaterial({color: 0x44aa88});

    // Create a mesh for the cube (contains the geometry -> vertexes, material -> texture,
    // and position) and add it to the scene
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Render the scene made with our camera
    renderer.render(scene, camera);
    console.log("Finished three-rendering.js");
} //end of main()

main();