export class NoResultData{
    title?:string;
    text?:string;
    buttonText?:string;
    routerLink?:string;
    imgUrl?:string;

    constructor()
    {
        this.title = "";
        this.text = "";
        this.buttonText = "";
        this.routerLink = "";
        this.imgUrl = "";
    }
}

export class LoadingData{
    showDuration?:number;
    styleClass?:string;
    message?:string;
    showBackdrop?:boolean;
}

export class ShareQuery{
    url:string;
    text:string;
    title:string;

    constructor()
    {
        this.url = "";
        this.text = "";
        this.title = "";
    }
}