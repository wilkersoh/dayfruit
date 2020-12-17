import React, { useState } from "react";
// import { GoogleMap, LoadScript } from "react-google-maps/api";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { Box, Text } from "@chakra-ui/core";
import App from "@/components/App";

const MAP_DETAILS = {
  name: "Fresh Fruits",
};

const Map = () => {
  const [showInfo, setShowInfo] = useState(null);

  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: 1.486925, lng: 103.388962 }}>
      <Marker
        onClick={() => setShowInfo(MAP_DETAILS)}
        position={{
          lat: 1.4802729364769138,
          lng: 103.38727170083912,
        }}>
        {showInfo && (
          <InfoWindow
            onCloseClick={() => setShowInfo(null)}
            position={{
              lat: 1.4802729364769138,
              lng: 103.38727170083912,
            }}>
            <Text color='black'>{showInfo.name}</Text>
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function maps() {
  return (
    <App h='full'>
      <Box h='full' p={8}>
        {/* <GoogleMap
          onLoad={(map) => {
            const bounds = new window.google.maps.LatLngBounds();
            map.fitBounds(bounds);
          }}
          onUnmount={(map) => {
            // do your stuff before map is unmounted
          }}
        /> */}
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_KEY}`}
          loadingElement={<Box style={{ height: "100%" }}></Box>}
          containerElement={<Box style={{ height: "100%" }}></Box>}
          mapElement={<Box style={{ height: "100%" }}></Box>}
        />
      </Box>
    </App>
  );
}
