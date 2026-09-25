import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BreadCrumbComponent } from "../page-settings/Breadcrumb";
import { PageTitle } from "../page-settings/PageTitle";
import { getRequest, putRequest } from "../../../config/axios.config";
import { notifyError, notifySuccess } from "../../../utilities/helpers";

type BrandForm = {
  name: string;
  status: "active" | "inactive";
  isFeatured: boolean;
  logo?: File;
};

export default function BrandEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<BrandForm>({
    name: "",
    status: "inactive",
    isFeatured: false,
  });
  const [existingLogo, setExistingLogo] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getRequest(`/brand/${id}`);
        const brand = response.data;
        setForm({
          name: brand.name,
          status: brand.status,
          isFeatured: Boolean(brand.isFeatured),
        });
        setExistingLogo(
          brand.logo?.optimizedUrl || brand.logo?.originalUrl || "",
        );
      } catch (exception) {
        notifyError({
          title: "Unable to load brand",
          description:
            (exception as { message?: string })?.message || "Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [id]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim()) {
      notifyError({ title: "Brand name is required" });
      return;
    }
    try {
      setSubmitting(true);
      const body = new FormData();
      body.append("name", form.name.trim());
      body.append("status", form.status);
      body.append("isFeatured", String(form.isFeatured));
      if (form.logo) body.append("logo", form.logo);
      const response = (await putRequest(`/brand/${id}`, body)) as any;
      if (response?.status !== "OK" || !response?.data)
        throw new Error(response?.message || "Brand was not updated");
      notifySuccess({ title: "Brand updated successfully" });
      navigate("/admin/brands");
    } catch (exception) {
      notifyError({
        title: "Brand update failed",
        description:
          (exception as { message?: string })?.message || "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading brand...</p>;
  return (
    <>
      <BreadCrumbComponent
        links={[
          { title: "Brand Management", url: "/admin/brands" },
          { title: "Edit Brand" },
        ]}
      />
      <PageTitle title="Edit Brand" />
      <form
        onSubmit={submit}
        className="my-10 flex flex-col gap-5 rounded-3xl border border-slate-200 p-5"
      >
        <label className="font-semibold">
          Brand Name
          <input
            required
            minLength={2}
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="mt-1 w-full rounded p-2"
          />
        </label>
        <div>
          <p className="font-semibold">Status</p>
          <label>
            <input
              type="radio"
              checked={form.status === "active"}
              onChange={() => setForm({ ...form, status: "active" })}
            />{" "}
            Active
          </label>
          <label className="ml-5">
            <input
              type="radio"
              checked={form.status === "inactive"}
              onChange={() => setForm({ ...form, status: "inactive" })}
            />{" "}
            Inactive
          </label>
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(event) =>
              setForm({ ...form, isFeatured: event.target.checked })
            }
          />{" "}
          Featured brand
        </label>
        {existingLogo && (
          <img
            src={existingLogo}
            alt={form.name}
            className="h-24 w-40 object-contain"
          />
        )}
        <label className="font-semibold">
          Replace logo
          <input
            type="file"
            accept="image/*"
            onChange={(event) =>
              setForm({ ...form, logo: event.target.files?.[0] })
            }
            className="mt-1 block w-full rounded p-2"
          />
        </label>
        <div>
          <button
            type="button"
            onClick={() => navigate("/admin/brands")}
            className="mr-4 rounded bg-red-900 p-2 text-white"
          >
            Cancel
          </button>
          <button
            disabled={submitting}
            type="submit"
            className="rounded bg-green-700 p-2 text-white"
          >
            {submitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
}
