// src/app.jsx
/*
import { h } from 'preact';
import GlobeComponent from './components/Globe';

const App = () => {
  return (
    <div>
      <h1>Globe Visualization</h1>
      <GlobeComponent />
    </div>
  );
};

export default App;
*/
/*
import { h, render } from 'https://esm.sh/preact';
// import { h } from 'preact';
import Globe from 'react-globe.gl';

const GlobeComponent = () => {
  const data = [
    { lat: 37.7749, lng: -122.4194, size: 100, label: 'San Francisco' },
    { lat: 40.7128, lng: -74.0060, size: 200, label: 'New York' },
    { lat: 51.5074, lng: -0.1278, size: 150, label: 'London' },
  ];

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        pointsData={data}
        pointLabel={(point) => point.label}
        pointColor={() => 'red'}
        pointAltitude={(point) => point.size / 1000}
      />
    </div>
  );
};

// export default GlobeComponent;
render(GlobeComponent, document.getElementById('GlobeComponent'));
*/

import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

export function App() {
  const [Globe, setGlobe] = useState(null);

  useEffect(() => {
    // Dynamically import react-globe.gl
    import('//unpkg.com/react-globe.gl').then(module => {
      setGlobe(() => module.default);
    });
  }, []);

  const data = [
    { lat: 37.7749, lng: -122.4194, size: 100, label: 'San Francisco' },
    { lat: 40.7128, lng: -74.0060, size: 200, label: 'New York' },
    { lat: 51.5074, lng: -0.1278, size: 150, label: 'London' },
  ];

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {Globe && (
        <Globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          pointsData={data}
          pointLabel={(point) => point.label}
          pointColor={() => 'red'}
          pointAltitude={(point) => point.size / 1000}
        />
      )}
    </div>
  );
}
