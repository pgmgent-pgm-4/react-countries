import React, {useEffect, useMemo, useState} from 'react';
import ReactMapGL, { Layer, Marker, Source, Popup } from 'react-map-gl';
import {Editor, DrawPolygonMode, EditingMode} from 'react-map-gl-draw';
import { calculateDitanceBetweenTwoCoordinates } from '../../helpers';
import CountryInfo from './CountryInfo';

const TOKEN = 'pk.eyJ1IjoiZHJkeW5zY3JpcHQiLCJhIjoiY2tsemh3bmt3MTF2aDJwbHlpZ2t2aHZycyJ9.PqbwCbqm2PdFVNKGl10i2A';

const CountriesMap = ({countries, selectedCountry}) => {
  const [viewport, setViewport] = useState({
    latitude: 51.087442,
    longitude: 3.668691,
    zoom: 4
  });
  const [mode, setMode] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({
    coords: {
      latitude: 51.087442,
      longitude: 3.668691,
    }
  });
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => setCurrentLocation(position), (err) => console.log(err), { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 });
  }, []);

  useEffect(() => {
    const country = countries.find(country => country.iso2Code === selectedCountry);

    if (country) {
      // const R = calculateDitanceBetweenTwoCoordinates(currentLocation.coords.latitude, currentLocation.coords.longitude, country.latitude, country.longitude);
      // const L = calculateDitanceBetweenTwoCoordinates(country.latitude, currentLocation.coords.longitude, country.latitude, country.longitude);
      // const a = Math.cosh(L/R);
      // console.log(L, R, a);

      

      setViewport({
        latitude: country.latitude,
        longitude: country.longitude,
        zoom: 4
      });

      const distance = calculateDitanceBetweenTwoCoordinates(currentLocation.coords.latitude, currentLocation.coords.longitude, country.latitude, country.longitude);

      console.log(distance);   
    }

  }, [selectedCountry])

  const handleMarkerClick = (ev, country) => {
    ev.preventDefault();
  };

  const markers = useMemo(() => countries.map(
    country => {
      return (
      <Marker key={country.id} longitude={country.longitude} latitude={country.latitude} onClick={ev => handleMarkerClick(ev, country)}>
        <div style={{transform: `translateX(-8px) translateY(-16px)`}}>
          <img src={`https://www.countryflags.io/${country.iso2Code}/flat/16.png`}></img>
        </div>
      </Marker>
      )
    }
  ), [countries]);
  
  const layerLineStyle = {
    type: 'line',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#888',
      'line-width': 2
    }
  };

  const lineBetweenTwoCoordinates = useMemo(() => {
    const country = countries.find(country => country.iso2Code === selectedCountry);

    if (country) {
      const geojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature', 
            geometry: {type: 'LineString', coordinates: [[currentLocation.coords.longitude, currentLocation.coords.latitude], [country.longitude, country.latitude]]}
          }
        ]
      };
  
      return (
        <Source id="line" type="geojson" data={geojson}>
          <Layer id="line-layer" {...layerLineStyle} />
        </Source>
      )
    }
    return (
      <>
      </>
    )    
  }, [selectedCountry])

  const currentLocationMarker = useMemo(() => {
      return (
        <Marker key={'CL'} longitude={currentLocation.coords.longitude} latitude={currentLocation.coords.latitude}>
          <div style={{transform: `translateX(-12px) translateY(-24px)`}}>
            <img src="./images/home.png" width="24" />
          </div>
        </Marker>
      )
    }
  , [currentLocation]);

  return (
    <ReactMapGL
        {...viewport}
        width="100%"
        height="600px"
        mapStyle={'mapbox://styles/mapbox/light-v9'}
        mapboxApiAccessToken={TOKEN}
        onViewportChange={setViewport}
      >
      <Editor
        // to make the lines/vertices easier to interact with
        clickRadius={12}
        mode={mode}
      />
      {/* {this._renderToolbar()} */}
      {markers}
      {currentLocationMarker}  
      {lineBetweenTwoCoordinates} 
      {/* {popupVisible && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={country.longitude}
          latitude={country.latitude}
          closeOnClick={false}
          onClose={setPopupInfo}
        >
          <CountryInfo country={[]} />
        </Popup>
      )}  */}
    </ReactMapGL>
  )
};

export default CountriesMap;