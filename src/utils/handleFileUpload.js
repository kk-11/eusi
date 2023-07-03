import * as turf from '@turf/turf';

const handleFileUpload = (e, globeEl, setPolygonsData, setRingsData, setFileLoading) => {
  e.preventDefault();
  if (e.target.files && e.target.files[0]) {
    const reader = new FileReader();
    reader.readAsText(e.target.files[0], 'UTF-8');
    reader.onload = (evt) => {
      const center = turf.center(JSON.parse(evt.target.result).features[0]);
      const globe = globeEl.current;
      globe.pointOfView(
        {
          lng: center.geometry.coordinates[0],
          lat: center.geometry.coordinates[1],
          altitude: 1.5,
        },
        [2000],
      );
      setPolygonsData(JSON.parse(evt.target.result).features);
      setRingsData([{ lng: center.geometry.coordinates[0], lat: center.geometry.coordinates[1] }]);
      setFileLoading(false);
    };
    reader.onerror = (evt) => {
      setFileLoading(false);
      console.error(evt);
    };
  }
  
};

export default handleFileUpload;