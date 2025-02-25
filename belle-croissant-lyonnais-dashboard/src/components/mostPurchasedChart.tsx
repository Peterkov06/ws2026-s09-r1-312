import { BarChart } from "./ui/charts";

const MostPurchasedChart = (props: { mostPurchased: Record<string,number> | undefined }) => {
    const chartData = {
        labels: Object.keys(props.mostPurchased ?? {}),
        datasets: [
          {
            label: "Number purchased products per category",
            data: Object.values(props.mostPurchased ?? {})
          }
        ]
      }
      const options = {
        plugins: {
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                bodyFont: {
                  size: 14
                },
            },
            legend:
            {
                display: false
            }
        },
        maintainAspectRatio: false,
        responsive: true
    }
    return (
        <div class="bg-[#f9f0e0] rounded-[10px] p-4 max-h-fit overflow-x-auto overflow-y-hidden">
            <p class="text-2xl font-bold">Most Purchased categories</p>
            <div class="flex flex-col h-full justify-center">
              <div class="max-h-[90%] w-full">
                  <BarChart data={chartData} options={options}/>
              </div>
            </div>
        </div>
    )
}

export default MostPurchasedChart;
