import { useEffect, useState, useRef } from 'react';
import Globe from 'react-globe.gl';

import logo from './assets/logo.png';
import earthNight from './assets/earth-night.jpg';

import { handleFileUpload, handleGetImageData } from './utils';
import { useEventListener } from './hooks';
import { Modal } from './components';

import './App.css';

function App() {
  //react stuff
  const globeEl = useRef();
  const [images, setImages] = useState([]);
  const [ringsData, setRingsData] = useState([]);
  const [fileLoading, setFileLoading] = useState(false);
  const [activeModalData, setActiveModalData] = useState(null);

  // handle scene resizing
  const onWindowResize = () => {
    const globe = globeEl.current;
    if (!globe) return; // needed? why?
    globe.camera().aspect = window.innerWidth / window.innerHeight;
    globe.camera().updateProjectionMatrix();
    globe.renderer().setSize(window.innerWidth, window.innerHeight);
  };
  useEventListener('resize', onWindowResize);

  // handle initial rotate, and setRingData
  // I feel like this should be handle differently
  // i'd like to refactor both handleGetImageData, and handleFileUpload
  // so they work better together
  useEffect(() => {
    const globe = globeEl.current;
    globe.controls().autoRotate = ringsData.length === 0;
    globe.controls().autoRotateSpeed = 0.35;
    if (ringsData.length > 0) {
      handleGetImageData(ringsData[0], setImages, setFileLoading, setRingsData);
    }
  }, [ringsData]);

  return (
    <>
      <div className="bar top">
        <h1>
          Orbital
          <br />
          <img src={logo} className="logo" alt="OEI logo" aria-hidden />
          Edge
          <br />
          Imaging
        </h1>
      </div>
      <div className="globeWrapper">
        <Globe
          animateIn
          waitForGlobeReady
          ref={globeEl}
          ringsData={ringsData}
          polygonAltitude={0.1}
          globeImageUrl={earthNight}
          onGlobeClick={(e) => handleGetImageData(e, setImages, setFileLoading, setRingsData)}
        />
      </div>
      <div className="imageList">
        {/* TODO: fix rerender */}
        {images.map(({ src, location }, i) => (
          <img
            key={`${src}_${i}`}
            src={src}
            onClick={() => setActiveModalData({ src, location })}
          />
        ))}
      </div>
      <div className="bar bottom">
        <input
          id="files"
          type="file"
          accept="application/geo+json"
          multiple={false}
          // this is just to allow same file to be selected.
          // should be handled better, but an edge case
          onClick={(e) => (e.target.value = null)}
          onChange={(e) => handleFileUpload(e, globeEl, setRingsData, setFileLoading)}
        />
        <label htmlFor="files" onClick={() => setFileLoading(true)} className="fileSelect">
          {fileLoading ? 'Loading...' : 'Select file'}
        </label>
      </div>
      {activeModalData && <Modal {...activeModalData} close={() => setActiveModalData(null)} />}
    </>
  );
}

export default App;
