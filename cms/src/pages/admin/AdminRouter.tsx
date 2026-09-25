import AdminLayoutPage from "../layouts/AdminLayoutPage";
import AdminDashboardPage from "./AdminDashboardPage";
import BannerListPage from "./banner/BannerListPage";
import BannerCreatePage from "./banner/BannerCreatePage";
import BannerEditPage from "./banner/BannerEditPage";
import BrandListPage from "./brand/BrandListPage";
import BrandCreatePage from "./brand/BrandCreatePage";
import BrandEditPage from "./brand/BrandEditPage";
import CategoryListPage from "./category/CategoryListPage";
import CategoryCreatePage from "./category/CategoryCreatePage";
import CategoryEditPage from "./category/CategoryEditPage";
import ProductListPage from "../product/ProductListPage";
import ProductCreatePage from "../product/ProductCreatePage";
import ProductEditPage from "../product/ProductEditPage";
import OrderListPage from "./order/OrderListPage";
import OrderDetailsPage from "./order/OrderDetailsPage";
import ChatPage from "../chat/ChatPage";
export const AdminRouter = [
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
        path: "banner/create",
        Component: BannerCreatePage,
      },
      {
        path: "banner/:id/edit",
        Component: BannerEditPage,
      },
      {
        path: "brands",
        Component: BrandListPage,
      },
      {
        path: "brand/create",
        Component: BrandCreatePage,
      },
      {
        path: "brand/:id/edit",
        Component: BrandEditPage,
      },
      {
        path: "categories",
        Component: CategoryListPage,
      },
      {
        path: "category/create",
        Component: CategoryCreatePage,
      },
      {
        path: "category/:id/edit",
        Component: CategoryEditPage,
      },
      {
        path: "products",
        Component: ProductListPage,
      },
      {
        path: "product/create",
        Component: ProductCreatePage,
      },
      {
        path: "product/:id/edit",
        Component: ProductEditPage,
      },
      {
        path: "orders",
        Component: OrderListPage,
      },
      {
        path: "orders/:id",
        Component: OrderDetailsPage,
      },
      { path: "chat", Component: ChatPage },
    ],
  },
];
