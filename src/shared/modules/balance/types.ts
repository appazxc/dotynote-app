export interface MockBalanceData {
  credits: {
    current: number;
    nextAllocation: string;
    allocationAmount: number;
  };
  doty: {
    current: number;
    nextAllocation: string;
    allocationAmount: number;
  };
  storage: {
    total: number;
    used: number;
    breakdown: {
      documents: number;
      videos: number;
      audio: number;
      images: number;
      files: number;
    };
  };
}

export interface PricingPlan {
  id: string;
  title: string;
  description: string;
  price: number;
  credits: number;
  doty: number;
  isPopular?: boolean;
  isCustom?: boolean;
  badge?: string;
}

export interface StorageUsageSectionProps {
  totalUsed: number;
  totalCapacity: number;
  breakdown: Record<string, number>;
}

export interface PurchasePackagesSectionProps {
  packages: PricingPlan[];
  onPurchase: (packageId: string) => void;
}

export interface StorageUsageItemProps {
  icon: React.ReactElement;
  label: string;
  value: number;
}
