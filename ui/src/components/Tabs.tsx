import clsx from "clsx"

export default function Tabs({ children }: { children: any }) {
  return <>
    <div className={clsx("flex gap-2")}>
      {children}
    </div>

  </>
}
