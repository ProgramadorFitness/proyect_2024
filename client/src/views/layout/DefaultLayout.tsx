import Navbar from '../components/Navbar'

interface DefaultLayoutProps {
    children: React.ReactNode;
}

export default function DefaultLayout({children}: DefaultLayoutProps){
    return(
   <>
   <div className='bg-slate-300 w-full'>
    <Navbar/>
    
    </div>
    <main>{children}</main>

   </>
    );
}