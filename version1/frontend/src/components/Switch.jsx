import {useNavigate, Link} from 'react-router-dom'

export default function Switch({label,to,text}){
    const navigate = useNavigate();
    return <div className='flex justify-center align-middle'>

        <div className="text-center justify-center text-sm text-slate-500 pr-1">{label}</div>
        <Link to={to} className="underline cursor-pointer pointer pl-1 pb-1 text-sm">{text}</Link>

    </div>
}