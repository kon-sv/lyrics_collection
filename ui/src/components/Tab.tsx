import clsx from "clsx"
import { useEffect } from "react"

export default function Tab({ children, tabName, selection, selectedTab }: { children?: any, tabName: string, selection: any, selectedTab: string }) {

  useEffect(() => {
    if (tabName == selectedTab) {
      selection(tabName, children)
    }
  }, [selectedTab])


  return <>
    <div>
      <button 
        onClick={() => { selection(tabName, children) } }
        className={clsx("text-center px-2 min-w-[60px] rounded p-1 font-bold bg-gray-600 hover:cursor-pointer hover:bg-gray-500")}>{tabName}</button>

    </div>
  </>
}
