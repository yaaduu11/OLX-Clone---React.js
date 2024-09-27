import { useState, useEffect } from 'react';
import olx from '../assets/olx.png';
import lens from '../assets/lens.png';
import arrow from '../assets/arrow.png';
import search from '../assets/search.png';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/setup'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Swal from 'sweetalert2'; 

type SearchProps = {
  setSearch?: any;
};

const Navbar = (props: SearchProps) => {
  const [loginPop, setLoginPop] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserEmail(user.email);
      } else {
        setIsLoggedIn(false);
        setUserEmail(null);
      }
    });

    return () => unsubscribe(); 
  }, []);

  const handleSellClick = () => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        title: 'Please sign in',
        text: 'You need to log in to sell a product',
        confirmButtonText: 'OK'
      });
    } else {
      navigate("/sell"); 
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Logged out successfully',
          timer: 1500,
          showConfirmButton: false
        });
        setIsLoggedIn(false);
        navigate('/');
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  return (
    <>
      <div className='flex p-4 shadow-md bg-slate-100'>
        <img src={olx} className='mt-1 w-11 h-7' alt="OLX Logo" />
        <div className='flex w-64 p-2 ml-5 bg-white border-2 border-black rounded border-spacing-1'>
          <img src={lens} className='w-5 h-5 mt-1' alt="Lens" />
          <input placeholder='Location' className='ml-3 outline-none' />
          <img src={arrow} className='w-8 h-7' alt="Arrow" />
        </div>
        <div className='flex h-12 ml-4 bg-white border-2 border-black rounded border-spacing-1'>
          <input
            onChange={(e) => props.setSearch(e.target.value)}
            placeholder='Find Cars, Mobile Phones and more..'
            className='ml-3 w-[36rem] outline-none'
          />
          <img src={search} alt="Search" />
        </div>
        <div className='flex h-12 p-3 ml-10'>
          <h2 className='font-semibold'>ENGLISH</h2>
          <img src={arrow} className='w-8 h-7' alt="Arrow" />
        </div>

        {!isLoggedIn ? (
          <div
            onClick={() => setLoginPop(true)}
            className='flex h-12 p-3 ml-10 underline cursor-pointer hover:no-underline'
          >
            <h2 className='text-lg font-bold'>Login</h2>
          </div>
        ) : (
          <div
            onClick={handleLogout}
            className='flex h-12 p-3 ml-10 underline cursor-pointer hover:no-underline'
          >
            <h2 className='text-lg font-bold'>
              Logout <br /><span className='text-xs text-green-500'>({userEmail})</span>
            </h2>

          </div>
        )}

        <div
          onClick={handleSellClick}
          className='flex items-center justify-center h-12 p-2 ml-10 border-4 border-yellow-500 rounded-full cursor-pointer w-28'
        >
          <h2 className='text-lg font-semibold'>+ SELL</h2>
        </div>
      </div>

      {loginPop && <Login setLoginPop={setLoginPop} />}
    </>
  );
};

export default Navbar;
