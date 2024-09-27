import { useState } from 'react';
import guitar from '../assets/guitar.png';
import google from '../assets/google.png';
import phone from '../assets/phone.png';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase/setup';
import { useAuth } from '../context/AuthContext'; 
import { doc, getDoc, setDoc } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom'; 

type popupProps = {
  setLoginPop: any;
};

const Login = (props: popupProps) => {
  const { login } = useAuth(); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
        });
      }

      login(user); 
      props.setLoginPop(false); 

      navigate('/'); 

    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred during sign-in. Please try again.');
    }
  };

  return (
    <div>
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <div className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-96 sm:max-w-lg">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <h1 onClick={() => props.setLoginPop(false)} className="text-3xl font-semibold cursor-pointer">
                  X
                </h1>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-1 sm:mt-0 sm:text-left">
                    <div className="mt-2">
                      <img src={guitar} className="w-20 h-20 ml-32" alt="Guitar" />
                      <p className="mt-5 text-base font-medium text-center">
                        Help us become one of the safest places to buy and sell
                      </p>

                      <div className="flex p-2 mt-12 border-2 border-black rounded">
                        <img src={phone} className="w-6 h-6" alt="Phone" />
                        <h2 className="ml-3 font-semibold">Continue with phone</h2>
                      </div>

                      <div onClick={googleSignIn} className="flex items-center p-2 mt-5 border border-gray-400 rounded cursor-pointer">
                        <img src={google} className="w-6 h-6" alt="Google" />
                        <h2 className="flex-grow mr-5 font-semibold text-center">Continue with Google</h2>
                      </div>

                      {errorMessage && (
                        <div className="mt-4 text-center text-red-500">
                          {errorMessage}
                        </div>
                      )}

                      <h2 className="mt-4 font-semibold text-center">OR</h2>
                      <h2 className="mt-4 font-bold text-center underline cursor-pointer hover:no-underline">Login with Email</h2>

                      <div className="mt-20">
                        <h4 className="text-xs text-center text-gray-500">All your personal details are safe with us.</h4>
                        <h4 className="mt-3 text-xs text-center text-gray-500">
                          If you continue, you are accepting{' '}
                          <span className="text-center text-blue-500">
                            OLX Terms and <br /> Conditions and Privacy Policy
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
