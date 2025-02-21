
namespace Belle_Croissant_Lyonnais_Dashboard_API.Models
{
    public class OverViewMetricsModel
    {
        public OverViewMetricsModel(int totalCostumers, float averageAge, string mostFrequentPurchaseCategory, float totalPurchaseValue, float averageOrderValue, float purchaseFrequency)
        {
            TotalCustomers = totalCostumers;
            AverageAge = averageAge;
            MostFrequentPurchaseCategory = mostFrequentPurchaseCategory ?? "n/a";
            TotalPurchaseValue = totalPurchaseValue;
            AverageOrderValue = averageOrderValue;
            PurchaseFrequency = purchaseFrequency;
        }

        public int TotalCustomers { get; set; }
        public float AverageAge { get; set; }
        public string MostFrequentPurchaseCategory { get; set; }
        public float TotalPurchaseValue { get; set; }
        public float AverageOrderValue { get; set; }

        public float PurchaseFrequency { get; set; }

    }
}
