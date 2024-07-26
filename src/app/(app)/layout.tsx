export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-row items-center justify-center p-2">
      <div className="w-full sm:max-w-lg">{children}</div>
    </div>
  )
}
