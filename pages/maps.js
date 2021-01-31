import React, { useState } from "react";
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
  name: "Great Fruits in Pontian",
};

const GoogleMapComponent = () => {
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

const WrappedMap = withScriptjs(withGoogleMap(GoogleMapComponent));

export default function maps() {
  return (
    <App h='full' name='Map' path='/maps'>
      <Box h='90vh' p={{ sm: 0, lg: 8 }}>
        <Box>Google Map is closed</Box>
        {/* <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_KEY}`}
          loadingElement={<Box style={{ height: "100%" }}></Box>}
          containerElement={<Box style={{ height: "100%" }}></Box>}
          mapElement={<Box style={{ height: "100%" }}></Box>}
        /> */}
      </Box>
    </App>
  );
}
