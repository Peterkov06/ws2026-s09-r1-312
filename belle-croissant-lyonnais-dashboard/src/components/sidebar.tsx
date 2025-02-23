import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import logo from "~/assets/logo.png"
import { A } from "@solidjs/router";
const Sidebar = () => {
    return (
        <div class="bg-[#cca25b] rounded-r-[10px] flex flex-col pt-4">
            <Avatar class="self-center">
                <AvatarImage src={logo} />
                <AvatarFallback>BCL</AvatarFallback>
            </Avatar>
            <nav class="flex flex-col gap-8 mt-24 text-center font-bold text-xl">
                <A href="/home" class="h-16 hover:bg-[#37322081] hover:text-white p-2 text-center transition-colors" activeClass="bg-[#ebcb96] text-black">Home</A>
                <A href="/customers" class="h-16 hover:bg-[#37322081] hover:text-white p-2 text-center transition-colors" activeClass="bg-[#ebcb96] text-black">Customers</A>
            </nav>
        </div>
    )
}

export default Sidebar;
