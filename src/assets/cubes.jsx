import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Cube = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      0.1,
      1000
    );
    camera.position.z = 150; // Adjusted camera position for better view

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    mountRef.current.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 100).normalize(); // Proper lighting for cubes
    scene.add(light);

    const textureLoader = new THREE.TextureLoader();
    const images = [
      '/Images/image1.png',
      '/Images/image2.png',
      '/Images/image3.png',
      '/Images/image4.png',
      '/Images/image5.png',
      '/Images/image6.png',
      '/Images/image7.png',
      '/Images/image8.png',
      '/Images/image9.png',
      '/Images/image10.png',
      '/Images/image11.png',
      '/Images/image12.png'
    ];

    const gradientMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vColor;
        void main() {
          vColor = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec3 vColor;
        void main() {
          float mixRatio = vColor.y + 0.5;
          gl_FragColor = vec4(mix(color1, color2, mixRatio), 1.0);
        }
      `,
      uniforms: {
        color1: { value: new THREE.Color(0x832232) },
        color2: { value: new THREE.Color(0xB497D6) },
      },
      transparent: true // Ensure edges visibility
    });

    const cubes = [];
    const rotationSpeeds = [];
    const cubeData = [];

    for (let i = 0; i < 12; i++) {
      const geometry = new THREE.BoxGeometry(70, 70, 70); // Size of the cubes

      const materials = new Array(6).fill(new THREE.MeshStandardMaterial({
        map: textureLoader.load(images[i]),
        side: THREE.DoubleSide
      }));

      const cube = new THREE.Mesh(geometry, materials);
      cube.position.x = i * 120 - 660; // Adjusted position for spacing between cubes
      scene.add(cube);
      cubes.push(cube);

      rotationSpeeds.push(Math.random() * 0.04 + 0.03);

      cubeData.push({
        rotationX: 0,
        rotationY: 0,
        isPaused: false,
        pauseTimeout: null
      });

      // Add gradient edges to the cubes
      const edges = new THREE.EdgesGeometry(geometry);
      const edgeLine = new THREE.LineSegments(edges, gradientMaterial);
      cube.add(edgeLine);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    const switchFaceImages = () => {
      cubes.forEach(cube => {
        cube.material.forEach((material, index) => {
          if (index === 0) {
            material.map = textureLoader.load(images[Math.floor(Math.random() * images.length)]);
            material.needsUpdate = true;
          }
        });
      });
    };

    const animate = () => {
      requestAnimationFrame(animate);

      cubes.forEach((cube, index) => {
        const data = cubeData[index];

        if (!data.isPaused) {
          const axis = Math.random() < 0.5 ? 'x' : 'y';
          cube.rotation[axis] += rotationSpeeds[index];
          data[`rotation${axis.toUpperCase()}`] += rotationSpeeds[index];

          if (data.rotationX >= (Math.PI / 2) || data.rotationY >= (Math.PI / 2)) {
            data.rotationX = 0;
            data.rotationY = 0;
            data.isPaused = true;
            cube.rotation.x = Math.round(cube.rotation.x / (Math.PI / 2)) * (Math.PI / 2);
            cube.rotation.y = Math.round(cube.rotation.y / (Math.PI / 2)) * (Math.PI / 2);
            data.pauseTimeout = setTimeout(() => {
              data.isPaused = false;
            }, 2000); // Pause for 2 seconds after each 90-degree rotation
          }
        }
      });

      if (Math.random() < 0.01) {
        switchFaceImages();
      }

      controls.update();
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.left = window.innerWidth / -2;
      camera.right = window.innerWidth / 2;
      camera.top = window.innerHeight / 2;
      camera.bottom = window.innerHeight / -2;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
      cubeData.forEach(data => {
        if (data.pauseTimeout) clearTimeout(data.pauseTimeout);
      });
    };
  }, []);

  return <div ref={mountRef} className="w-full h-screen mt-[-12%] mb-1"></div>;
};

export default Cube;
