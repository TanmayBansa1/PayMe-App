export default function Appbar({ name }) {

    return <div>
        <div  className="flex justify-between p-3 border rounded-md">

        <div className="font-extrabold text-xl">
            PayMe
        </div>
        <div className="flex justify-center gap-2">
            <div className="pt-2 text-lg font-semibold">

                Hello {name}
            </div>
            <span className="inline-flex items-center justify-center size-[46px] rounded-full bg-blue-600 font-semibold text-white leading-none dark:bg-blue-500">
                {name.substring(0, 1)}
            </span>
        </div>
        </div>
    </div>
}

{/* <span class="inline-flex items-center justify-center size-[46px] rounded-full bg-gray-800 font-semibold text-white leading-none">
  AC
</span>
<span class="inline-flex items-center justify-center size-[46px] rounded-full bg-gray-500 font-semibold text-white leading-none">
  AC
</span>
<span class="inline-flex items-center justify-center size-[46px] rounded-full bg-green-500 font-semibold text-white leading-none">
  AC
</span>
<span class="inline-flex items-center justify-center size-[46px] rounded-full bg-blue-600 font-semibold text-white leading-none">
  AC
</span>
<span class="inline-flex items-center justify-center size-[46px] rounded-full bg-red-500 font-semibold text-white leading-none">
  AC
</span>
<span class="inline-flex items-center justify-center size-[46px] rounded-full bg-yellow-500 font-semibold text-white leading-none">
  AC
</span>
<span class="inline-flex items-center justify-center size-[46px] rounded-full bg-white font-semibold text-gray-800 leading-none">
  AC
</span> */}