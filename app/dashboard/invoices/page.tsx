import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';

export default async function Page({
  searchParams, //将url: http://localhost:3000/dashboard/invoices 后面的参数传个page再传个query
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1; //url为空时，默认page为1

  const totalPages = await fetchInvoicesPages(query); // 符合某一种查询数据 的总页数

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Placeholder Search invoices..." />
        <CreateInvoice />
      </div>
{/* ↓↓↓<Suspense>组件↓↓↓ {Children}想要呈现的实际 UI。如果children在渲染时暂停，Suspense 边界将切换到渲染fallback。fallback：如果实际 UI 尚未完成加载，则呈现替代 UI */}
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} /> 
        {/* 分页 */}
      </div>
    </div>
  );
}
