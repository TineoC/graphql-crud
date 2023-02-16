import "./globals.css"
import { Inter } from "@next/font/google"

const inter = Inter({ weight: ["700", "500", "400"], subsets: ["latin"] })

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			{/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
			<head />
			<body className={inter.className}>
				<h1 className='text-3xl font-bold'>SpaceX Launches</h1>
				{children} <footer>Christopher Tineo &copy; 2023</footer>
			</body>
		</html>
	)
}
