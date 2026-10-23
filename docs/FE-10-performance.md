
# FE-10: 3D Experience Performance Notes

## Overview

The FE-AA2 feature introduces an interactive desk lamp configurator
at `/fe-aa2`. The scene uses Three.js through React Three Fiber,
with Drei providing camera and shadow helpers.

## Performance decisions

| Decision | Reason |
|---|---|
| Dynamic import | Keeps the 3D component out of the initial server-rendered page bundle. |
| Geometric primitives | Avoids external model downloads and complex asset parsing. |
| Device pixel ratio capped at 1.5 | Limits rendering workload on high-density displays. |
| 512 × 512 shadow maps | Bounds shadow-map memory and rendering cost. |
| No continuous decorative animation | Avoids unnecessary ongoing animation work. |
| Camera distance limits | Keeps zoom within a useful range. |

## Loading and fallback

The page provides a loading placeholder while the 3D component is
being imported. The canvas also defines a fallback for environments
where the 3D renderer cannot be created.

The experience should be tested on a browser with WebGL disabled
or unavailable to confirm the fallback behaviour.

## Accessibility

The colour choices and power switch are keyboard-operable buttons.
The power switch exposes its state using `aria-checked`.

The scene has no automatic camera animation. Manual rotation and
zoom are user-controlled.

## Validation checklist

- [ ] Production build succeeds.
- [ ] Colour and power controls work after production build.
- [ ] Rotation, zoom, and reset work on desktop.
- [ ] Controls remain usable on a narrow mobile viewport.
- [ ] Loading and WebGL fallback behaviour are verified.
- [ ] Reduced-motion behaviour is reviewed.
- [ ] Browser console is checked for rendering errors.
- [ ] Performance is measured on a representative device.

## Measurement record

Record results after running a production build and testing the
deployed page. Do not claim a performance score without a measured
result.

- Build status: Pending
- Lighthouse performance score: Pending
- Largest Contentful Paint: Pending
- Total page weight: Pending
- Test device and browser: Pending
- Known limitations: WebGL performance varies by device and browser.
