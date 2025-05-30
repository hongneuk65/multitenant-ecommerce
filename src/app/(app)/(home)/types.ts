import { SubcategoryMenu } from './search-filter/subcategory-menu';
import {Category } from "@/payload-types"

export type CustomCategory = Category & {
    subcategories: Category[];
};

