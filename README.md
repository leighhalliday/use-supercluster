# useSupercluster

A hook for using Supercluster with React.

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

You will need to install [Supercluster](https://github.com/mapbox/supercluster) as a peer dependency of this package.

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

## Configuration

The last (fourth) argument passed to the `useSupercluster` hook are options that are passed directly to the instance of Supercluster. You can use any of [Supercluster's options](https://github.com/mapbox/supercluster#options).

### Map & Reduce Options

As an example, you can use `map` and `reduce` to keep track of a total value summed up from across the points. In this case we have the total `cost`, the max `severity`, plus another `count` (which is redundant because Supercluster gives us the `point_count` property).

```js
const options = {
  radius: 75,
  maxZoom: 20,
  map: props => ({
    cost: props.cost,
    severity: props.severity,
    count: 1
  }),
  reduce: (acc, props) => {
    acc.count += 1;
    acc.cost += props.cost;
    acc.severity = Math.max(acc.severity, props.severity);
    return acc;
  }
};
```

I found `map` and `reduce` a little confusing! The value returned from `map` of the first point is used as the initial value passed as the accumulator to the `reduce` function. The only `props` you have available in `reduce` are the ones returned from `map`. You technically don't need to return a value from `reduce` (it's not used), but instead need to mutate the accumulator object.

Then these accumulated properties can be used and are available on each cluster:

```jsx
<ul>
  {clusters.map(point => {
    const properties = point.properties || {};
    if (properties.cluster) {
      return (
        <li key={point.id}>
          <h2>Points: {properties.point_count}</h2>
          <p>Cost: {properties.cost.toFixed(2)}</p>
          <p>Severity: {properties.severity}</p>
          <p>Count: {properties.count}</p>
        </li>
      );
    } else {
      return <li key={properties.crimeId}>{properties.category}</li>;
    }
  })}
</ul>
```
