import ContentTypeTable from '@/components/dashboard-table/ContentTypeTable';
import DifficultyLevelTable from '@/components/dashboard-table/DifficultyLevelTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const page = () => {
    return (
        <div className="h-full flex-1 flex-col space-y-6 px-4 md:px-6 md:flex">
            {/* Data Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Difficulty level Management</CardTitle>
                    <CardDescription>
                        View, filter, and manage all difficulty level in one place
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DifficultyLevelTable/>
                </CardContent>
            </Card>
        </div>
    );
};

export default page;