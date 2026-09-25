import { useNavigate } from "react-router";
import { BreadCrumbComponent } from "../page-settings/Breadcrumb";
import { PageTitle } from "../page-settings/PageTitle";

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <BreadCrumbComponent links={[{ title: "Change Password" }]} />
      <PageTitle title="Change Password" />
      <div className="max-w-2xl rounded-3xl border border-amber-200 bg-amber-50 p-6 text-slate-700">
        <h2 className="font-semibold">Change password is not available yet</h2>
        <p className="mt-2 text-sm">
          The backend currently has no change-password endpoint or controller.
          No password request was sent and no frontend-only password change was
          performed.
        </p>
        <button
          onClick={() => navigate("/admin")}
          className="mt-5 rounded bg-slate-800 px-4 py-2 text-white"
        >
          Back to Admin
        </button>
      </div>
    </div>
  );
}
