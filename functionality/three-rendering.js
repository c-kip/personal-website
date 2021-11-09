import * as THREE from "../modules/build/three.module.js";

// Cube demo function
function cube_demo() {
    console.log("Started rendering three cube demo.");
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

    // Update (render) the canvas
    function render(time) {
        time *= 0.001;  // convert time to seconds
        
        // Check if the window was resized, and modify canvas accordingly
        if (resizeRendererResolution(renderer)) {
            // Update the canvas to show a fixed view (aspect) regardless of window size
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

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

    // Calculate if the canvas needs to be resized (resolution), and do so
    // if necessary. Returns true if the canvas was resized.
    function resizeRendererResolution(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (width !== canvas.width || height !== canvas.height) {
            renderer.setSize(width, height, false);
            return true;
        }
        return false;
    }
    requestAnimationFrame(render);

    console.log("Finished rendering cube demo.");
} //end of cube_demo()

// Solar system function
function solar_system_demo() {
    console.log("Started rendering solar system demo.");
    const canvas = document.querySelector('#d');
    const renderer = new THREE.WebGLRenderer({canvas});

    // Create a camera
    const fov = 40;
    const aspect = 2;  // the canvas default
    const near = 0.1; // clipping close boundary
    const far = 1000; // clipping far boundary (only renders in clipping range)
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // Move the camera above the Sun, tell it up is +y, and aim the camera at the origin
    camera.position.set(0, 80, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    // Create a scene to render
    const scene = new THREE.Scene();

    // Create the light (sun)
    {
        const colour = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.PointLight(colour, intensity);
        scene.add(light);
    }

    // Create an array for the solar system objects (planets), and a 3DObject
    // to hold all solar system objects
    const solar = [];
    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    solar.push(solarSystem);

    // Create one sphere geometry for all planets
    const radius = 1;
    const widthSegments = 8; // 50 is fairly smooth
    const heightSegments = 8;
    const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    // Make the sun
    const sunMat = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMat);
    sunMesh.scale.set(5, 5, 5); // enlarge the sun
    solarSystem.add(sunMesh);
    solar.push(sunMesh);

    // Make the Earth
    const earthMat = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMat);
    earthMesh.position.set(10, 0, 0);
    solarSystem.add(earthMesh); // Make Earth a child of the Sun
    solar.push(earthMesh);

    // Render the scene made with our camera
    renderer.render(scene, camera);

    // Update (render) the canvas
    function render(time) {
        time *= 0.001;  // convert time to seconds
        
        // Check if the window was resized, and modify canvas accordingly
        if (resizeRendererResolution(renderer)) {
            // Update the canvas to show a fixed view (aspect) regardless of window size
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        // Update each planet in the solar system's rotation
        solar.forEach((planet) => {
            planet.rotation.y = time;
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

    // Calculate if the canvas needs to be resized (resolution), and do so
    // if necessary. Returns true if the canvas was resized.
    function resizeRendererResolution(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (width !== canvas.width || height !== canvas.height) {
            renderer.setSize(width, height, false);
            return true;
        }
        return false;
    }
    requestAnimationFrame(render);

    console.log("Finished rendering solar system demo.");
} //end of solar_system_demo()

cube_demo();
solar_system_demo();