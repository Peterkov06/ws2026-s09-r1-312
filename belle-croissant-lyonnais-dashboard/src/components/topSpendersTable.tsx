import { Customer } from "~/models";
import { Table, TableCaption, TableHead, TableHeader, TableBody, TableCell, TableRow } from "./ui/table";
import { For } from "solid-js";

const TopSpendersTable = (props: { topSpenders: Customer[] | undefined }) => {
    return (
        <div class="bg-[#f9f0e0] rounded-[10px] p-4 flex flex-col gap-2 overflow-x-auto">
            <p class="text-2xl font-bold">Top Spenders</p>
            <div class="max-h-[300px] overflow-y-scroll">
                <Table>
                <TableCaption>A list of the top 10 spenders.</TableCaption>
                <TableHeader>
                    <TableRow class="text-lg bg-[#8B4513] rounded-[20px] text-white">
                        <TableHead class="text-left font-bold">Rank</TableHead>
                        <TableHead class="text-right font-bold">Name</TableHead>
                        <TableHead class="text-left font-bold">Total spending</TableHead>
                    </TableRow> 
                </TableHeader>
                <TableBody>
                    <For each={props.topSpenders}>
                        {(spender, index) => (
                            <TableRow class="hover:bg-[#fae1bf] transition-colors">
                                <TableCell class="text-right font-bold">{index() + 1}.</TableCell>
                                <TableCell class="font-bold text-right">{spender.firstName} {spender.lastName}</TableCell>
                                <TableCell class="text-left
                                ">{spender.totalSpending}</TableCell>
                            </TableRow>
                        )}
                    </For>
                </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default TopSpendersTable;
