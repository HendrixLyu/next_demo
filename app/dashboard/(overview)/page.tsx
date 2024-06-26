// use file system to manage URL
import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
} from '@/app/lib/data';
import { Suspense } from 'react';
import {
  InvoiceSkeleton,
  RevenueChartSkeleton,
  CardSkeleton,
} from '@/app/ui/skeletons';

export default async function Page() {
  //async异步函数 取数据在服务端渲染后返回，以下三个await是按顺序执行的，一个(await结束)拿到数据，才能执行下一个
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  // console.log('Print revenue:', revenue)
  // console.log('Print latestInvoices:', latestInvoices)
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChart revenue={revenue} /> */}
        {/* ↓↓↓<Suspense>组件↓↓↓ {Children}想要呈现的实际 UI。如果children在渲染时暂停，Suspense 边界将切换到渲染fallback。fallback：如果实际 UI 尚未完成加载，则呈现替代 UI */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<InvoiceSkeleton />}>
          <LatestInvoices />
        </Suspense>
        {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
      </div>
    </main>
  );
}
