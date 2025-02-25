const OverviewCounter = (props:{title: string, value: any}) => {
    return (
        <div class="bg-[#d1a55c] rounded-[10px] p-2 flex flex-col items-center justify-center">
            <p class="text-base sm:text-md md:text-lg lg:text-xl font-bold bg-[#f9f0e0] rounded-[8px] p-2 w-full text-center overflow-x-auto">{props.value}</p>
            <p class="text-xs sm:text-sm italic text-center mt-2 overflow-x-auto">{props.title}</p>
        </div>
    )
}

export default OverviewCounter;
