using System.Text.Json.Serialization;

namespace Belle_Croissant_Lyonnais_Dashboard_API.Models
{
    public class Customer
    {
        public Customer(string id, string firstName, string lastName, float? age, string gender, string postalCode, string email, string phone, string membership, DateTime? joinedAt, DateTime? lastPurchaseAt, float? totalSpending, float? averageOrderValue, float? frequency, string preferredCategory, bool? churned)
        {
            Id = id ?? "";
            FirstName = firstName ?? "";
            LastName = lastName ?? "";
            Age = age ?? 0;
            Gender = gender ?? "";
            PostalCode = postalCode ?? "";
            Email = email ?? "";
            Phone = phone ?? "";
            Membership = membership ?? "";
            JoinedAt = joinedAt ?? DateTime.MinValue;
            LastPurchaseAt = lastPurchaseAt ?? DateTime.MinValue;
            TotalSpending = totalSpending ?? 0;
            AverageOrderValue = averageOrderValue ?? -1;
            Frequency = frequency ?? 0;
            PreferredCategory = preferredCategory ?? "";
            Churned = churned ?? false;
        }

        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public float Age { get; set; }
        public string Gender { get; set; }
        public string PostalCode { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Membership { get; set; }
        public DateTime JoinedAt { get; set; }
        public DateTime LastPurchaseAt { get; set; }
        public float TotalSpending { get; set; }
        public float AverageOrderValue { get; set; }
        public float Frequency { get; set; }
        public string PreferredCategory { get; set; }
        public bool Churned { get; set; }
    }
}
