export interface INavigationData {
  timestamp: number;
  location: string;
}

export const EXCLUSION_PATH_REGEX = [
  '^\/otp\/login\/(WA|SMS)-[0-9]{10,14}\/[0-3]',
  '^\/otp\/register\/(WA|SMS)-[0-9]{10,14}\/[0-3]',
  '^/checkout/payment-method'
]