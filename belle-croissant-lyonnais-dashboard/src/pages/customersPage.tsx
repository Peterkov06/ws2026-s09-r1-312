import { Button } from "../components/ui/button";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import CustomerDataTable from "~/components/customerDataTable";
import { customersTableColumns } from "~/components/customersTableColumns";
import { Customer } from "~/models";

const CustomersPage = () => {

    const [customers, setCustomers] = createSignal<Customer[]>([]);
    const [pageNumber, setPageNumber] = createSignal(1);
    const [totalPages, setTotalPages] = createSignal(0);

    const [sortField, setSortField] = createSignal<keyof Customer >('id');
    const [sortOrder, setSortOrder] = createSignal<'asc' | 'desc'>('asc');

    const API_URL = 'http://localhost:3000';

    onMount(() => {
        fetchCustomerNumber();
    });

    createEffect(() => {
        const pageNum = pageNumber();
        const currentSortField = sortField();
        const currentSortOrder = sortOrder();
        fetchCustomers(pageNum, currentSortField, currentSortOrder);
    });

    async function fetchCustomerNumber() {
        const response = await fetch(`${API_URL}/customers?_page=1&_limit=1`);
        const totalCustomers = Number(response.headers.get("X-Total-Count"));
        setTotalPages(Math.ceil(totalCustomers / 25));
    }

    async function fetchCustomers(pageNumber: number, sortField?: keyof Customer | '', sortOrder?: 'asc' | 'desc') {
        const response = await fetch(`${API_URL}/customers?_page=${pageNumber}&_limit=25&_sort=${sortField}&_order=${sortOrder}`);
        const data = await response.json();
        setCustomers(data);
    }

    return (
        <div class="col-span-3 md:col-span-4 bg-[#f9f0e0] rounded-lg p-4">
            <Show when={customers().length > 0} fallback={<div>No customers found</div>}>
                <div class="mb-4 flex flex-row">
                        <div class="flex gap-2 w-full justify-end">
                            <select name="sortby" id="sortby" onChange={(e) => {
                                setSortField(e.currentTarget.value as keyof Customer);
                                console.log(e.currentTarget.value as keyof Customer);
                            }}>
                                {customersTableColumns.map(column => (
                                    <option value={(column as { accessorKey: string }).accessorKey || ''}>{column.header?.toString()}</option>
                                ))}
                            </select>
                            <select name="sortorder" id="sortorder" onChange={(e) => setSortOrder(e.currentTarget.value as 'asc' | 'desc')}>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                </div>
                <CustomerDataTable columns={customersTableColumns} data={customers()} />
                <div class="flex justify-center items-center gap-1 mt-2 mb-2 overflow-x-auto md:overflow-x-visible">
                    <Button 
                        variant="outline" 
                        class="rounded-full min-w-[40px]"
                        onClick={() => setPageNumber(1)}
                        disabled={pageNumber() === 1}
                    >
                        &lt;&lt;
                    </Button>
                    <Button 
                        variant="outline" 
                        class="rounded-full min-w-[40px]" 
                        onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
                        disabled={pageNumber() === 1}
                    >
                        &lt;
                    </Button>
                    {Array.from({ length: totalPages() }).slice(
                        Math.max(0, Math.min(pageNumber() - 3, totalPages() - 5)), // Reduced visible pages
                        Math.min(totalPages(), Math.max(pageNumber() + 2, 5)) // Reduced visible pages
                    ).map((_, i) => {
                        const pageNum = i + 1 + Math.max(0, Math.min(pageNumber() - 3, totalPages() - 5));
                        return (
                            <Button 
                                variant={"default"}
                                class={`rounded-full min-w-[40px] ${pageNumber() === pageNum ? "bg-black text-white" : "border-black border-2"}`} 
                                onClick={() => {
                                    setPageNumber(pageNum);
                                }}
                            >
                                {pageNum}
                            </Button>
                        );
                    })}
                    <Button 
                        variant="outline" 
                        class="rounded-full min-w-[40px]"
                        onClick={() => setPageNumber(prev => Math.min(totalPages(), prev + 1))}
                        disabled={pageNumber() === totalPages()}
                    >
                        &gt;
                    </Button>
                    <Button 
                        variant="outline" 
                        class="rounded-full min-w-[40px]"
                        onClick={() => setPageNumber(totalPages())}
                        disabled={pageNumber() === totalPages()}
                    >
                        &gt;&gt;
                    </Button>
                </div>
            </Show>
        </div>
    )
}

export default CustomersPage;
