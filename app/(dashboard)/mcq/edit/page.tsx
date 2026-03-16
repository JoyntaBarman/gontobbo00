import MCQEditAndCreate from '@/components/MCQEditAndCreate';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const page = () => {
    return (
         <div className="h-full flex-1 flex-col space-y-6 px-4 md:px-6 md:flex">
            {/* Data Table */}
            <Card>
                <CardHeader>
                    <CardTitle>MCQ Management</CardTitle>
                    <CardDescription>
                        View, filter, and manage all MCQ in one place
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <MCQEditAndCreate/>
                </CardContent>
            </Card>
        </div>
    );
};

export default page;