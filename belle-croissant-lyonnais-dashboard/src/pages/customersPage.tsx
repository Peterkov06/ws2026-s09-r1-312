import { Button } from "../components/ui/button";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import CustomerDataTable from "~/components/customerDataTable";
import { customersTableColumns } from "~/components/customersTableColumns";
import { Customer } from "~/models";

const CustomersPage = () => {

    const [customers, setCustomers] = createSignal<Customer[]>([]);
    const [pageNumber, setPageNumber] = createSignal(1);
    const [totalPages, setTotalPages] = createSignal(0);

    const [sortField, setSortField] = createSignal<keyof Customer | ''>('');
    const [sortOrder, setSortOrder] = createSignal<'asc' | 'desc'>('asc');
    const [filters, setFilters] = createSignal<Record<string, string>>({});

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
        const response = await fetch(`http://localhost:3000/customers?_page=1&_limit=1`);
        const totalCustomers = Number(response.headers.get("X-Total-Count"));
        setTotalPages(Math.ceil(totalCustomers / 25));
    }

    async function fetchCustomers(pageNumber: number, sortField?: keyof Customer | '', sortOrder?: 'asc' | 'desc') {
        const response = await fetch(`http://localhost:3000/customers?_page=${pageNumber}&_limit=25&_sort=${sortField}&_order=${sortOrder}`);
        const data = await response.json();
        setCustomers(data);
    }

    const handleFilter = (field: string, value: string) => {
        if (value) {
            setFilters(prev => ({ ...prev, [field]: value }));
        } else {
            setFilters(prev => {
                const newFilters = { ...prev };
                delete newFilters[field];
                return newFilters;
            });
        };
        setPageNumber(1);
        fetchCustomerNumber();
    };

    return (
        <div class="col-span-4 bg-[#f9f0e0] rounded-lg p-4">
            <Show when={customers().length > 0}>
                <div class="mb-4">
                        <input
                            type="text"
                            placeholder="Search by name..."
                            class="p-2 rounded border"
                            onInput={(e) => handleFilter('name_like', e.currentTarget.value)}
                        />
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
                <CustomerDataTable columns={customersTableColumns} data={customers()} />
                <div class="flex justify-center items-center">
                    <Button 
                        variant="outline" 
                        class="rounded-full" 
                        onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
                        disabled={pageNumber() === 1}
                    >
                        &lt;
                    </Button>
                    {Array.from({ length: totalPages() }).slice(
                        Math.max(0, Math.min(pageNumber() - 4, totalPages() - 8)),
                        Math.min(totalPages(), Math.max(pageNumber() + 4, 8))
                    ).map((_, i) => {
                        const pageNum = i + 1 + Math.max(0, Math.min(pageNumber() - 4, totalPages() - 8));
                        return (
                            <Button 
                                variant={pageNumber() === pageNum ? "default" : "outline"}
                                class="rounded-full" 
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
                        class="rounded-full"
                        onClick={() => setPageNumber(prev => Math.min(totalPages(), prev + 1))}
                        disabled={pageNumber() === totalPages()}
                    >
                        &gt;
                    </Button>
                </div>
            </Show>
        </div>
    )
}

export default CustomersPage;
