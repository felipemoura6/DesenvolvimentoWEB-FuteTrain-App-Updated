// src/components/Login.tsx
import { Link } from 'react-router-dom';
import home_image from '../assets/images/openart_image_home.jpg'

export function Home() {
  return (

    <div className="bg-gradient-to-t from-slate-950 to-slate-900 w-full h-full fixed flex-grow overflow-y-auto pb-[10rem]">
      <div className="h-px bg-gray-200 mb-1"></div>
      
      <div className="p-4">
          <h2 className="left-auto right-auto  justify-center flex mb-2 text-slate-300 text-bold font-bold text-lg">Your friendly app!</h2>
      </div>

      <div className='p-3 block justify-center items-center'>
        <div className='flex items-center justify-center'>
          <Link to="/login" className="py-1 px-3 border border-green-500 bg-green-950 rounded-lg text-green-500 hover:bg-green-900 hover:text-green-400 mx-4 " type="submit">Login</Link>
          <Link to="/register" className="py-1 px-3 bg-blue-950 rounded-lg text-blue-500 border border-blue-500 hover:bg-blue-900 hover:text-blue-400" type="submit">Register</Link>
        </div>

        <div className='flex justify-center items-center my-7'>
          <img src={home_image} alt="" className='size-[20rem]'/>
        </div>  
      </div>
    </div>
      
  );
}
