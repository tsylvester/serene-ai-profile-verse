
export type SubscriptionTier = 'free' | 'basic' | 'premium' | 'enterprise';

export interface SubscriptionPrice {
  id: string;
  productId: string;
  name: string;
  description?: string;
  amount: number;
  currency: string;
  interval: 'month' | 'year' | 'one-time';
  trialDays?: number;
  features?: string[];
}

export interface SubscriptionProduct {
  id: string;
  name: string;
  description?: string;
  tier: SubscriptionTier;
  isPopular?: boolean;
  prices: SubscriptionPrice[];
  features: string[];
}

export interface Subscription {
  id: string;
  userId: string;
  status: 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid';
  tier: SubscriptionTier;
  priceId: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionState {
  products: SubscriptionProduct[];
  subscription: Subscription | null;
  isLoading: boolean;
  error: string | null;
}

export interface CreateCheckoutSessionRequest {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CreatePortalSessionRequest {
  returnUrl: string;
}
