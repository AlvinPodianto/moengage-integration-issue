export declare type Action = 'click' | 'screenView' | 'swipe' | 'scroll' | 'submit' | 'pageLoad';

export class LogData {
    sessionId: string;
    action: Action;
    pageName: string;
    actionValue: string;
    actionLabel: string;
    responseCode: number;
    codeDescription: string;
    constructor() {
        this.sessionId= sessionStorage.getItem('sessionId');
        this.action= 'screenView';
        this.pageName= "";
        this.actionValue= "";
        this.actionLabel= "";
        this.responseCode= 200;
        this.codeDescription= "";
    }
}