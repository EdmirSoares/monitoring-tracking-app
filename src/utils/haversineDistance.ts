import { Coordinate } from "../screens/LocationRegister/backgroundTasks";

    export const haversineDistance = (
        coord1: Coordinate,
        coord2: Coordinate
    ): number => {
        const toRad = (value: number) => (value * Math.PI) / 180;

        const R = 6371000;
        const dLat = toRad(coord2.latitude - coord1.latitude);
        const dLon = toRad(coord2.longitude - coord1.longitude);

        const lat1 = toRad(coord1.latitude);
        const lat2 = toRad(coord2.latitude);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) *
                Math.cos(lat2) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    };