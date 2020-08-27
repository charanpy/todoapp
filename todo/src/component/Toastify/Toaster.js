
import React from 'react'
import { ToastContainer, toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Toaster = ({ msg, name }) => {
            console.log(msg)

            const error = (msg) => {
                        toast.configure()
                        toast.error(msg, {
                                    position: toast.POSITION.TOP_CENTER


                        });
            }
            const successMsg = (msg) => {
                        toast.configure()
                        toast.dark(msg, {
                                    position: toast.POSITION.TOP_CENTER


                        });
            }
            return (
                        <div>
                                    {msg ? (successMsg(name)) : (error(name))}
                        </div>
            )
}
export default Toaster