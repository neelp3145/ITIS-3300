import { Provider } from "@/components/ui/provider"
import Header from "@/components/layouts/header"
import Footer from "@/components/layouts/footer"
import { ReactNode } from "react"

export default function RootLayout(props: { children: ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body>
        <Header />
        <Provider>{children}</Provider>
        <Footer />
      </body>
    </html>
  )
}