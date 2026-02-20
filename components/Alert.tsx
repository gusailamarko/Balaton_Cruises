import { useEffect } from "react"

const Alert = ({ open, type, message, duration = 3000, onClose }: AlertProps) => {
  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => onClose(), duration)
    return () => clearTimeout(t)
  }, [open, duration, onClose])

  if (!open) return null

  const style =
    type === "success"
      ? "bg-green-500"
      : type === "failure"
      ? "bg-red-500"
      : "bg-yellow-500"

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 ${style} text-white border-0 px-8 py-4 rounded shadow-lg flex items-center gap-4 w-[80%] md:w-[50%] text-center`}>
      <div className="flex-1">{message}</div>
    </div>
  )
}

export default Alert
