export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-full px-4 md:max-w-screen-xl md:px-8">
      {children}
    </div>
  );
}
