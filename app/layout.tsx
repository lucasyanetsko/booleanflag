export const metadata = {
  title: 'Boolean Flag',
  description: 'Click the Boolean Flag and hear it chant forever.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
