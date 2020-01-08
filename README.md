# useSupercluster

A hook for using [Supercluster](https://github.com/mapbox/supercluster) with React.

```js
const { clusters, supercluster } = useSupercluster({
  points: [],
  bounds: [
    -1.2411810957931664,
    52.61208435908725,
    -1.0083656811012531,
    52.64495957533833
  ],
  zoom: 12,
  options: { radius: 75, maxZoom: 20 }
});
```

## Installation

You will need to install `supercluster` as a peer dependency of this package.

```txt
yarn add supercluster use-supercluster
```

## Examples

This package contains an example along with tests, but full examples with instructions in the most popular mapping libraries for React can be found below.

### Mapbox

Full instructions and an [example can be found here](https://www.leighhalliday.com/mapbox-clustering).

### Google Maps

Full instructions and an [example can be found here](https://www.leighhalliday.com/google-maps-clustering).

### Leaflet

Full instructions and an [example can be found here](https://www.leighhalliday.com/leaflet-clustering).
