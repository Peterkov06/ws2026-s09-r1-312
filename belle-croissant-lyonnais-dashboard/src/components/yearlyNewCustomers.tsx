import { YearlyTrendModel } from "~/models";
import { LineChart } from "./ui/charts";

const YearlyNewCustomers = (props: { yearlyTrend: YearlyTrendModel[] | undefined }) => {
    const chartData = {
        labels: props.yearlyTrend?.map((trend) => trend.year.toString()) ?? [],
        datasets: [
          {
            label: "New Customers",
            data: props.yearlyTrend?.map((trend) => trend.registers ?? 0) ?? [],
            fill: true
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
        responsive: true,

    }

    return (
        <div class="bg-[#f9f0e0] rounded-[10px] p-4">
            <p class="text-2xl font-bold">Yearly New Customers</p>
            <div class="max-h-[200px]">
                <LineChart data={chartData} options={options} />
            </div>
        </div>
    )
}

export default YearlyNewCustomers;
