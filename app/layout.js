export const metadata = {
  title: 'Enterprise GPT Portal',
  description: 'Enterprise HR and Policy Assistant',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#020617' }}>
        {children}
      </body>
    </html>
  );
}
