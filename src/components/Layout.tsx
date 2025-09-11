import { HeartIcon } from 'lucide-react';
import type { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='bg-gradient-to-br from-background to-muted'>
      header
      <main className='min-h-screen container mx-auto px-4 py-8'>
        {children}
      </main>
      <footer className='border-t backdrop-blur py-12'>
        <div className='container mx-auto px-4 text-center text-gray-400'>
          <p className='flex items-center justify-center gap-1'>
            Made with <HeartIcon className='inline h-4 w-4 text-red-500' /> by
            Abijit
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
