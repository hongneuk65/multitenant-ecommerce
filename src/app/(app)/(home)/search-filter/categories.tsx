"use client"

import { ListFilterIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { CustomCategory } from "../types";
import { CategoryDropdown } from "./category-dropdown";
import { CategoriesSidebar } from "./categories-sidebar";


interface Props {
    data: CustomCategory[];
};



export const Categories = ({data}: Props) => {

        const containerRef = useRef<HTMLDivElement>(null)
        const measureRef =  useRef<HTMLDivElement>(null)
        const viewallRef =  useRef<HTMLDivElement>(null)

        const [visibleCount, setVisibleCount] = useState(data.length);
        const [isAnyHovered, setIsAnyHovered] = useState(false)
        const [isSidebarOpen,setIsSidebarOpen ]= useState(false)

        const activeCategory = "all";

        const activeCategoryIndex = data.findIndex((cat) => cat.slug === activeCategory)
        const isActiveCategoryHidden = activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;
        useEffect(() => {
            const calculateVisible = () =>{
            if(!containerRef.current || !measureRef.current || !viewallRef.current ) return;
            
            const containerWidth = containerRef.current.offsetWidth;
            const viewallWidth = viewallRef.current.offsetWidth;
            const availbleWidth = containerWidth - viewallWidth;

            const items  = Array.from(measureRef.current.children);
            let totalWidth = 0;
            let visible = 0;
            for (const item of items ) {
                const width = item.getBoundingClientRect().width;
            if (totalWidth + width > availbleWidth) break;
            totalWidth+=width;
            visible++;
            }
            setVisibleCount(visible);
            };
            const resizeObserver = new ResizeObserver(calculateVisible);
            resizeObserver.observe(containerRef.current!);

            return () => resizeObserver.disconnect();
        }, []);

    return (
        <div className="relative w-full">
            <CategoriesSidebar open = {isSidebarOpen} onOpenChange = {setIsSidebarOpen} data = {data}/>

            <div 
            ref={measureRef}
            className="absolute opacity-0 pointer-events-none flex"
            >
                {data.map((category) => (
                <div key={category.id}>
                    {}
                    <CategoryDropdown
                        category={category}
                        isActive={activeCategory === category.slug}
                        isNavigationHovered={false}
                    />
                </div>
             ))}
            </div>

            <div 
            ref={containerRef}
            className="flex flex-nowrap items-center"
            onMouseEnter={()=> setIsAnyHovered(true)}
            onMouseLeave={()=> setIsAnyHovered(false)}
            >
                {data.slice(0, visibleCount).map((category) => (
                <div key={category.id}>
                    <CategoryDropdown
                        category={category}
                        isActive={activeCategory === category.slug}
                        isNavigationHovered={false}
                    />
                </div>
             ))}

             <div
             ref= {viewallRef} className="shrink-0">
                <Button 
                variant="outline"
                className={cn("border-none shadow-none bg-white text-black hover:bg-black hover:text-white",
                isActiveCategoryHidden && !isAnyHovered && "bg-black text-white",
                )}
                onClick={() => setIsSidebarOpen(true)}
                >
                    View All
                    <ListFilterIcon className="ml" />
                </Button>

             </div>
            </div>
        </div>
    )
};