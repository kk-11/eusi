# EUSI Coding Challenge

### TLDR;
`yarn install && yarn run dev`

#### Requirements
- vite `npm install -g vite`
- node > 18.1
- yarn, although you could try `npm i && npm run dev` I think it might work, your mileage may vary.
- for serverless functions to work in dev you need to install the netlify cli and run `netlify dev`, you don't need to run `yarn run dev` with that, netlify cli handles everything.
- any issues, let me know


### Tech used:
- react
- vite, quick project scaffolding, build tool and dev server.
- globe.gl, a three.js wrapper
- netlify for deployment and serverless functions
- turf for geolocation calculations
- sentinal hub js package for api data calls

### Thoughts

This was a fun challenge, but pretty hefty! And it's certainly not a finished project right now.

I've found some of the challenge description to be a bit unclear.

The recommendeded sentinel api appears to be primarily for satellite imaging, and of course the name of the company hints at earth imaging.

However, being able `to search an API for results within the area of the uploaded file.` seems like I should maybe use another api for text based results about an area of interest?

Or is it just to return differently processed images from sentinel to be able to search and filter?

I've never used serverless functions before so that was cool, although sentinel didn't require a client secret to return an image so it wasn't super necessary. 

The native html input file select was awesome. Super straighforward, and worked perfectly.

Globe.gl was great for the most part. It exposed a ton of Three functionality, although I did get some jank randomly at times so would probably want to build a globe with Three myself for a real project. I don't think it's too difficult and would probably run a little smoother with more control.

It was interesting using pure javascript again, felt like living on the edge, but it's a lot of fun for individual projects or proof of concept work.

### Known issues
  - totally breaks if I don't use the example geojson.
  - no mobile implementation.
  - click map doesn't do anything right now, would be straightforward enough to get data as lat and long are passed in the click event of the globe.
  - I need to test way more, like I'm not sure if the returned image is actually correct, like a bounding box is a box, and area can be any shape, so I'd probably need to create a bounding box from the polygon, hopefully turf would have some utilities for that.

### To do
  - really a lot, this is very much a WIP
  - test
  - Get a real designer :|
  - mobile
    "for best results please use on desktop device"
  - accessibility
    aria labels
    canvas is terrible for accessibility.. how to make semantic?
  - consider loading, three doesn't have percent loaded. perhaps use onGlobeLoad with pessimistic load time to start.
  - I would've liked to try radix ui for a toaster implementation for user feedback, I hear it's quite nice and I haven't played with radix at all.