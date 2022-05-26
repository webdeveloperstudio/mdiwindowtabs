export interface trackInterface{
    error: string;
    filename: string;
    stackName?: string;
};

export class errorHandler {

    constructor(){ }

    static errorHandler(pTrack: trackInterface | null = null) {
        let vStackName: string = pTrack?.stackName || 'unknown';
        console.log(`%cFilename:${pTrack?.filename} Stack:${vStackName}`,"color: red; font-size: 20px");
        console.log(`%c${pTrack?.error}`,"color: red; font-size: 20px");
    }
}