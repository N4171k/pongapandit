import { BackgroundBlobs } from '@/components/layout/BackgroundBlobs'
import { Nav } from '@/components/layout/Nav'
import { AppShell } from '@/components/AppShell'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <BackgroundBlobs />
      <Nav />
      <main className="relative z-10 mx-auto max-w-[1120px] px-7 pb-36">
        <AppShell />
      </main>
      <Footer />
    </>
  )
}
