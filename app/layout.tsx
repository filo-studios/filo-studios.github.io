import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${mono.variable} ${display.variable} dark`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider theme={{ forcedTheme: 'dark', enableSystem: false }}>{children}</RootProvider>
      </body>
    </html>
  );
}
