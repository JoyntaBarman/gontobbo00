import StatusTable from '@/components/dashboard-table/StatusTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const page = () => {
    return (
 <div className="h-full flex-1 flex-col space-y-6 px-4 md:px-6 md:flex">
            {/* Data Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Status Management</CardTitle>
                    <CardDescription>
                        View, filter, and manage all status in one place
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <StatusTable/>
                </CardContent>
            </Card>
        </div>
    );
};

export default page;