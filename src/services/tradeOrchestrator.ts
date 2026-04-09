import { FirebaseNotificationProvider } from "./providers/firebaseNotificationProvider";
import { FirebasePaymentProvider } from "./providers/firebasePaymentProvider";
import { FirebaseKycProvider } from "./providers/firebaseKycProvider";

const paymentProvider = new FirebasePaymentProvider();
const notificationProvider = new FirebaseNotificationProvider();
const kycProvider = new FirebaseKycProvider();

export const tradeOrchestrator = {
  paymentProvider,
  notificationProvider,
  kycProvider,
};
