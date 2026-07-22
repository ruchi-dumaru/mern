// import { NavLink } from "react-router";


// interface IPageTitleProps {
//   title: string;
//   createBtn?: { title?: string; url?: string } | null;
// }

// export const PageTitle = ({
//   title,
//   createBtn = null
// }: Readonly<IPageTitleProps>) => {
//   return (
//     <>
//       {/* {page title} */}
//       <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="mt-2 text-2xl font-bold text-slate-800">
//             {/* Banner List */}
//             {title}
//           </h1>
//         </div>
//         createBtn?
//         <>
//           <NavLink
//             to={createBtn.url as string}
//             className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
//           >
//            {createBtn.title}
//           </NavLink>
//           :<></>
//         </>
//       </div>
//     </>
//   );
// };


import { NavLink } from "react-router";

interface IPageTitleProps {
  title: string;
  createBtn?: { title?: string; url?: string } | null;
}

export const PageTitle = ({ title, createBtn = null }: Readonly<IPageTitleProps>) => {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="mt-2 text-2xl font-bold text-slate-800">
          {title}
        </h1>
      </div>

      {/* Correct JSX wrapper and safe property access */}
      {createBtn && createBtn.title && createBtn.url ? (
        <NavLink
          to={createBtn.url}
          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          {createBtn.title}
        </NavLink>
      ) : null}
    </div>
  );
};
