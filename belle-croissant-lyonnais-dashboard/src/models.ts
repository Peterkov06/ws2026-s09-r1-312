export interface YearlyTrendModel {
    year: number;
    registers: number;
}

export interface PurchaseBehaviorModel {
    mostPurchasedCategories: Record<string,number>;
    topSpenders: Customer[];
}

export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    postalCode: string;
    email: string;
    phone: string;
    membership: string;
    joinedAt: Date;
    lastPurchaseAt: Date;
    totalSpending: number;
    averageOrderValue: number;
    frequency: number;
    preferredCategory: string;
    churned: boolean;
}

export interface OverViewMetricsModel {
    totalCustomers: number;
    averageAge: number;
    mostFrequentPurchaseCategory: string;
    totalPurchaseValue: number;
    averageOrderValue: number;
    purchaseFrequency: number;
}

export interface DemographicsModel {
    maleNum: number;
    femaleNum: number;
    bronzeCategoryNum: number;
    silverCategoryNum: number;
    goldCategoryNum: number;
}