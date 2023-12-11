import { useState, useCallback, memo, useEffect } from 'react';
import Map, { MarkerDragEvent, LngLat } from 'react-map-gl';
// components
import { MapMarker, MapControl, MapBoxProps } from 'src/components/map';
//
import ControlPanel from './control-panel';

// ----------------------------------------------------------------------

// function MapDraggableMarkers({ ...other }: MapBoxProps) {
function MapDraggableMarkers({ ...other }: MapBoxProps | any) {
  // const [marker, setMarker] = useState<any>({
  //   latitude: 40,
  //   longitude: -100,
  // });
  const [marker, setMarker] = useState<any>(null);
  const [pointer, setPointer] = useState({
    latitude: marker?.latitude,
    longitude: marker?.longitude,
  });

  const [events, logEvents] = useState<Record<string, LngLat>>({});

  useEffect(() => {
    if (other?.defaultMarker) {
      setMarker(other?.defaultMarker)
    }
  }, [other?.defaultMarker])


  const onMarkerDragStart = useCallback((event: MarkerDragEvent | any) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event: MarkerDragEvent | any) => {
    other?.onMarkerChange(event)
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));
    // setMarker({
    //   longitude: event.lngLat.lng,
    //   latitude: event.lngLat.lat,
    // });
    // setPointer({ longitude: event.lngLat.lng, latitude: event.lngLat.lat });
  }, [other]);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent | any) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
    setPointer({ longitude: event.lngLat.lng, latitude: event.lngLat.lat });
  }, []);

  return (
    <>
      {/* <Map initialViewState={{ latitude: 40, longitude: -100, zoom: 3.5 }} {...other} > */}
      {marker && (
        <Map initialViewState={{ latitude: marker?.latitude, longitude: marker?.longitude, zoom: 5.5 }} {...other} >
          <MapControl />

          <MapMarker
            longitude={marker?.longitude}
            latitude={marker?.latitude}
            anchor="bottom"
            draggable={other?.draggable || true}
            onDragStart={onMarkerDragStart}
            onDrag={onMarkerDrag}
            onDragEnd={onMarkerDragEnd}
          />
        </Map>
      )}
      {/* <ControlPanel events={events} /> */}
    </>
  );
}

export default memo(MapDraggableMarkers);
