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

    /** Short feedback summary */
    summary: string;

    /** Feedback description */
    description: string;

    /** Feedback submitting user's name */
    name: string;

    /** Feedback timestamp */
    timeStamp: Date;

    /** Information about the client machine/operating system */
    clientInfo: {platformInfo: Platform, userAgent: string};

    /** Is the feedback a feature request or bug report */
    feedbackType: string;

    /** Checks the form object for validity criteria */
    isValid(): boolean{
        // needs to have summary
        return this.summary != null;
      }
}