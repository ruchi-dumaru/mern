
import AdminLayoutPage from "../layouts/AdminLayoutPage";
import AdminDashboardPage from "./AdminDashboardPage"
import BannerListPage from "./banner/BannerListPage";
import BannerCreatePage from "./banner/BannerCreatePage";
export const AdminRouter=[
   {
    path: "/admin",
    element: <AdminLayoutPage />,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      {
        path: "banners",
        Component: BannerListPage,
      },
      {
        path:"banner/create",Component:BannerCreatePage
      }
    ],
  },
]