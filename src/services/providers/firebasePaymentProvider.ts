import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import {
  PaymentProvider,
  PaymentInitInput,
  PaymentInitResult,
  PaymentConfirmInput,
  PaymentCaptureInput,
  PaymentRefundInput,
} from "./paymentProvider";

export class FirebasePaymentProvider implements PaymentProvider {
  async initPayment(input: PaymentInitInput): Promise<PaymentInitResult> {
    const ref = await addDoc(collection(db, "paymentIntents"), {
      ...input,
      status: "authorized",
      provider: "firebase-first",
      createdAt: serverTimestamp(),
    });
    return {
      providerRef: ref.id,
      status: "authorized",
    };
  }

  async confirm3DS(_input: PaymentConfirmInput): Promise<{ status: "authorized" | "failed" }> {
    return { status: "authorized" };
  }

  async capture(input: PaymentCaptureInput): Promise<{ status: "captured" | "failed" }> {
    await addDoc(collection(db, "transactions"), {
      type: "payment_capture",
      providerRef: input.providerRef,
      amount: input.amount,
      status: "captured",
      createdAt: serverTimestamp(),
    });
    return { status: "captured" };
  }

  async refund(input: PaymentRefundInput): Promise<{ status: "refunded" | "failed" }> {
    await addDoc(collection(db, "transactions"), {
      type: "payment_refund",
      providerRef: input.providerRef,
      amount: input.amount,
      reason: input.reason,
      status: "refunded",
      createdAt: serverTimestamp(),
    });
    return { status: "refunded" };
  }
}
