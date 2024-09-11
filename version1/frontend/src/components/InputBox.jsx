export default function InputBox({label,placeholder, onChange}){

    return <div>
        <div class="font-semibold text-md text-left">{label}</div>
        <input placeholder={placeholder} type="text" onChange={onChange} class="w-full border rounded-lg border-slate-150 px-2 py-1"></input>
    </div>
}