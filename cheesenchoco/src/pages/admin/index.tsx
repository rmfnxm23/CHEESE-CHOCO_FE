import AdminPage from "@/features/AdminManagement";
import Template from "@/features/layouts/Template";

const Admin = () => {
  return <AdminPage />;
};

Admin.getLayout = (page: React.ReactNode) => <Template>{page}</Template>;

export default Admin;
