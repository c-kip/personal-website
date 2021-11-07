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

    // Create a light
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    // Create the geometry for a cube (box)
    const cubeWidth = 1;
    const cubeHeight = 1;
    const cubeDepth = 1;
    const geometry = new THREE.BoxGeometry(cubeWidth, cubeHeight, cubeDepth);

    // Create a material for the cube
    const material = new THREE.MeshPhongMaterial({color: 0x44aa88});

    // Create a mesh for the cube (contains the geometry -> vertexes, material -> texture,
    // and position) and add it to the scene
    const cubes = [
        makeInstance(geometry, 0x44aa88,  0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844,  2),
    ];

    // Render the scene made with our camera
    renderer.render(scene, camera);
    console.log("Finished three-rendering.js");

    // Update (render) the canvas
    function render(time) {
        time *= 0.001;  // convert time to seconds
        
        // Update the rotation of each cube
        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });
        
        // Render the scene, and request the browser calls this
        // function to update the page constantly
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    // Creates an instance of the geometry with the given colour,
    // and spawns it at position x
    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({color});
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        cube.position.x = x;
        return cube;
    } //end of makeInstance()
    requestAnimationFrame(render);
} //end of main()

main();