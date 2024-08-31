import React from 'react'
import { SighOut } from '../../utils/SighOut';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

export const Logout = () => {
  const handleLogout = () => {
    SighOut();
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div>
          <button className='bg-blue-500 text-white p-2 rounded w-64' onClick={handleLogout}>
            Logout
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>

  )
}
// import React from 'react';
// import { SighOut } from '../../utils/SighOut';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';

// export const Logout = () => {
//   const handleLogout = () => {
//     SighOut();
//   };

//   return (
//     <div>
//       <button className='bg-blue-500 text-white p-2 rounded w-64' onClick={handleLogout}>
//         Logout
//       </button>
//       <ToastContainer />
//     </div>
//   );
// };

