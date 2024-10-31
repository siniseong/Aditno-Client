import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

function LockerModel({ status }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(80, 80, 80);  // 카메라 위치 조정
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(600, 600);
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

    const loader = new OBJLoader();

    loader.load(
      '/models/locker-body.obj',
      (object) => {
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshPhongMaterial({
              color: Number(status) === 0 ? 0x00FF00 : 0x808080,
              metalness: 0.5,
              roughness: 0.3,
              side: THREE.DoubleSide
            });
          }
        });
        
        object.scale.set(1.2, 1.0, 1.0);  // 가로는 1.2배, 높이와 깊이는 1.0배로 설정
        object.rotation.x = -Math.PI / 2;
        object.position.set(0, 0, 0);
        
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
      '/models/locker-door.obj',
      (object) => {
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshPhongMaterial({
              color: 0x808080,
              metalness: 0.5,
              roughness: 0.3,
              side: THREE.DoubleSide
            });
          }
        });
        
        object.scale.set(1.2, 1.0, 1.0);  // 가로는 1.2배, 높이와 깊이는 1.0배로 설정
        object.rotation.x = -Math.PI / 2;
        object.rotation.y = Math.PI / 2;
        object.position.set(0, 40, 16);    // 위치 조정
        
        if (Number(status) === 1) {
          object.rotation.y = Math.PI;
        }
        
        scene.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('Error loading locker door:', error);
      }
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 40;    // 최소 거리 증가
    controls.maxDistance = 300;   // 최대 거리 증가
    controls.maxPolarAngle = Math.PI / 2;

    controls.target.set(0, 0, 0);
    controls.update();

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      // DOM에서 캔버스 제거
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Scene cleanup
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });

      // Renderer cleanup
      renderer.dispose();
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