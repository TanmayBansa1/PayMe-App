import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import Switch from "../components/Switch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Heading from "../components/Heading";

export default function Signup() {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [username, setUsername] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [errormessage, setErrormessage] = useState("");
    return <div class="bg-slate-200 h-screen flex justify-center">

        <div class="flex flex-col justify-center gap-1">
            <div class="rounded-lg bg-white w-80 text-center p-2 h-max px-4 gap-1 flex flex-col">
                <Heading label={"Signup"}></Heading>
                <Subheading label={"Enter your credentials to signup for the application"}></Subheading>
                <InputBox onChange={(e) => {
                    setFirstname(e.target.value)
                }} label={"First Name"} placeholder={"John"}></InputBox>
                <InputBox onChange={(e) => {
                    setLastname(e.target.value)
                }} label={"Last Name"} placeholder={"Doe"}></InputBox>
                <InputBox onChange={(e) => {
                    setUsername(e.target.value)
                }} label={"Email"} placeholder={"email@gmai.com"}></InputBox>
                <InputBox onChange={(e) => {
                    setPassword(e.target.value)
                }} label={"Password"} placeholder={"password"}></InputBox>
                <div class="pt-4">
                    <Button label={"Sign up"} onClick={async () => {

                        try {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                username,
                                password,
                                firstname,
                                lastname
                            })
                            localStorage.setItem("token", response.data.token);
                            navigate('/dashboard')
                        }
                        catch (error) {
                            console.log(error);
                            const message = error.response?.data?.message || "Sign in failed"
                            setErrormessage(message);
                        }
                    }} ></Button>
                </div>
                {errormessage && (
                    <div className="bg-red-500 flex items-center justify-center p-2 rounded-lg">
                        <span>{errormessage}</span>
                    </div>
                )}
                <Switch label={"Already Signed Up?"} text={"Sign In"} to={"/Signin"} ></Switch>
            </div>

        </div>

    </div>
}