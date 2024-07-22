export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh place-content-center bg-background">
      <div className="max-h-[min(90svh,calc((16/9)*95svw))] w-[95svw] max-w-screen-sm rounded-xl bg-card p-8 drop-shadow-2xl">
        {children}
      </div>
    </div>
  )
}
