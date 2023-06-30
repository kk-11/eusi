import { BBox, CRS_EPSG3857, WmsLayer,  MimeTypes, ApiType } from '@sentinel-hub/sentinelhub-js';

export const handler = async (args) => {

  console.log(args);
  const INSTANCE_ID = "e60eb665-2593-4a31-8f16-1aea5cccb633"
  const bbox = new BBox(CRS_EPSG3857, 1029910,6004911,1039910,6013602);

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
    const imageUrl =  layer.getMapUrl(getMapParams, ApiType.WMS);

  return {
    statusCode: 200,
    body: JSON.stringify(imageUrl),
  };
}

