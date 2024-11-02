import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';


function LockerModel({ servoStatus }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      45,
      800 / 600,
      0.1,
      1000
    );
    camera.position.set(50, 10, 50);  
    camera.lookAt(0, -120, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(800, 600);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1.5);
    frontLight.position.set(50, 50, 50);
    scene.add(frontLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.8);
    backLight.position.set(-50, -50, -50);
    scene.add(backLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 1.2);
    topLight.position.set(0, 100, 0);
    scene.add(topLight);

    const leftLight = new THREE.DirectionalLight(0xffffff, 0.8);
    leftLight.position.set(-100, 0, 0);
    scene.add(leftLight);

    const rightLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rightLight.position.set(100, 0, 0);
    scene.add(rightLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const bottomLight = new THREE.DirectionalLight(0xffffff, 0.5);
    bottomLight.position.set(0, -50, 0);
    scene.add(bottomLight);

    const textureLoader = new THREE.TextureLoader();
    const woodTexture = textureLoader.load('/textures/white-wood.jpg');
    
    woodTexture.wrapS = THREE.RepeatWrapping;
    woodTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.repeat.set(1, 1);

    const loader = new OBJLoader();

    loader.load(
      '/models/locker-body.obj',
      (object) => {
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshPhongMaterial({
              map: woodTexture,
              color: Number(servoStatus) === 0 ? 0xFFFFFF : 0xE0E0E0,
              metalness: 0.2,
              roughness: 0.8,
              side: THREE.DoubleSide
            });
          }
        });
        
        object.scale.set(1.2, 1.0, 1.0);
        object.rotation.x = -Math.PI / 2;
        object.position.set(0, -120, 0);
        
        scene.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('Error loading locker body:', error);
      }
    );

    const group = new THREE.Group();

    loader.load(
      '/models/locker-door.obj',
      (object) => {
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshPhongMaterial({
              map: woodTexture,
              color: 0xFFFFFF,
              metalness: 0.2,
              roughness: 0.8,
              side: THREE.DoubleSide
            });
          }
        });
        
        object.scale.set(1.2, 1.0, 1.0);
        object.rotation.x = -Math.PI / 2;
        object.rotation.y = Math.PI;
        object.position.set(-17, 0, 0);
        
        
        group.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('Error loading locker door:', error);
      }
    );

    group.position.set(17, -80, 16);
    group.rotation.set(0, Math.PI / 2 * (1 - servoStatus), 0);
    scene.add(group);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 20;
    controls.maxDistance = 150;
    controls.maxPolarAngle = Math.PI / 2;

    controls.target.set(0, -120, 0);
    controls.update();

    
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      group.rotation.y = 
        THREE.MathUtils.lerp(group.rotation.y, Math.PI / 2 * servoStatus, 0.1);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });

      renderer.dispose();
    };
  }, [servoStatus]);

  return (
    <div style={{ 
      width: '800px',
      height: '600px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '100px auto 0',
      position: 'relative',
      zIndex: 1
    }}>
      <div ref={mountRef} />
    </div>
  );
}

export default LockerModel;