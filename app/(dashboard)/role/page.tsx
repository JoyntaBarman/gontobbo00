import RoleTable from '@/components/dashboard-table/RoleTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const page = () => {
    return (
 <div className="h-full flex-1 flex-col space-y-6 px-4 md:px-6 md:flex">
            {/* Data Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Role Management</CardTitle>
                    <CardDescription>
                        View, filter, and manage all status in one place
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RoleTable/>
                </CardContent>
            </Card>
        </div>
    );
};

export default page;