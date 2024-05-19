'use client';
//客户端组件
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams,usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  console.log('query:', searchParams.get('query'))
  console.log('page:', searchParams.get('page'));
  
  const pathname = usePathname();
  console.log('pathname:', pathname)
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    console.log('term:', term); // input的内容+Debounce防抖
    params.set('page', '1'); // 默认设置page为第一页，不需要在URL输入
    if (term) { 
      params.set('query', term);
    } else { //如果input为空 就改为delete
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
    console.log('params:', params.toString())
    
  },1000)
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {handleSearch(e.target.value)}} //监听input事件
        defaultValue={searchParams.get('query')?.toString()} //将url里的query的值作为placeholder
        // defaultValue={searchParams.get('page')?.toString()} //将url里的page的值作为placeholder
      /> 
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
