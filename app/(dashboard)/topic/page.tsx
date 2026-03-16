import TopicTable from '@/components/dashboard-table/TopicTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const Topic = () => {
    return (
        <div className="h-full flex-1 flex-col space-y-6 px-4 md:px-6 md:flex">
            {/* Data Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Topic Management</CardTitle>
                    <CardDescription>
                        View, filter, and manage all topic in one place
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TopicTable/>
                </CardContent>
            </Card>
        </div>
    );
};

export default Topic;