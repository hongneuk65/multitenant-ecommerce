"use client";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { NavbarSidebar } from "./navbar-sidebar";


const poppins  = Poppins({
    subsets: ["latin"],
    weight: ["700"],
    }   
);

interface NavbarItemProps{
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
};

const NavbarItem = ({
    href,
    children,
    isActive,
    }: NavbarItemProps) => {
    return (
        <Button
        asChild
        variant="outline"
        className={cn("bg-transparent h-full flex hover:bg-black hover:text-white rounded-none hover:border-primary border-none px-3.5 text-lg w-auto", isActive && "bg-black text-white hover:bg-black hover:text-white")}
        >
        <Link href={href}>
            {children}      
        </Link>
        </Button> 
    );
};

const navbarItems = [
    {href: "/",children:"Home"},
    {href: "/about",children:"About"},
    {href: "/features",children:"Features"},
    {href: "/pricing",children:"Pricing"},
    {href: "/contact",children:"Contact"},
];


export const Navbar = () => {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return(
        <nav className="h-20 flex border-b justify-between font-medium bg-white">
            <Link href="/" className="pl-6 flex items-center" >
            <span className={cn("text-5xl font-semibold", poppins.className )}>
            logo
            </span>
            </Link>

            <NavbarSidebar 
                items={navbarItems}
                open={isSidebarOpen}
                onOpenChange={setIsSidebarOpen}
            />

            <div className="items-center hidden lg:flex w-full pl-5">
                {navbarItems.map((item)=>(
                    <NavbarItem 
                        key= {item.href}
                        href= {item.href}
                        isActive={pathname === item.href}
                        >
                        
                        {item.children}
                    </NavbarItem> 
                ))}
            </div>
            <div className="hidden lg:flex">

                <Button 
                asChild 
                variant="secondary"
                className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-gray-400 hover:text-black transition-colors text-lg">
                    <Link href="/sign-in">
                        Log in
                    </Link>
                </Button>
                <Button 
                asChild
                className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black gray:bg-pink-400 hover:text-black transition-colors text-lg">
                    <Link href="/sign-up">
                        Start Selling
                    </Link>
                </Button>
            </div>

            <div className="flex lg:hidden items-center justify-center">
                <Button
                  variant="ghost"
                  className="size-12 border-transparent bg-white"
                  onClick={() => setIsSidebarOpen(true)}
                >
                    <MenuIcon />
                </Button>
            </div>
        </nav>
    );
};