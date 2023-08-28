import { useCallback, useState } from 'react';
import { EditorState } from 'draft-js';
import clsx from 'clsx';

import { assignLyrics } from '@/util/requests';

import dynamic from 'next/dynamic'
import { EditorProps } from 'react-draft-wysiwyg'
const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }

)
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import SongItemSubsonic from '@/objects/SongItemSubsonic';


export default function SongEdit({ song, onSave }: { song?: SongItemSubsonic, onSave?: (evt: any) => void }) {
  let [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = useCallback((editorState: EditorState) => {
    setEditorState(editorState)
  }, [])

  const save = useCallback(() => {
    console.log(song)
    let lyrics = editorState.getCurrentContent().getPlainText()


    // let s = new SongItem({
    //   lyrics: lyrics,
    //   filename: song?.title,
    //   filepath: song?.path,
    //   id: ""
    // })

    assignLyrics(song?.id as string, lyrics, "ja")
    
  }, [song, editorState])

  return <>
    <button className={clsx("rounded bg-green-600 p-1 mb-4", "text-center px-2 min-w-[60px] rounded p-1 font-bold bg-gray-600 hover:cursor-pointer hover:bg-green-500")}
      onClick={(evt) => { save(); onSave && onSave(evt) } }

    >
      Save
    </button>
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName={clsx("bg-gray-800 p-2 rounded")}
      onEditorStateChange={onEditorStateChange}
    />
  </>
}
