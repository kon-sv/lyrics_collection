import { useCallback, useEffect, useState } from 'react';
import { ContentState, EditorState } from 'draft-js';
import clsx from 'clsx';

import { assignLyrics } from '@/util/requests';

import dynamic from 'next/dynamic'
import { EditorProps } from 'react-draft-wysiwyg'
// const Editor = dynamic<EditorProps>(
//   () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
//   { ssr: false }
//
// )
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import SongItem from '@/objects/SongItem';
import SongItemInternal from '@/objects/SongItemInternal';
import LcButton from './layout/LcButton';
import Editor from './Editor';


export default function SongEdit({ song, onSave }: { song?: SongItem, onSave?: (evt: any) => void }) {
  let [editorState, setEditorState] = useState(EditorState.createEmpty())
  let [customEditorState, setCustomEditorState] = useState({content: ""})
  let [language, setLanguage] = useState("ja")

  let [isSynced, setIsSynced] = useState(false)

  const save = useCallback(() => {
    let lyrics = editorState.getCurrentContent().getPlainText()

    console.log(editorState.getCurrentContent())
    console.log(lyrics)
    console.log(customEditorState)

    lyrics = customEditorState.content


    // let s = new SongItem({
    //   lyrics: lyrics,
    //   filename: song?.title,
    //   filepath: song?.path,
    //   id: ""
    // })

    assignLyrics(song?.id as string, lyrics, language, isSynced)
    
  }, [song, editorState, customEditorState, language, isSynced])


  useEffect(() => {
    setEditorState(EditorState.createEmpty())
    setCustomEditorState({content: ""})
    if (song instanceof SongItemInternal) {

      let lyricsGrouped = song.lyricsByLanguage()
       if (lyricsGrouped[language] != undefined && lyricsGrouped[language].length > 0) {
          let lyrics =  lyricsGrouped[language]
          setEditorState(EditorState.createWithContent(ContentState.createFromText(lyrics)))
          setCustomEditorState({content: lyrics})
          setIsSynced(song.syncedLyrics ?? false)
      }
    }
  }, [song, language])

  return <>

    <div className={clsx("mb-4")}>
    <LcButton className={clsx("mr-2")} onClick={(evt: any) => { save(); onSave && onSave(evt)}}>Save</LcButton>

    <select className={clsx("bg-gray-500 rounded mr-2 p-1 max-w-[120px]")} onChange={(e) => {setLanguage(e.target.value)}}>
      <option value="ja">Japanese</option>
      <option value="en">English</option>
    </select>

    <input id="isSynced" onChange={(e) => {setIsSynced(e.target.checked)}} type="checkbox" className={clsx("mr-2")} />
    <label htmlFor="isSynced" className={clsx("mr-2")}>Synced</label>

    </div>
    
    <Editor state={customEditorState} onChange={(value: any) => {setCustomEditorState({content: value}); console.log(value)}}></Editor>

  </>
}


    // <Editor
    //   editorState={editorState}
    //   toolbarClassName={clsx("bg-gray-700 p-2 rounded")}
    //   wrapperClassName="wrapperClassName"
    //   editorClassName={clsx("bg-gray-800 p-2 rounded text-white")}
    //   onEditorStateChange={onEditorStateChange}
    // />
