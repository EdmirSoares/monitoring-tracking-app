/* import MapView, { PROVIDER_GOOGLE, MapViewProps, LatLng } from "react-native-maps";

type Props = MapViewProps & {
    coordinates: LatLng[];
}

export const Map = ({coordinates, ...rest}: Props) => {
    const lastCoordinate = coordinates[coordinates.length - 1];
    return (
        <MapView
            style={{ width: "100%", flex: 1 }}
            provider={PROVIDER_GOOGLE}
            region={{
                latitude: lastCoordinate.latitude,
                longitude: lastCoordinate.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
            /* initialRegion={{
                latitude: -23.5505,
                longitude: -46.6333,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }} */

            //{...rest}
            /* showsUserLocation={true} */
       // />
 //   );
//};