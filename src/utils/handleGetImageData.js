const handleGetImageData = async (evt, setImages, setFileLoading) => {
  const { lat, lng } = evt;
  setFileLoading(true);
  // get all the stuff.
  // Should have some catch cases
  Promise.all([
    await fetch(`/.netlify/functions/getSentinelData?lat=${lat}&lng=${lng}`).then((res) =>
      res.json(),
    ),
    await fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`).then((res) => res.json()),
  ]).then(([src, {address = {}, error = false}]) => {
    const { country, state, county } = address;
    const location = !error ? `${state ?? county ?? ''}, ${country}` : '¯\\_(ツ)_/¯';
    setImages((prev) => [{src, location }, ...prev])
  });
  setFileLoading(false);
};

export default handleGetImageData;
