import { OverViewMetricsModel, PurchaseBehaviorModel, YearlyTrendModel } from "~/models";
import DemographicsChart from "../components/demographicsChart";
import MostPurchasedChart from "../components/mostPurchasedChart";
import OverviewCounter from "../components/overviewCounter";
import TopSpendersTable from "../components/topSpendersTable";
import YearlyNewCustomers from "../components/yearlyNewCustomers";
import { createEffect, createSignal, Show } from "solid-js";

const MainScreenPart = () => {
    const [overviewMetrics, setOverviewMetrics] = createSignal<OverViewMetricsModel>();
    const [demographics, setDemographics] = createSignal<Record<string,number>[]>();
    const [purchaseBehavior, setPurchaseBehavior] = createSignal<PurchaseBehaviorModel>();
    const [yearlyTrend, setYearlyTrend] = createSignal<YearlyTrendModel[]>();

    const API_URL = 'http://localhost:8080';

    createEffect(() => {
        fetchOverviewMetrics();
        fetchDemographics();
        fetchPurchaseBehavior();
        fetchYearlyTrend();});

    const fetchOverviewMetrics = async () => {
        try {
            const response = await fetch(`${API_URL}/api/overviewmetrics`);
            if (response.ok) {
                const data = await response.json();
                setOverviewMetrics(data);
            }
            else {
                console.error("Failed to fetch overview metrics");
            }
        }
        catch (error) {
            console.error("Failed to fetch overview metrics", error);
        }
    };

    const fetchDemographics = async () => {
        try {
            const response = await fetch(`${API_URL}/api/demographics`);
            if (response.ok) {
                const data = await response.json();
                setDemographics(data);
            }
            else {
                console.error("Failed to fetch demographics");
            }
        }
        catch (error) {
            console.error("Failed to fetch demographics", error);
        }
    };

    const fetchPurchaseBehavior = async () => {
        try {
            const response = await fetch(`${API_URL}/api/purchasebehavior`);
            if (response.ok) {
                const data = await response.json();
                setPurchaseBehavior(data);
            }
            else {
                console.error("Failed to fetch purchase behavior");
            }
        }
        catch (error) {
            console.error("Failed to fetch purchase behavior", error);
        }
    };

    const fetchYearlyTrend = async () => {
        try {
            const response = await fetch(`${API_URL}/api/trendsovertime`);
            if (response.ok) {
                const data = await response.json();
                setYearlyTrend(data);
            }
            else {
                console.error("Failed to fetch yearly trends");
            }
        }
        catch (error) {
            console.error("Failed to fetch yearly trends", error);
        }
    };
    
    return (
        <div class='md:col-span-4 col-span-3 flex flex-col gap-4'>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <Show when={overviewMetrics()} fallback={<div class="bg-[#d1a55c] w-full rounded-[10px] p-10">No overview metrics data could be found<br/>(Is the ASP.NET server running?)</div>}>
                    <OverviewCounter title="Total Customers" value={overviewMetrics()?.totalCustomers} />
                    <OverviewCounter title="Average Age" value={overviewMetrics()?.averageAge} />
                    <OverviewCounter title="Most Frequent Purchase Category" value={overviewMetrics()?.mostFrequentPurchaseCategory} />
                    <OverviewCounter title="Total Purchase Value" value={overviewMetrics()?.totalPurchaseValue} />
                    <OverviewCounter title="Average Order Value" value={overviewMetrics()?.averageOrderValue} />
                    <OverviewCounter title="Purchase Frequency" value={overviewMetrics()?.purchaseFrequency} />
                </Show>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-min">
                <Show when={demographics()?.[0]} fallback={<div class="bg-[#f9f0e0] w-full rounded-[10px] p-10">No demographics data could be found<br/>(Is the ASP.NET server running?)</div>}>
                    <DemographicsChart title="Gender Distribution" demographics={demographics()?.[0]} chartColors={['#36A2EB', '#FF6384']} />
                </Show>
                <Show when={demographics()?.[1]} fallback={<div class="bg-[#f9f0e0] w-full rounded-[10px] p-10">No demographics data could be found<br/>(Is the ASP.NET server running?)</div>}>
                    <DemographicsChart title="Membership level Distribution" demographics={demographics()?.[1]} chartColors={['#CD7F32', '#C0C0C0', '#FFD700',]} />
                </Show>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Show when={purchaseBehavior()?.mostPurchasedCategories} fallback={<div class="bg-[#f9f0e0] w-full rounded-[10px] p-10">No purchase behavior data could be found<br/>(Is the ASP.NET server running?)</div>}>
                    <MostPurchasedChart mostPurchased={purchaseBehavior()?.mostPurchasedCategories} />
                </Show>
                <Show when={purchaseBehavior()?.topSpenders} fallback={<div class="bg-[#f9f0e0] w-full rounded-[10px] p-10">No purchase behavior data could be found<br/>(Is the ASP.NET server running?)</div>}>
                    <TopSpendersTable topSpenders={purchaseBehavior()?.topSpenders} />
                </Show>
            </div>
            <Show when={yearlyTrend()} fallback={<div class="bg-[#f9f0e0] w-full rounded-[10px] p-10">No yearly trend data could be found<br/>(Is the ASP.NET server running?)</div>}>
                <YearlyNewCustomers yearlyTrend={yearlyTrend()} />
            </Show>
        </div>
    )
}

export default MainScreenPart;
