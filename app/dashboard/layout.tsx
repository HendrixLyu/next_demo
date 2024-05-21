import SideNav from '@/app/ui/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden"> 
    {/* layout没有url路径，无法被访问。整体dashboard分成左右两部分，与layout平级的文件夹及同级的page.tsx都算在{children}里,被layout包裹，且layout是要被子组件继承的！！！ */}
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
