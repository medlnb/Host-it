import NewPostNav from "@components/NewPostNav";
import NewPostProv from "@components/NewPostProv";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NewPostNav />
      <NewPostProv>{children}</NewPostProv>
    </div>
  );
}

export default Layout;
