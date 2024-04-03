export class UserGeneratePassword{
    password:string;
    newPassword:string;

    constructor()
    {
        this.password = "";
        this.newPassword = "";
    }
}

export class Profile{
    id: number;
    name: string;
    phone: string;
    email: string;
    gender: string;
    birthDate: string;
    weight: number;
    height: number;
    hasPassword: boolean;
    isAddressFilled:boolean;
    isVerified:boolean;
    totalPoint: number;
    totalChallange: number;
    totalCoupon: number;
    totalUnreviewProduct: number;
    isNeedVerifyEmail:boolean;
    isCompleted:boolean;
    cardNumber:string;
    constructor()
    {
        this.id = 0;
        this.name = "";
        this.phone = "";
        this.email = "";
        this.gender = "";
        this.birthDate = "";
        this.weight = 0;
        this.height = 0;
        this.isVerified = true;
        this.isAddressFilled = false;
        this.hasPassword = true;
        this.totalPoint = 0;
        this.totalChallange = 0;
        this.totalCoupon = 0;
        this.totalUnreviewProduct = 0;
        this.isNeedVerifyEmail=false;
        this.isCompleted=false;
        this.cardNumber="";
    }
}