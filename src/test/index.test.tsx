import React from "react";
import { BBox, GeoJsonProperties } from "geojson";
import Supercluster from "supercluster";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import useSupercluster from "../";

describe("useSupercluster", () => {
  it("renders clusters", async () => {
    const points: Array<Supercluster.PointFeature<GeoJsonProperties>> = [
      {
        type: "Feature",
        properties: {
          cluster: false,
          crimeId: 78212911,
          category: "anti-social-behaviour"
        },
        geometry: { type: "Point", coordinates: [-1.135171, 52.6376] }
      },
      {
        type: "Feature",
        properties: {
          cluster: false,
          crimeId: 78213207,
          category: "anti-social-behaviour"
        },
        geometry: { type: "Point", coordinates: [-1.133005, 52.629835] }
      },
      {
        type: "Feature",
        properties: {
          cluster: false,
          crimeId: 78213205,
          category: "anti-social-behaviour"
        },
        geometry: { type: "Point", coordinates: [-1.114732, 52.628909] }
      },
      {
        type: "Feature",
        properties: {
          cluster: false,
          crimeId: 78213197,
          category: "anti-social-behaviour"
        },
        geometry: { type: "Point", coordinates: [-1.133691, 52.63625] }
      }
    ];

    const bounds: BBox = [
      -1.2411810957931664,
      52.61208435908725,
      -1.0083656811012531,
      52.64495957533833
    ];

    const zoom = 10;
    const options = { radius: 75, maxZoom: 20 };

    const App = () => {
      const { clusters } = useSupercluster({ points, bounds, zoom, options });

      return (
        <ul>
          {clusters.map(point => {
            const properties = point.properties || {};
            if (properties.cluster) {
              return <li key={point.id}>points: {properties.point_count}</li>;
            } else {
              return <li key={properties.crimeId}>{properties.category}</li>;
            }
          })}
        </ul>
      );
    };

    const { findByText } = render(<App />);
    const clusterNode = await findByText("points: 4");
    expect(clusterNode).toBeInTheDocument();
  });
});
