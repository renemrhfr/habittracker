import { GlobalStateProvider } from '../context/GlobalStateProvider';
import './globals.css';

export const metadata = {
  title: 'Habit Tracker',
  description: 'Track your habits and improve your life',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-800  text-white">
        <GlobalStateProvider>
          {children}
        </GlobalStateProvider>
      </body>
    </html>
  );
}