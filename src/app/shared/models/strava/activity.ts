import { MetaAthlete } from "./metaathlete";
import { PolylineMap } from "./polylinemap";

/**
 * Strava Api Model: Summary Activity
 * https://developers.strava.com/docs/reference/#api-models-SummaryActivity
 */
export interface SummaryActivity {
    /** The unique identifier of the activity */
    id: number;

    /** The identifier provided at upload time */
    external_id: string;

    /** The identifier of the upload that resulted in this activity */
    upload_id: number;

    /** The (str)identifier of the upload that resulted in this activity */
    upload_id_str: string;

    /** The number of achievements gained during this activity */
    achievement_count: number;

    /** The number of comments for this activity */
    comment_count: number;

    /** Whether the logged-in athlete has kudoed this activity */
    has_kudoed: boolean;

    /** The number of kudos given for this activity */
    kudos_count: number;

    /** Whether this activity was created manually */
    manual: boolean;

    /** The name of the activity */
    name: string;

    /** The number of Instagram photos for this activity */
    photo_count: number;

    /** The number of Instagram and Strava photos for this activity */
    total_photo_count: number;

    /** (blank description) */
    pr_count: number;

    /** Whether this activity is private */
    private: boolean;

    /** (blank description) */
    visibility: string;

    /** blankdescription */
    display_hide_heartrate_option: boolean;

    /** blankdescription */
    has_heartrate: boolean;

    /** blankdescription */
    heartrate_opt_out: boolean;

    /** An instance of MetaAthlete */
    athlete : MetaAthlete;

    /** The number of athletes for taking part in a group activity */
    athlete_count: number;

    /** blankdescription */
    average_heartrate: number;

    /** The activity's average speed, in meters per second */
    average_speed: number;

    /** Average power output in watts during this activity. Rides only */
    average_watts: number;

    /** Whether the watts are from a power meter, false if estimated */
    device_watts: boolean;

    /** The activity's distance, in meters */
    distance: number;

    /** The activity's elapsed time, in seconds */
    elapsed_time: number;

    /** The activity's highest elevation, in meters */
    elev_high: number;

    /** The activity's lowest elevation, in meters */
    elev_low: number;

    /** The activity's total elevation gain */
    total_elevation_gain: number;

    /** The total work done in kilojoules during this activity. Rides only */
    kilojoules: number;

    /** blankdescription */
    max_heartrate: number;

    /** The activity's max speed, in meters per second */
    max_speed: number;

    /** The activity's moving time, in seconds */
    moving_time: number;

    /** The timezone of the activity */
    timezone: string;

    /** blankdescription */
    utc_offset: number;

    /** The time at which the activity was started */
    start_date: string;

    /** The time at which the activity was started in the local timezone */
    start_date_local: string;

    /** Whether this activity is a commute */
    commute: boolean;

    /** The id of the gear for the activity */
    gear_id: string;

    /** An instance of ActivityType */
    type: string;

    /** The activity's workout type */
    workout_type: number;

    /** blankdescription */
    location_city: string;

    /** blankdescription */
    location_country: string;

    /** blankdescription */
    location_state: string;

    /** blankdescription */
    start_latitude: number;

    /** An instance of LatLng */
    start_latlng: [number, number];

    /** blankdescription */
    start_longitude: number;

    /** An instance of LatLng */
    end_latlng: [number, number];

    /** An instance of PolylineMap */
    map: PolylineMap;

    /** Whether this activity is flagged */
    flagged: boolean;

    /** blankdescription */
    from_accepted_tag: boolean;

    /** blankdescription */
    resource_state: number;

    /** Whether this activity was recorded on a training machine */
    trainer: boolean;
  }