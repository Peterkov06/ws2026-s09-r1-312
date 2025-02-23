const OverviewCounter = (props:{title: string, value: any}) => {
    return (
        <div class="bg-[#d1a55c] rounded-[10px] p-2 flex flex-col items-center justify-center">
            <p class="text-2xl font-bold">{props.value}</p>
            <p class="text-sm italic text-center mt-2">{props.title}</p>
        </div>
    )
}

export default OverviewCounter;
