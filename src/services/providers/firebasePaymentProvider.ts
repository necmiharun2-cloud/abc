import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
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
    const requiresAction = input.method === "card";
    const intentStatus = requiresAction ? "requires_action" : "authorized";
    const ref = await addDoc(collection(db, "paymentIntents"), {
      ...input,
      status: intentStatus,
      provider: "firebase-first",
      createdAt: serverTimestamp(),
    });
    return {
      providerRef: ref.id,
      status: intentStatus,
      redirectUrl: requiresAction ? `/odeme/3ds/${ref.id}` : undefined,
    };
  }

  async confirm3DS(input: PaymentConfirmInput): Promise<{ status: "authorized" | "failed" }> {
    await updateDoc(doc(db, "paymentIntents", input.providerRef), {
      status: "authorized",
      authorizedAt: serverTimestamp(),
    });
    return { status: "authorized" };
  }

  async capture(input: PaymentCaptureInput): Promise<{ status: "captured" | "failed" }> {
    await addDoc(collection(db, "transactions"), {
      userId: input.userId,
      type: "payment_capture",
      amount: input.amount,
      fee: 0,
      status: "captured",
      relatedId: input.providerRef,
      createdAt: serverTimestamp(),
    });
    await updateDoc(doc(db, "paymentIntents", input.providerRef), {
      status: "captured",
      capturedAt: serverTimestamp(),
    });
    return { status: "captured" };
  }

  async refund(input: PaymentRefundInput): Promise<{ status: "refunded" | "failed" }> {
    await addDoc(collection(db, "transactions"), {
      userId: input.userId,
      type: "payment_refund",
      amount: input.amount,
      fee: 0,
      status: "refunded",
      relatedId: input.providerRef,
      reason: input.reason,
      createdAt: serverTimestamp(),
    });
    await updateDoc(doc(db, "paymentIntents", input.providerRef), {
      status: "refunded",
      refundedAt: serverTimestamp(),
    });
    return { status: "refunded" };
  }
}
