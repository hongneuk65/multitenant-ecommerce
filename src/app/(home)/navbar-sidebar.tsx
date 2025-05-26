import{
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
}  from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface NavbarItem {
    href: string;
    children: React.ReactNode;
}

interface Props{
    items: NavbarItem[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({
    items,
    open,
    onOpenChange,
    }: Props) => {
        return (
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent
                side="left"
                className="p-0 transittion-none"
                >
                    <SheetHeader className="p4 border-b">

                            <SheetTitle>
                            Menu 
                            </SheetTitle>

                    </SheetHeader>
                    <ScrollArea className="flex flex-col ovverflow-y-auto h-full pb-2">
                       {items.map((item)=> (
                            <Link
                            key={item.href}
                            href={item.href}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                            onClick={()=> onOpenChange(false)}
                            >
                                
                                {item.children}
                            </Link>
                        ))}
                        <div>
                            <Link href="sign-in" className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                            onClick={()=> onOpenChange(false)}>
                                sign in
                            </Link>

                            <Link href="sign-up" className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                            onClick={()=> onOpenChange(false)}>
                                start selling
                            </Link>
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        )
};