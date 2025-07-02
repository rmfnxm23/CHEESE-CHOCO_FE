import Footer from "@/components/Footer";

export default function Layout({
  children,
  showFooter = true,
}: {
  children: React.ReactNode;
  showFooter?: boolean;
}) {
  return (
    <div className="layout-wrapper">
      <main className="layout-content">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
