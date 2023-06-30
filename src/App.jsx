import { useEffect, useState, useRef } from 'react';
import logo from './assets/logo.png';
import earthNight from './assets/earth-night.jpg';
import { handleFileUpload } from './utils';
import { useEventListener } from './hooks';
import Globe from 'react-globe.gl';
import './App.css';

function App() {
  const globeEl = useRef();
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [ringsData, setRingsData] = useState([]);
  const [polygonsData, setPolygonsData] = useState([]);
  const [fileLoading, setFileLoading] = useState(false);
  const [qsparams, setQsparams] = useState('?bboxCoords=1029910,6004911,1039910,6013602');

  const onWindowResize = () => {
    const globe = globeEl.current;
    if (!globe) return;
    globe.camera().updateProjectionMatrix();
    globe.renderer().setSize(window.innerWidth, window.innerHeight);
  };

  useEventListener('resize', onWindowResize);

  useEffect(() => {
    const globe = globeEl.current;
    globe.controls().autoRotate = polygonsData.length === 0;
    globe.controls().autoRotateSpeed = 0.35;
  }, [polygonsData]);

  const handle = async () => {
    await fetch(`/.netlify/functions/getSentinelData${qsparams}`)
      .then((response) => response.json())
      .then((res) => setImage(res));
  };

  return (
    <>
      <div className="bar top">
        <h1>
          Orbital
          <br />
          <img src={logo} className="logo" alt="OEI logo" />
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
          polygonsData={polygonsData}
          onGlobeClick={(e) => setImages((prev) => [...prev, e])}
        />
      </div>
      <div className="imageList">
        {images.map((im) => (
          <img key={im.lat} src={earthNight} onClick={() => alert('open large image dialoge')}/>
        ))}
      </div>
      <div className="bar bottom">
        <input
          id="files"
          type="file"
          accept="application/geo+json"
          multiple={false}
          onChange={(e) =>
            handleFileUpload(e, globeEl, setPolygonsData, setRingsData, setFileLoading)
          }
        />
        <label htmlFor="files" onClick={() => setFileLoading(true)} className="fileSelect">
          {fileLoading ? 'Loading...' : 'Select file'}
        </label>
      </div>
    </>
  );
}

export default App;

{
  /* <img src={decodeURIComponent(image)} /> */
  //{/* <button onClick={handle}>get sentinel data</button> */}
}
