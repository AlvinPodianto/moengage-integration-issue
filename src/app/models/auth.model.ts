export class UserLogin {
  phone: string;
  otp: string;

  constructor() {
    this.phone = '';
    this.otp = '';
  }
}

export class UserLoginEmail {
  username: string;
  password: string;

  constructor() {
    this.username = '';
    this.password = '';
  }
}

export class UserLoginSocial {
  providerToken: string;
  constructor() {
    this.providerToken = '';
  }
}

export class UserVerify {
  phone: string;
  otp: string;

  constructor() {
    this.phone = '';
    this.otp = '';
  }
}

export class UserRegister {
  name: string;
  phone: string;
  email: string;
  password: string;
  referralCode: string;
  registrationToken: string;
  constructor() {
    this.name = "";
    this.phone = "";
    this.email = "";
    this.password = "";
    this.referralCode = "";
    this.registrationToken = "";
  }
}

export class JwtToken {
  accessToken: string;
  refreshToken: string;
  expires: number;

  constructor() {
    this.accessToken = '';
    this.refreshToken = '';
    this.expires = 0;
  }
}

export class PartnerInfo {
  partnerId: number;
  partnerCode: string;
  partnerName: string;

  constructor() {
    this.partnerId = 0;
    this.partnerCode = '';
    this.partnerName = '';
  }
}

export class PartnerToken {
  token: string;

  constructor() {
    this.token = '';
  }
}


export class UserInfo {
  userID: number;
  fullName: string;
  email: string;
  customerName: string;
  customerID: number;

  constructor() {
    this.fullName = '';
    this.email = '';
    this.userID = 0;
    this.customerName = '';
    this.customerID = 0;
  }
}

export class UserPermission {
  module: string;
  permissions: string[];
  Module: string;

  constructor() {
    this.module = '';
    this.permissions = [];
  }
}

// this class for user forgot password
export class UserForgot {
  username: string;
  newPassword: string;
  forgotPasswordToken: string;
  constructor() {
    this.username = '';
    this.newPassword = '';
    this.forgotPasswordToken = '';
  }
}

// this class for user create password
export class UserCreatePassword {
  registrationToken: string;
  password: string;
  constructor() {
    this.registrationToken = '';
    this.password = '';
  }
}
export class UserSocmedCreatePassword extends UserLogin {
  password: string;

  constructor() {
    super();
    this.password = "";
  }
}

export class ChangeVerification {
  otp: string;
  method: string;
  value: string; 
  constructor() {
    this.otp = '';
    this.method = '';
    this.value = ''; 
  }
} 

export class PostCreatePassword {
  phone: string; 
  password: string; 
  otp: string; 
  constructor() {
    this.phone = '';
    this.password = '';
    this.otp = ''; 
  }
} 