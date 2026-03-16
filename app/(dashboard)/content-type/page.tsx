import ContentTypeTable from '@/components/dashboard-table/ContentTypeTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const page = () => {
    return (
<div className="h-full flex-1 flex-col space-y-6 px-4 md:px-6 md:flex">
            {/* Data Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Content Type Management</CardTitle>
                    <CardDescription>
                        View, filter, and manage all content type in one place
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ContentTypeTable/>
                </CardContent>
            </Card>
        </div>
    );
};

export default page;