import {
  PaymentProvider,
  PaymentInitInput,
  PaymentInitResult,
  PaymentConfirmInput,
  PaymentCaptureInput,
  PaymentRefundInput,
} from './paymentProvider';

// Placeholder: gerçek Shopier entegrasyonu erişim gelince yapılacak.
export class ShopierPaymentProvider implements PaymentProvider {
  async initPayment(_input: PaymentInitInput): Promise<PaymentInitResult> {
    // Shopier entegrasyonu aktif değilse kullanıcıya açıklayıcı hata mesajı dön
    return {
      providerRef: 'shopier-not-configured',
      status: 'requires_action',
      redirectUrl: undefined,
      // @ts-ignore
      errorMessage: 'Shopier ödeme altyapısı şu anda aktif değildir. Lütfen başka bir ödeme yöntemi seçin.'
    };
  }

  async confirm3DS(_input: PaymentConfirmInput): Promise<{ status: 'authorized' | 'failed', errorMessage?: string }> {
    return { status: 'failed', errorMessage: 'Shopier ödeme altyapısı şu anda aktif değildir.' };
  }

  async capture(_input: PaymentCaptureInput): Promise<{ status: 'captured' | 'failed', errorMessage?: string }> {
    return { status: 'failed', errorMessage: 'Shopier ödeme altyapısı şu anda aktif değildir.' };
  }

  async refund(_input: PaymentRefundInput): Promise<{ status: 'refunded' | 'failed', errorMessage?: string }> {
    return { status: 'failed', errorMessage: 'Shopier ödeme altyapısı şu anda aktif değildir.' };
  }
}

