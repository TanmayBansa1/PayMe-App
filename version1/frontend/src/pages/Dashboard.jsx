import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";

export default function Dashboard() {

    const [name, setName] = useState("");
    const [balance, setBalance] = useState(0);
    const token = localStorage.getItem("token")
    useEffect(() => {

        const response = axios.get("http://localhost:3000/api/v1/user/getinfo", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(response => {
            setName(response.data.name)
            setBalance(response.data.balance)
        })

    }, [token])
    return <div className="bg-slate-200 h-screen">

        <Appbar name={name}></Appbar>
        <Balance balance={balance}></Balance>
        <Users></Users>
    </div>
}