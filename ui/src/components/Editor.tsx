import clsx from "clsx";
import { useEffect, useState } from "react";


export default function Editor({state = {}, onChange = (_: any) => {}}: {state: any, onChange: any}) {
  let [editorContent, setEditorContent] = useState("")

  useEffect(() => {
    setEditorContent(state)
    setEditorContent(state.content)
  }, [state])

  return <>

            <div className={clsx("bg-gray-800 rounded p-2")}>
              <div className={clsx("flex")}>
                <textarea onChange={(e) => {setEditorContent(e.target.value); onChange(e.target.value)}} value={editorContent} className={clsx("w-full h-64 bg-gray-800 rounded p-2")}></textarea>
              </div>
            </div>
  </>
}
