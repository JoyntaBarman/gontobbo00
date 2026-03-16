'use client';

import { useFetch } from '@/hooks/useFetch';
import { useState } from 'react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Input } from '../ui/input';
import { debounce } from '@/lib/utils';
import { Button } from '../ui/button';
import { Pencil, Plus } from 'lucide-react';
import { MCQType } from '@/types';
import { useRouter } from 'next/navigation';
import CustomPagination from '../shared/CustomPagination';


const initialState = {
    name: '',
    description: '',
}

const McqTable = () => {
     const [currentPage, setCurrentPage] = useState(0);
        const [perPage, setPerPage] = useState(10);
        const [globalFilter, setGlobalFilter] = useState('');
        const [globalDebounceFilter, setGlobalDebounceFilter] = useState('')
        const [refresh, setRefresh] = useState(false);
        const {data: mcqsData, loading, totalData} = useFetch(
            `/api/mcq?${globalFilter && `subject=${globalFilter}`}&page=${currentPage}&limit=${perPage}`,
            [refresh, currentPage, perPage, globalFilter]);
        const [dataUpdateLoading, setDataUpdateLoading] = useState(false);
        const [isEditModalOpen, setIsEditModalOpen] = useState(false);
        const [formData, setFormData] = useState(initialState);
        const [errors, setErrors] = useState<any>({});
        const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
        const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
        const [selectedId, setSelectedId] = useState<string | null>(null);
        const router = useRouter();

        
                    const handleSubmit = async (id ?: string | null) => {

        setErrors({});
        let error: any = {}

        const payload = {
            name: formData?.name || '',
            description: formData?.description || ''
        }

        if (!payload.name.trim()) {
            error.name =  'Topic name is required'
        }
        if (!payload.description.trim()) {
            error.description = 'Description is required'
        }

        if (Object.keys(error).length > 0) {
            setErrors(error)
            return;
        }

        try {

            setDataUpdateLoading(true);
            const res = await fetch(`/api/mcq${id ? `/${id}` : ''}`, {
                method: selectedId ? "PUT" : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                               setIsEditModalOpen(false)
                setRefresh(!refresh);
 
                toast.success("Create MCQ successfully.");
            } else {
                toast.error("Failed to create MCQ.")
            }

        } catch (error) {
            console.log("error: ", error)
        } finally {
            setDataUpdateLoading(false);
        }
    }
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center space-x-2">
                    <Input
                        placeholder="Search topic"
                        value={globalDebounceFilter}
                        onChange={(event) => {
                            setGlobalDebounceFilter(event.target.value)
                            const searchSubject = debounce((value: string)=> {
                                       setGlobalFilter(value);
                            }, 500);
                            searchSubject(event.target.value)

                        }}
                        className=" w-50 lg:w-75 cursor-text"
                    />

                </div>
                <div className="flex items-center space-x-2">
                    <Button onClick={() => {
                        router?.push('/mcq/edit')
                    }}>
                        <Plus className="h-4 w-4 mr-2"/>
                        Add
                    </Button>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Question</TableHead>
                
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* Loading State */}
                    {loading && (
                        <TableRow>
                            <TableCell colSpan={3} className="h-24 text-center">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                    <p className="text-muted-foreground">Loading...</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}

                    {/* Empty State */}
                    {!loading && mcqsData?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                                Data Not Found
                            </TableCell>
                        </TableRow>
                    )}

                    {/* Data State */}
                    {!loading && mcqsData?.map((mcq: MCQType) => (
                        <TableRow key={mcq?._id}>
                            <TableCell className="font-medium">{mcq?.question}</TableCell>
                            <TableCell>{mcq?.explanation || "No description provided"}</TableCell>
                            <TableCell>
                               <div className='space-x-2'>
                                 {/* Edit button */}
                                <Button onClick={() => {
                                    router?.push(`/mcq/update/${mcq?._id}`)
                                }}>
                                    <Pencil className="h-4 w-4"/>
                                </Button>

                                {/* Delete button */}
                                 {/* <Button
                                 variant={'destructive'}
                                  onClick={() => {
                                    setSelectedId(contentTypeData?._id);
                                   setOpenDeleteModal(true);
                                }}>
                                    <Trash className="h-4 w-4"/>
                                </Button> */}
                               </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <CustomPagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(totalData / perPage) || 1}
                            onPageChange={setCurrentPage}
                            showPreviousNext={true}/>

        </div>
    );
};

export default McqTable;