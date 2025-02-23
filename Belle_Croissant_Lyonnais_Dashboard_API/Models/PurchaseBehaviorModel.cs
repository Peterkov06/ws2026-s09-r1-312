namespace Belle_Croissant_Lyonnais_Dashboard_API.Models
{
    public class PurchaseBehaviorModel
    {
        public required Dictionary<string, int> MostPurchasedCategories { get; set; }
        public required Customer[] TopSpenders { get; set; }
    }
}
