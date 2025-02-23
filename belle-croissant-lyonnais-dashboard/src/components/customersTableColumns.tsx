import { ColumnDef } from "@tanstack/solid-table";
import { Customer } from "~/models";

export const customersTableColumns: ColumnDef<Customer>[] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "First Name",
        accessorKey: "firstName",
    },
    {
        header: "Last Name", 
        accessorKey: "lastName",
    },
    {
        header: "Age",
        accessorKey: "age",
    },
    {
        header: "Gender",
        accessorKey: "gender", 
    },
    {
        header: "Email",
        accessorKey: "email",
    },
    {
        header: "Phone",
        accessorKey: "phone",
    },
    {
        header: "Membership",
        accessorKey: "membership",
    },
    {
        header: "Joined Date",
        accessorKey: "joinedAt",
    },
    {
        header: "Last Purchase",
        accessorKey: "lastPurchase",
    },
    {
        header: "Total Spending",
        accessorKey: "totalSpending",
    },
    {
        header: "Avg Order Value",
        accessorKey: "averageOrderValue", 
    },
    {
        header: "Purchase Frequency",
        accessorKey: "frequency",
    },
    {
        header: "Preferred Category",
        accessorKey: "preferredCategory",
    },
    {
        header: "Churned",
        accessorKey: "churned",
    }
]

    
