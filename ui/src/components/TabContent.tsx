export default function TabContent({children, show}: {children: any, show: boolean}) {
  return show ? <>
    <div>{children}</div>
  </> : null

}
