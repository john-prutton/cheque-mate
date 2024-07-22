export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background grid min-h-svh place-content-center">
      <div className="bg-card max-h-[min(90svh,calc((16/9)*95svw))] w-[95svw] max-w-screen-sm rounded-xl p-8 drop-shadow-2xl">
        {children}
      </div>
    </div>
  )
}
