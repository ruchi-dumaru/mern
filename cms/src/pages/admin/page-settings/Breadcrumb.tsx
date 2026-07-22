// import type { ReactNode } from "react";
// import { NavLink } from "react-router";

// interface ILinkType {
//   title: string;
//   url?: string;
//   icon?: ReactNode;
// }
// interface IBreadCrumbComponentProps {
//   links: Array<ILinkType>;
// }
// export const BreadCrumbComponent = ({
//   links,
// }: Readonly<IBreadCrumbComponentProps>) => {
//   return (
//     <>
//       <nav className="text-sm text-slate-500">
//         <NavLink to="/admin" className="text-slate-600 hover:text-slate-900">
//           Admin
//         </NavLink>
//         <span className="mx-2">/</span>
//         <NavLink
//           to="/admin/banners"
//           className="text-slate-600 hover:text-slate-900"
//         >
//           Banners
//         </NavLink>

//         {links &&
//           links.map((item: ILinkType, ind: number) => (
//             <div key={ind}>
//               {item.url ? (
//                 <>
//                   <span className="mx-2">/</span>
//                   <NavLink
//                     to={item.url}
//                     className="text-slate-600 hover:text-slate-900"
//                   >
//                   {item.icon}{item.title}
//                   </NavLink>{" "}
//                 </>
//               ) : (
//                 <>
//                   <span className="mx-2">{item.icon}{item.title}</span>
//                 </>
//               )}
//             </div>
//           ))}
//       </nav>
//     </>
//   );
// };


import type { ReactNode } from "react";
import { NavLink } from "react-router";

interface ILinkType {
  title: string;
  url?: string;
  icon?: ReactNode;
}

interface IBreadCrumbComponentProps {
  links: Array<ILinkType>;
}

export const BreadCrumbComponent = ({
  links,
}: Readonly<IBreadCrumbComponentProps>) => {
  return (
    <nav className="flex flex-wrap items-center text-sm text-slate-500">
      <NavLink
        to="/admin"
        className="text-slate-600 hover:text-slate-900"
      >
        Admin
      </NavLink>

      {links.map((item, index) => (
        <span key={index} className="flex items-center">
          <span className="mx-2">/</span>

          {item.url ? (
            <NavLink
              to={item.url}
              className="text-slate-600 hover:text-slate-900"
            >
              {item.icon}
              {item.title}
            </NavLink>
          ) : (
            <span className="text-slate-800 font-medium">
              {item.icon}
              {item.title}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
};