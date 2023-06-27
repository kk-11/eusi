import { useEffect, useState, useRef } from 'react';
import logo from './assets/logo.png';
import * as turf from '@turf/turf';


import clouds from './assets/fair_clouds_4k.png';

import Globe from 'react-globe.gl';
import * as THREE from 'three';

import './App.css';


function App() {
  const [fileContent, setFileContent] = useState('');
  const globeEl = useRef();
      useEffect(() => {
        const globe = globeEl.current;

        // Auto-rotate
        // globe.controls().autoRotate = true;
        // globe.controls().autoRotateSpeed = 0.35;

        // Add clouds sphere
        // const CLOUDS_IMG_URL = './clouds.png'; // from https://github.com/turban/webgl-earth
        const CLOUDS_ALT = 0.004;
        const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame

        // new THREE.TextureLoader().load(clouds, (cloudsTexture) => {
        //   const clouds = new THREE.Mesh(
        //     new THREE.SphereGeometry(globe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
        //     new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true }),
        //   );
        //   globe.scene().add(clouds);

        //   (function rotateClouds() {
        //     clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
        //     requestAnimationFrame(rotateClouds);
        //   })();
        // });
      }, []);

      useEffect(() => {
        const globe = globeEl.current;
        if (fileContent) {
          // console.log(fileContent.features[0].geometry.coordinates[0][0][0]);
          // const coords = fileContent.features[0].geometry.coordinates[0][0][1]
          // globe.pointOfView({ x: coords[0], y: coords[1] });

        }
      }, [fileContent]);
  

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsText(e.target.files[0], 'UTF-8');
      reader.onload = (evt) => {
      
        setFileContent(JSON.parse(evt.target.result));
        console.log(JSON.parse(evt.target.result).features[0]);
        const center = turf.center(JSON.parse(evt.target.result).features[0]);
        console.log(center[0], center[1], center)
        const globe = globeEl.current;
        globe.pointOfView({ lat: center.geometry.coordinates[0], lng: center.geometry.coordinates[1], altitude: 2.5 }, [2000]);
      };
      reader.onerror = (evt) => {
        console.log(evt);
      };
    }
  };
  // // Gen random data
  // const N = 30;

  // const gData = [...Array(N).keys()].map(() => ({
  //   lat: (Math.random() - 0.5) * 180,
  //   lng: (Math.random() - 0.5) * 360,
  //   size: Math.random() / 3,
  //   color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
  // }));

  return (
    <>
      <div className="globeWrapper">
        <Globe
          // pointsData={gData}
          ref={globeEl}
          waitForGlobeReady
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          animateIn
        />
      </div>
      <div>
        <img src={logo} className="logo" alt="EUSI logo" />
      </div>
      <h1>EUSI</h1>
      <div className="card">
        <input
          type="file"
          id="input-file-upload"
          accept="application/geo+json"
          multiple={false}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default App;
