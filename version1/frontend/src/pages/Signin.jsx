import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import Switch from "../components/Switch";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { data } from "autoprefixer";
// import Heading from "../components/Heading";

export default function Signin() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errormessage, setErrormessage] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-200 h-screen flex justify-center">

        <div className="flex flex-col justify-center gap-1">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 gap-1 flex flex-col">
                <Heading label={"SignIn"}></Heading>
                <Subheading label={"Enter your credentials to log in"}></Subheading>
                <InputBox onChange={(e) => {
                    setUsername(e.target.value)
                }} label={"Email"} placeholder={"email@gmai.com"}></InputBox>
                <InputBox onChange={(e) => {
                    setPassword(e.target.value)
                }} label={"Password"} placeholder={"password"}></InputBox>
                <div className="pt-4">
                    <Button label={"Sign in"} onClick={async () => {

                        try {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                username,
                                password
                            })
                            localStorage.setItem("token", response.data.token);
                            navigate('/dashboard')
                        }
                        catch (error) {
                            console.log(error);
                            const message = error.response?.data?.message || "Sign in failed"
                            setErrormessage(message);
                        }

                    }}  ></Button>
                </div>
                {errormessage && (
                    <div className="bg-red-500 flex items-center justify-center p-2 rounded-lg">
                        <span>{errormessage}</span>
                    </div>
                )}
                <Switch label={"Don't have an account yet?"} text={"Sign Up"} to={"/Signup"} ></Switch>
            </div>

        </div>

    </div>
}