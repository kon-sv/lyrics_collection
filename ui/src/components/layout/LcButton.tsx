import clsx from "clsx";

    // <button className={clsx("rounded bg-green-600 p-1 mb-4", "text-center px-2 min-w-[60px] rounded p-1 font-bold bg-gray-600 hover:cursor-pointer hover:bg-green-500", "mr-2")}
    //   onClick={(evt) => { save(); onSave && onSave(evt) } }>
    //   Save
    // </button>

export default function LcButton({children, onClick, disabled, className}: {children: any, onClick: any, disabled?: boolean, className?: string}) {
  return <>
    <button disabled={disabled} onClick={onClick} className={clsx("bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded", className)}>{children}</button>

  </>

}
