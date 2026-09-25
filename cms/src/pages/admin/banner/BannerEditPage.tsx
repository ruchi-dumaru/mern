import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BreadCrumbComponent } from "../page-settings/Breadcrumb";
import { PageTitle } from "../page-settings/PageTitle";
import { getRequest, putRequest } from "../../../config/axios.config";
import { notifyError, notifySuccess } from "../../../utilities/helpers";

type BannerForm = {
  title: string;
  link: string;
  status: "active" | "inactive";
  image?: File;
};

export default function BannerEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<BannerForm>({
    title: "",
    link: "",
    status: "inactive",
  });
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getRequest(`/banner/${id}`);
        const banner = response.data;
        setForm({
          title: banner.title,
          link: banner.link,
          status: banner.status,
        });
        setExistingImage(
          banner.image?.optimizedUrl || banner.image?.originalUrl || "",
        );
      } catch (exception) {
        notifyError({
          title: "Unable to load banner",
          description: (exception as { message?: string })?.message,
        });
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [id]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.title.trim() || !form.link) {
      notifyError({ title: "Title and URL are required" });
      return;
    }
    try {
      setSubmitting(true);
      const body = new FormData();
      body.append("title", form.title.trim());
      body.append("link", form.link);
      body.append("status", form.status);
      if (form.image) body.append("image", form.image);
      const response = (await putRequest(`/banner/${id}`, body)) as any;
      if (response?.status !== "OK" || !response?.data)
        throw new Error(response?.message || "Banner was not updated");
      notifySuccess({ title: "Banner updated successfully" });
      navigate("/admin/banners");
    } catch (exception) {
      notifyError({
        title: "Banner update failed",
        description: (exception as { message?: string })?.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading banner...</p>;
  return (
    <>
      <BreadCrumbComponent
        links={[
          { title: "Banner Management", url: "/admin/banners" },
          { title: "Edit Banner" },
        ]}
      />
      <PageTitle title="Edit Banner" />
      <form
        onSubmit={submit}
        className="my-10 flex flex-col gap-5 rounded-3xl border border-slate-200 p-5"
      >
        <input
          required
          minLength={3}
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          placeholder="Title"
          className="rounded p-2"
        />
        <input
          required
          type="url"
          value={form.link}
          onChange={(event) => setForm({ ...form, link: event.target.value })}
          placeholder="URL"
          className="rounded p-2"
        />
        <div>
          <label>
            <input
              type="radio"
              checked={form.status === "active"}
              onChange={() => setForm({ ...form, status: "active" })}
            />{" "}
            Publish
          </label>
          <label className="ml-5">
            <input
              type="radio"
              checked={form.status === "inactive"}
              onChange={() => setForm({ ...form, status: "inactive" })}
            />{" "}
            Un-Publish
          </label>
        </div>
        {existingImage && (
          <img
            src={existingImage}
            alt={form.title}
            className="h-24 w-40 object-cover"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(event) =>
            setForm({ ...form, image: event.target.files?.[0] })
          }
        />
        <div>
          <button
            type="button"
            onClick={() => navigate("/admin/banners")}
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
