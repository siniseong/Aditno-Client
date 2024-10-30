import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function LockerModel({ status }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const lockerGeometry = new THREE.BoxGeometry(6.0, 6.0, 6.0);
    const lockerMaterial = new THREE.MeshPhongMaterial({ 
      color: Number(status) === 0 ? 0x00FF00 : 0xFF7171,
      flatShading: false,
      metalness: 0.5,
      roughness: 0.3
    });
    const locker = new THREE.Mesh(lockerGeometry, lockerMaterial);
    scene.add(locker);

    const edgeGeometry = new THREE.EdgesGeometry(lockerGeometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ 
      color: 0x000000,
      linewidth: 2
    });
    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    locker.add(edges);

    const handleGeometry = new THREE.BoxGeometry(0.2, 0.5, 0.2);
    const handleMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333333,
      metalness: 0.8,
      roughness: 0.2
    });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.set(2.5, 0, 3.1);
    locker.add(handle);

    const itemGroup = new THREE.Group();
    
    const boxGeometry = new THREE.BoxGeometry(5.0, 2.0, 5.0);
    const boxMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x6184CA,
      metalness: 0.1,
      roughness: 0.8
    });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    itemGroup.add(box);

    const boxEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(boxGeometry),
      new THREE.LineBasicMaterial({ color: 0x000000 })
    );
    box.add(boxEdges);

    itemGroup.position.set(0, -1.5, 0);
    itemGroup.visible = Number(status) === 1;
    scene.add(itemGroup);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1);
    frontLight.position.set(0, 0, 5);
    scene.add(frontLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 0.5);
    topLight.position.set(0, 5, 0);
    scene.add(topLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 8;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI / 2;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [status]);

  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div ref={mountRef} />
    </div>
  );
}

export default LockerModel;     