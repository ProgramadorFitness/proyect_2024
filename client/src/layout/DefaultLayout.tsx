import Navbar from '../componentes/Navbar'

interface DefaultLayoutProps {
    children: React.ReactNode;
}

export default function DefaultLayout({children}: DefaultLayoutProps){
    return(
   <>
   <div className='bg-slate-300'>
    <Navbar/>
    </div>
    <main>{children}</main>

   </>
    );
}