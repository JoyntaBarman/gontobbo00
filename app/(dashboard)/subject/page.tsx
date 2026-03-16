import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import SubjectTable from "@/components/dashboard-table/SubjectTable";

const Subject = () => {
    return (
        <div className="h-full flex-1 flex-col space-y-6 px-4 md:px-6 md:flex">
            {/* Data Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Subject Management</CardTitle>
                    <CardDescription>
                        View, filter, and manage all Subject in one place
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SubjectTable/>
                </CardContent>
            </Card>
        </div>
    );
};

export default Subject;