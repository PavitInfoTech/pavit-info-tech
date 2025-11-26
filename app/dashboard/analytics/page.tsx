import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Analytics | PavitInfoTech Dashboard",
  description: "View analytics and reports",
};

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className='p-6 lg:p-8'>
        <div className='space-y-6'>
          <div>
            <h1 className='text-3xl font-bold font-serif mb-2'>Analytics</h1>
            <p className='text-muted-foreground'>
              View detailed analytics and performance metrics
            </p>
          </div>

          <Card className='p-6 text-center py-12'>
            <p className='text-muted-foreground mb-4'>Analytics Dashboard</p>
            <p className='text-lg font-semibold'>Coming Soon</p>
            <p className='text-sm text-muted-foreground mt-2'>
              Advanced analytics and reporting features will be available soon
            </p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
