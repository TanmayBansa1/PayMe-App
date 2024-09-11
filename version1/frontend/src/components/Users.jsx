import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
export default function Users() {

    const [filter,setFilter] = useState("");
    const [showUsers,setShowUsers] = useState(false);

    const handleChange = (e)=>{

        setFilter(e.target.value);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        setShowUsers(true);
    }

    return <div>

        <div className="flex flex-col gap-2 p-2">

            <div className="text-md font-semibold">
                Users
            </div>
            <div >
                <form className="flex justify-start max-w-sm  " onSubmit={handleSubmit}>
                    {/* <label htmlFor="simple-search" className="sr-only">Search</label> */}
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                            </svg>
                        </div>
                        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-slate-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for other Usenames..." required onChange={handleChange} />
                    </div>
                    <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </form>
            </div>
            {showUsers&& <User filter={filter}></User>}



        </div>





    </div>
}

function User({filter}){

    // const [users,setUsers] = useState([]);

    // useEffect(()=>{
    //     const response = axios.get(`http://localhost:3000/api/v1/user/bulk/?filter=${filter}`).then(response=>{
    //         setUsers(response.data.users)
    //     })
    // },[])

    // return <div>
    //     hi
    // </div>
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (filter) {
            axios.get(`http://localhost:3000/api/v1/user/bulk/?filter=${filter}`,{headers: {
                "Authorization": `Bearer ${token}`
            }})
                .then(response => {
                    setUsers(response.data.users);
                })
                .catch(error => {
                    console.error("Error fetching users:", error);
                });
        }
    }, [filter]); // Dependency array includes filter to refetch when it changes

    return (
        <div className="p-3">
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                         // Adjust rendering as needed
                         <Render key={user.userId} user={user}></Render>
                    ))}
                </ul>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
}
function Render({ user }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between">
            <div className="flex">
            <span className="inline-flex items-center justify-center size-[42px] rounded-full bg-blue-600 font-semibold text-white leading-none dark:bg-blue-500">
                {user.firstname.substring(0, 1)}
            </span>
                <div className="flex flex-col justify-center h-full pl-5 pb-2">
                    <div>{user.firstname} {user.lastname}</div>
                </div>
            </div>

            <div className="flex flex-col justify-center h-full">
                <Button
                    onClick={() => {
                        navigate(`/send?id=${user.userId}&name=${user.firstname}`);
                    }}
                    label="Send Money"
                />
            </div>
        </div>
    );
}