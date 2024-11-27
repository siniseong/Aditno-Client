import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

function LockerModel({ status1, status2 }) {
  const [servoData, setServoData] = useState([]);

  const mountRef = useRef(null);
  const sceneRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    group1: null,
    group2: null,
    controls: null
  });

  const rotationRef = useRef({
    door1: 0,
    door2: 0,
    targetDoor1: 0,
    targetDoor2: 0
  });

  useEffect(() => {
    let isMounted = true;
    
    const fetchServoStatus = async () => {
      try {
        const response = await fetch('/servo/status');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (isMounted) {
          setServoData(prevData => {
            if (JSON.stringify(prevData) !== JSON.stringify(data)) {
              return data;
            }
            return prevData;
          });
        }
      } catch (error) {
        console.error('Error fetching servo status:', error);
      }
    };

    fetchServoStatus();
    
    const intervalId = setInterval(fetchServoStatus, 5000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!servoData || !Array.isArray(servoData) || servoData.length < 2) {
      console.warn('Invalid servo data');
      return;
    }

    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      60,
      800 / 600,
      0.1,
      1000
    );
    camera.position.set(50, 20, 50);
    camera.lookAt(0, -100, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(800, 1000);
    renderer.setViewport(0, 300, 800, 600);
    renderer.setClearColor(0x000000, 0);
    currentMount.appendChild(renderer.domElement);

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
              color: Number(servoData?.[0]?.status || "0") === 0 ? 0xFFFFFF : 0xE0E0E0,
              metalness: 0.2,
              roughness: 0.8,
              side: THREE.DoubleSide,
              emissive: Number(status2) === 0 ? 0x00FF00 : 0xFF0000,
              emissiveIntensity: 0.2
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

    loader.load(
      '/models/locker-body.obj',
      (object) => {
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshPhongMaterial({
              map: woodTexture,
              color: Number(servoData?.[0]?.status || "0") === 0 ? 0xFFFFFF : 0xE0E0E0,
              metalness: 0.2,
              roughness: 0.8,
              side: THREE.DoubleSide,
              emissive: Number(status1) === 0 ? 0x00FF00 : 0xFF0000,
              emissiveIntensity: 0.2
            });
          }
        });
        
        object.scale.set(1.2, 1.0, 1.0);
        object.rotation.x = -Math.PI / 2;
        object.position.set(0, -80, 0);
        
        scene.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('Error loading locker body:', error);
      }
    );

    const group1 = new THREE.Group();

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
              side: THREE.DoubleSide,
              emissive: Number(status2) === 0 ? 0x00FF00 : 0xFF0000,
              emissiveIntensity: 0.2
            });
          }
        });
        
        object.scale.set(1.2, 1.0, 1.0);
        object.rotation.x = -Math.PI / 2;
        object.rotation.y = Math.PI;
        object.position.set(-17, 0, 0);
        
        group1.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('Error loading locker door:', error);
      }
    );

    group1.position.set(17, -80, 16);
    group1.rotation.set(0, Math.PI / 2 * (1 - Number(servoData?.[0]?.status || "0")), 0);
    scene.add(group1);

    const group2 = new THREE.Group();

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
              side: THREE.DoubleSide,
              emissive: Number(status1) === 0 ? 0x00FF00 : 0xFF0000,
              emissiveIntensity: 0.2
            });
          }
        });
        
        object.scale.set(1.2, 1.0, 1.0);
        object.rotation.x = -Math.PI / 2;
        object.rotation.y = Math.PI;
        object.position.set(-17, 0, 0);
        
        group2.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('Error loading locker door:', error);
      }
    );

    group2.position.set(17, -40, 16);
    group2.rotation.set(0, Math.PI / 2 * (1 - Number(servoData?.[1]?.status || "0")), 0);
    scene.add(group2);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 20;
    controls.maxDistance = 150;
    controls.maxPolarAngle = Math.PI / 2;

    controls.target.set(0, -100, 0);
    controls.update();

    sceneRef.current = {
      scene,
      camera,
      renderer,
      group1,
      group2,
      controls
    };

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      if (group1) {
        rotationRef.current.door1 += (rotationRef.current.targetDoor1 - rotationRef.current.door1) * 0.1;
        group1.rotation.y = rotationRef.current.door1;
      }
      if (group2) {
        rotationRef.current.door2 += (rotationRef.current.targetDoor2 - rotationRef.current.door2) * 0.1;
        group2.rotation.y = rotationRef.current.door2;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });

      renderer.dispose();
    };
  }, [servoData]);

  useEffect(() => {
    if (!sceneRef.current.scene) return;

    rotationRef.current.targetDoor1 = Math.PI / 2 * Number(servoData?.[0]?.status || "0");
    rotationRef.current.targetDoor2 = Math.PI / 2 * Number(servoData?.[1]?.status || "0");

    sceneRef.current.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        if (object.material) {
          if (object.parent === sceneRef.current.group1) {
            object.material.emissive.setHex(Number(status2) === 0 ? 0x00FF00 : 0xFF0000);
          }
          if (object.parent === sceneRef.current.group2) {
            object.material.emissive.setHex(Number(status1) === 0 ? 0x00FF00 : 0xFF0000);
          }
        }
      }
    });
  }, [status1, status2, servoData]);

  return (
    <div style={{ 
      width: '800px',
      height: '600px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '-60px auto 0',
      position: 'relative',
      zIndex: 1
    }}>
      <div ref={mountRef} />
    </div>
  );
}

export default LockerModel;