import { PieChart } from "./ui/charts";

const DemographicsChart = (props: { title: string, demographics: Record<string,number> | undefined, chartColors: string[] }) => {
    const chartData = {
        labels: Object.keys(props.demographics ?? {}),
        datasets: [
            {
                data: Object.values(props.demographics ?? {}),
                backgroundColor: props.chartColors
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
            <p class="text-2xl font-bold">{props.title}</p>
            <div class="flex flex-row">
                <div class="max-w-[160px] max-h-[160px] m-2">
                    <PieChart data={chartData} options={options} />
                </div>
                <div class="flex flex-col m-2 gap-2 justify-center">
                    {Object.keys(props.demographics ?? {}).map((key, index) => (
                        <div class="flex flex-row">
                            <div class={`w-5 h-5 rounded-full self-center mr-2`} style={{'background-color': props.chartColors[index]}}></div>
                            <p>{key}: {props.demographics?.[key]}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DemographicsChart;
