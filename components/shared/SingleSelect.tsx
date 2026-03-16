'use client'

import {useState} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown, Loader} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {cn, debounce} from "@/lib/utils";


interface SingleSelectProps {
    placeholder?: string,
    data: any[],
    value: {_id: string, name: string} | null,
    setValue: (value: {_id: string, name: string}) => void
    search?: string,
    setSearch?: (search: string) => void,
    dataLoading?: boolean
}

const SingleSelect = ({placeholder = '', data, value, setValue, search, setSearch, dataLoading}: SingleSelectProps) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState(search || '');


    return (
        <div className="w-full p-0">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {value
                            ? data.find((data) => data?._id === value?._id)?.name
                            : placeholder || "Select"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start"
                                sideOffset={4}
                                className="w-full p-0">
                    <Command >
                        {setSearch && (
                            <CommandInput
                                placeholder="Search..."
                                value={inputValue}
                                onValueChange={(value: string) => {
                                             setInputValue(value);
                                    const debounceSearce = debounce((v: string) => {

                                              setSearch(v);
                                    }, 500);
                                    debounceSearce(value);
                                }}
                            />
                        )}
                        <CommandList>
                            {dataLoading ? (
                                <div className="flex items-center justify-center h-10">
                                    <Loader className="w-4 h-4 animate-spin" />
                                </div>
                            ) : data.length === 0 ? (
                                    <CommandEmpty>No data found.</CommandEmpty>
                                ) : (
                                    <CommandGroup>
                                        {data.map((d) => (
                                            <CommandItem
                                                key={d._id}
                                                value={d.name}
                                                onSelect={() => {
                                                    setValue(d)
                                                    setOpen(false)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        value?._id === d._id ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {d.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )
                            }

                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default SingleSelect;