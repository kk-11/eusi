import { BBox, CRS_WGS84, WmsLayer, MimeTypes, ApiType } from '@sentinel-hub/sentinelhub-js';
import * as turf from '@turf/turf';

export const handler = async ({ queryStringParameters }) => {
  const { lat, lng } = queryStringParameters;
  // move to env, but it's exposed anyway so...
  const INSTANCE_ID = 'e60eb665-2593-4a31-8f16-1aea5cccb633';
  var pointA = turf.point([+lng, +lat]);
  // magic numbers, why? :)
  var pointB = turf.destination(pointA, 2, 45, { units: 'kilometers' });

  var bbx = turf.bbox(turf.featureCollection([pointA, pointB]));
  const bbox = new BBox(CRS_WGS84, ...bbx);

  const layer = new WmsLayer({
    baseUrl: `https://services.sentinel-hub.com/ogc/wms/${INSTANCE_ID}`,
    layerId: 'NATURAL-COLOR',
  });

  const getMapParams = {
    bbox: bbox,
    width: 320,
    height: 320,
    toTime: new Date(),
    format: MimeTypes.JPEG,
  };
  const imageUrl = layer.getMapUrl(getMapParams, ApiType.WMS);

  return {
    statusCode: 200,
    body: JSON.stringify(imageUrl),
  };
};
