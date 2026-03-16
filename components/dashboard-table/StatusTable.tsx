'use client'

import { useFetch } from "@/hooks/useFetch";
import { useState } from "react";
import { toast } from "sonner";
import CustomPagination from "../shared/CustomPagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { debounce, handleDelete } from "@/lib/utils";
import { Button } from "../ui/button";
import { Loader, Pencil, Plus, Trash } from "lucide-react";
import { StatusType } from "@/types";



type InitialStateProps = {
    name: string,
    description : string
}

const initialState = {
    name: '',
    description: '',
}

const StatusTable = () => {
     const [currentPage, setCurrentPage] = useState(0);
                const [perPage, setPerPage] = useState(10);
                const [globalFilter, setGlobalFilter] = useState('');
                const [globalDebounceFilter, setGlobalDebounceFilter] = useState('')
                const [refresh, setRefresh] = useState(false);
                const {data: statusData, loading, totalData} = useFetch(
                    `/api/status?&page=${currentPage}&limit=${perPage}${globalFilter && `&status=${globalFilter}`}`,
                    [refresh, currentPage, perPage, globalFilter]);
                const [dataUpdateLoading, setDataUpdateLoading] = useState(false);
                const [isEditModalOpen, setIsEditModalOpen] = useState(false);
                const [formData, setFormData] = useState<InitialStateProps>(initialState);
                const [errors, setErrors] = useState<any>({});
                const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
                const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
                const [selectedId, setSelectedId] = useState<string | null>(null);

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
            const res = await fetch(`/api/status${id ? `/${id}` : ''}`, {
                method: selectedId ? "PUT" : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                               setIsEditModalOpen(false)
                setRefresh(!refresh);
 
                toast.success("Create status successfully.");
            } else {
                toast.error("Failed to create status.")
            }

        } catch (error) {
            console.log("error: ", error)
        } finally {
            setDataUpdateLoading(false);
        }
    }


    const handleCloseModal = () => {
        setFormData(initialState)
        setSelectedId(null);
        setIsEditModalOpen(false);
        setErrors({})
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
                        setFormData(initialState)
                        setIsEditModalOpen(true)
                    }}>
                        <Plus className="h-4 w-4 mr-2"/>
                        Add
                    </Button>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                
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
                    {!loading && statusData?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                                Data Not Found
                            </TableCell>
                        </TableRow>
                    )}

                    {/* Data State */}
                    {!loading && statusData?.map((status: StatusType) => (
                        <TableRow key={status?._id}>
                            <TableCell className="font-medium">{status?.name}</TableCell>
                            <TableCell>{status?.description || "No description provided"}</TableCell>
                            <TableCell>
                               <div className='space-x-2'>
                                 {/* Edit button */}
                                <Button onClick={() => {
                                    setFormData({
                                        name: status?.name || '',
                                        description: status?.description || ''
                                    });
                                    setSelectedId(status?._id);
                                    setIsEditModalOpen(true);
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

            <Dialog open={isEditModalOpen} onOpenChange={handleCloseModal}>
                <DialogContent className="max-w-300">
                    <DialogHeader>
                        <DialogTitle>Create/Update status</DialogTitle>
                        <DialogDescription>
                            Create or Update a new status to add to your list.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">


                         {/* Topic Title */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Status Name *</Label>
                            <Input
                                id="name"
                                placeholder="Enter topic name..."
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}

                            />
                            {errors?.name && (
                                <p className="text-xs text-red-500">{errors?.name}</p>
                            )}
                        </div>

                        {/* Task Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Provide additional details about the topic..."
                                value={formData.description}
                                onChange={(e) => {
                                    setFormData(prev => ({...prev, description: e.target.value}))
                                }
                                }
                                rows={5}
                                maxLength={255}
                            />
                               {errors?.description && (
                                <p className="text-xs text-red-500">{errors?.description}</p>
                            )}
                        </div>
                         

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-2 pt-4">
                            <Button type="button"
                                    variant="outline"
                                    onClick={() => {
                                   
                                        handleCloseModal()
                                    }}
                                    className="cursor-pointer">
                                Cancel
                            </Button>
                            <Button onClick={() => {
                                handleSubmit(selectedId).then()
                            }}
                                    disabled={loading}
                                    className="cursor-pointer">
                                {
                                    dataUpdateLoading ? (
                                        <Loader className={"w-4 h-4 mr-2 animate-spin"}/>
                                    ) : (
                                        <Plus className="w-4 h-4 mr-2"/>
                                    )
                                }
                                Submit
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={openDeleteModal} onOpenChange={() => {
                setSelectedId(null);
                setOpenDeleteModal(false);
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Do you want to delete this status?
                        </DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <div className='flex items-center gap-2'>
                              <Button onClick={() => {
                                    setSelectedId(null);
                                    setOpenDeleteModal(false);
                                }}>
                                    Cencel
                                </Button>


                              <Button 
                              variant={'destructive'}
                              onClick={async () => {
                                    try{
                                        setDeleteLoading(true);
                                        await handleDelete('/api/subject', selectedId, setRefresh)
                                    } catch {
                                    } finally {
                                        setDeleteLoading(false)
                                        setOpenDeleteModal(false);
                                        setSelectedId(null)
                                    }
            
                                }}>
                                    {
                                        deleteLoading ? <Loader className='w-4 h-4 animate-spin'/> : <Trash className="h-4 w-4"/>
                                    }
                                    Delete
                                </Button>
                             </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default StatusTable;