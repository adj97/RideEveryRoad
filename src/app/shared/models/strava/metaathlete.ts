/**
 * Strava Api Model: MetaAthlete
 * https://developers.strava.com/docs/reference/#api-models-MetaAthlete
 */
export interface MetaAthlete{
    /** The unique identifier of the athlete */
    id: number;

    /** Resource state, indicates level of detail */
    resource_state: number;
}