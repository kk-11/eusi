# EUSI Coding Challenge

![screenshot](https://github.com/kk-11/eusi/blob/master/src/assets/screenshot.png?raw=true)

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
- sentinal hub js package for sentinal api calls

### Thoughts

This was a fun challenge, but pretty hefty! And there's a lot more that could be added.

The click doesn't appear to be accurate on the globe. This could be the 3D modal or it could be my bounding box implementation.

Sentinel was quite difficult to work with, very technial descriptions.

I've never used serverless functions before so that was cool, although sentinel didn't require a client secret to return an image so it wasn't exactly necessary, but nice to implement for future stuff. 

The native html input file select was awesome. Super straighforward, and worked perfectly.

Globe.gl was great for the most part. It exposed a ton of Three functionality, although I did get some jank randomly at times so would probably want to build a globe with Three myself for a real project. 

It was interesting using pure javascript again, felt like living on the edge, but it's a lot of fun for individual projects or proof of concept work.

### Known issues
  - no mobile implementation.
  - I need to test way more, like I'm not sure if the returned image is actually correct.

### To do
  - Get a real designer :|
  - test
  - mobile
    "for best results please use on desktop device"
  - accessibility
    aria labels
    canvas is terrible for accessibility.. how to make semantic?
  - consider loading, three doesn't have percent loaded. perhaps use onGlobeLoad with pessimistic load time to start.
  - I would've liked to try radix ui for a toaster implementation for user feedback, I hear it's quite nice and I haven't played with radix at all.



It would've been nice to implement some of this [cutting edge technology](https://www.youtube.com/watch?v=dQw4w9WgXcQ) if I had the time. Sorry 🫢
