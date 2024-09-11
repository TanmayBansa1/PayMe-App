import { useState } from "react";
import Button from "../components/Button"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios";
export default function Send() {

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id")
    const name = searchParams.get("name")
    const [amount, setAmount] = useState(0);
    const [errormessage, setErrormessage] = useState("");
    const [successmessage, setSuccessmessage] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
        setAmount(e.target.value);
    }
    const token = localStorage.getItem("token")
    const handleClick = async () => {
        try {

            const response = await axios.post("http://localhost:3000/api/v1/accounts/transfer", {
                to: id,
                amount: amount
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setAmount(0);
            setSuccessmessage("Transfer completed")
            // navigate('/dashboard');

        } catch (error) {
            const message = error.response?.data?.message || "Transfer failed"
            setErrormessage(message);
        }

    }

    return <div className="h-screen bg-slate-200 flex items-center justify-center ">

        <div className="bg-white w-80 h-80 border rounded-md border-gray-300 shadow-lg shadow-purple-200 flex flex-col items-center">

            <div className="font-bold text-3xl pt-8">
                Send Money
            </div>
            <div className="flex w-full pt-10 pl-5 gap-4">
                <span className="inline-flex items-center justify-center size-[46px] rounded-full bg-blue-600 font-semibold text-white leading-none dark:bg-blue-500">
                    {name[0]}
                </span>
                <div className="font-semibold text-xl pt-2">
                    {name}
                </div>
            </div>
            <div className="font-semibold text-lg pt-3 w-full pl-5">
                Amount in Rs...
            </div>
            <input placeholder="Enter the amount to transfer " className="p-1 w-11/12 border rounded-md border-slate-300 m-2" onChange={handleChange}></input>
            <div className="w-11/12 pt-3">

                <button type="button" class="w-full text-md text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2" onClick={handleClick}>Send Money</button>
            </div>
            {successmessage && (
                <div className="bg-green-500 flex items-center justify-center p-2 rounded-lg">
                    <span>{successmessage}</span>

                    
                </div>
            )}
            {errormessage && (
                <div className="bg-red-500 flex items-center justify-center p-2 rounded-lg">
                    <span>{errormessage}</span>
                    
                </div>
            )}

        </div>
    </div>
}