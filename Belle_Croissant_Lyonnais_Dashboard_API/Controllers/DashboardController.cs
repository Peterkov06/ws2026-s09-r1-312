using Belle_Croissant_Lyonnais_Dashboard_API.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Belle_Croissant_Lyonnais_Dashboard_API.Controllers
{
    [Route("api/" +
        "")]
    [ApiController]
    public class DashboardController: ControllerBase
    {
        private readonly IHttpClientFactory _clientFactory;

        public DashboardController(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        private async Task<List<Customer>?> GetCustomers()
        {
            try
            {
                var client = _clientFactory.CreateClient();
                var response = await client.GetAsync("http://localhost:3000/customers");
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<List<Customer>>(content);
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }

        [HttpGet("overviewmetrics")]
        public async Task<OverViewMetricsModel> GetOverviewMetrics()
        {
            int customerCount = 0;
            float avgAge = 0;
            float totalPurchaseValue = 0;
            float avgOrderValue = 0;
            float purchaseFrequency = 0;
            string mostFrequentPurchaseCategory = "";
            var customers = await GetCustomers();
            if (customers != null)
            {
                customerCount = customers.Count;
                int validAgeNum = 0;
                int validOrderValue = 0;
                int validFreq = 0;
                foreach (var customer in customers)
                {
                    if (customer.Age > 0)
                    {
                        avgAge += customer.Age;
                        validAgeNum++;
                    }
                    if (customer.AverageOrderValue >= 0)
                    {
                        avgOrderValue += customer.AverageOrderValue;
                        validOrderValue++;
                    }
                    if (customer.Frequency > 0)
                    {
                        purchaseFrequency += customer.Frequency;
                        validFreq++;
                    }
                    totalPurchaseValue += customer.TotalSpending;
                }
                avgAge /= validAgeNum;
                avgOrderValue /= validOrderValue;
                purchaseFrequency /= validFreq;
                mostFrequentPurchaseCategory = customers.GroupBy(c => c.PreferredCategory)
                    .OrderByDescending(g => g.Count())
                    .Select(g => g.Key)
                    .First()?? "";
            }
            return new OverViewMetricsModel(customerCount, avgAge, mostFrequentPurchaseCategory, totalPurchaseValue, avgOrderValue, purchaseFrequency);
        }

        [HttpGet("demographics")]
        public async Task<Dictionary<string, int>[]> GetDemographics()
        {
            int maleNum = 0;
            int femaleNum = 0;
            int bronzeCategoryNum = 0;
            int silverCategoryNum = 0;
            int goldCategoryNum = 0;
            var customers = await GetCustomers();
            if (customers != null)
            {
                maleNum = customers.Where(cust => cust.Gender == "M").Count();
                femaleNum = customers.Where(cust => cust.Gender == "F").Count();
                bronzeCategoryNum = customers.Where(cust => cust.Membership == "bronze").Count();
                silverCategoryNum = customers.Where(cust => cust.Membership == "silver").Count();
                goldCategoryNum = customers.Where(cust => cust.Membership == "gold").Count();
            }
            return [
                new Dictionary<string, int>{
                    {"Male", maleNum},
                    {"Female", femaleNum}
                },
                new Dictionary<string, int>{
                    {"Bronz", bronzeCategoryNum},
                    {"Silver", silverCategoryNum},
                    {"Gold", goldCategoryNum}
                },
            ];
        }

        [HttpGet("purchasebehavior")]
        public async Task<PurchaseBehaviorModel> GetPurchaseBehavior()
        {
            Dictionary<string, int> mostPurchasedCategories = [];
            Customer[] topSpenders = new Customer[10];
            var customers = await GetCustomers();
            if (customers != null)
            {
                mostPurchasedCategories = customers.Where(c => c.PreferredCategory != "").GroupBy(c => c.PreferredCategory)
                    .OrderByDescending(g => g.Count())
                    .Take(10).ToDictionary(x => x.Key, x => x.Count());
                topSpenders = customers.OrderByDescending(c => c.TotalSpending).Take(10).ToArray();
            }
            return new PurchaseBehaviorModel { MostPurchasedCategories = mostPurchasedCategories, TopSpenders = topSpenders };
        }

        [HttpGet("trendsovertime")]
        public async Task<YearlyTrendModel[]> YearlyTrends()
        {
            var customers = await GetCustomers();
            if (customers != null)
            {
                var yearlyTrends = customers.Where(c => c.JoinedAt > DateTime.MinValue).GroupBy(c => c.JoinedAt.Year)
                    .Select(g => new YearlyTrendModel { Year = g.Key, Registers = g.Count() }).OrderBy(y => y.Year)
                    .ToArray();
                return yearlyTrends;
            }
            return [];
        }
    }
}
