export type LocationPoint = {
    latitude: number;
    longitude: number;
    timestamp: string;
};

export type Coordinate = {
    latitude: number;
    longitude: number;
    timestamp: string;
};

export type ICoord = {
    latitude: number;
    longitude: number;
    timestamp?: string;
};

export type LocationTaskData = {
    locations: Array<{
        coords: {
            latitude: number;
            longitude: number;
        };
        timestamp: number;
    }>;
};

export type Shift = {
    id: string;
    startedAt: string;
    endedAt: string;
    locationPoints: LocationPoint[];
};

export type PilotShifts = {
    pilotId: string;
    pilotName: string;
    shifts: Shift[];
};

export type ShiftsResponse = {
    shifts: PilotShifts[];
};

export type ShiftDetails = {
    distance: number;
    averageSpeed: number;
    duration: number;
};