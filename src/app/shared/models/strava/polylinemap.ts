/**
 * Strava Api Model: PolylineMap
 * https://developers.strava.com/docs/reference/#api-models-PolylineMap
 */
export interface PolylineMap{
    /** The identifier of the map */
    id: number;

    /** The summary polyline of the map */
    summary_polyline: string;

    /** Resource state, indicates level of detail */
    resource_state: number;
}