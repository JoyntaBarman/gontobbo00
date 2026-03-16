import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const perPageTableData = [5, 10, 20, 30, 40, 50]


    let timer : any;
export function debounce(fn : Function, delay = 300) {

    return function (...args : any) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            //@ts-ignore
            fn.apply(this, args);
            // fn(args)
        }, delay);
    };
}

export const handleDelete = async (url : string, id: string | null,  refresh: Function) => {
    if(!id){
        toast?.error("Id not found");
        return;
    }

    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        })

        const resData = await response.json();
        if (resData.status) {
            toast.success(resData?.message || "Delete Success");
            refresh();
        } else {
            toast.error(resData?.message || "Delete Failed!")
        }

    } catch (error: any) {
        console.log( error?.message || 'Failed to delete');
    }
}
