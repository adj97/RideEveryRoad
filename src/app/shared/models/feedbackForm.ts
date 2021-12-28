import { Platform } from "@angular/cdk/platform";

/**
 * Class model for the feedback form dialog
 */
export class feedbackForm{
    constructor(platformInfo: Platform, userAgent: string, date: Date){
        this.clientInfo = {
            platformInfo: platformInfo,
            userAgent: userAgent
        };
        this.timeStamp = date;
    }

    summary: string;
    description: string;
    name: string;

    timeStamp: Date;

    clientInfo: {platformInfo: Platform, userAgent: string};

    feedbackType: string;

    /** The unique identifier of the athlete */
    id: number;

    /** Resource state, indicates level of detail */
    resource_state: number;
}