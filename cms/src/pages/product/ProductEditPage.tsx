import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BreadCrumbComponent } from "../admin/page-settings/Breadcrumb";
import { PageTitle } from "../admin/page-settings/PageTitle";
import { getRequest, putRequest } from "../../config/axios.config";
import { notifyError, notifySuccess } from "../../utilities/helpers";

type Option = { _id: string; name: string };

type ProductForm = {
  name: string;
  description: string;
  category: string;
  brand: string;
  price: string;
  discount: string;
  status: "active" | "inactive";
  isFeatured: boolean;
};

export default function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    discount: "0",
    status: "inactive",
    isFeatured: false,
  });
  const [categories, setCategories] = useState<Option[]>([]);
  const [brands, setBrands] = useState<Option[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    const load = async () => {
      try {
        const [productResponse, categoryResponse, brandResponse] =
          await Promise.all([
            getRequest(`/product/${id}`),
            getRequest("/category", { params: { limit: 100 } }),
            getRequest("/brand", { params: { limit: 100 } }),
          ]);
        const product = productResponse.data;
        const firstCategory = Array.isArray(product.category)
          ? product.category[0]
          : product.category;
        setForm({
          name: product.name,
          description: product.description || "",
          category: firstCategory?._id || firstCategory || "",
          brand: product.brand?._id || product.brand || "",
          price: String((product.price || 0) / 100),
          discount: String(product.discount || 0),
          status: product.status,
          isFeatured: Boolean(product.isFeatured),
        });
        setExistingImages(
          (product.images ?? [])
            .map(
              (image: { optimizedUrl?: string; originalUrl?: string }) =>
                image.optimizedUrl || image.originalUrl,
            )
            .filter(Boolean),
        );
        setCategories(categoryResponse?.data ?? []);
        setBrands(brandResponse?.data ?? []);
      } catch (exception) {
        notifyError({
          title: "Unable to load product",
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
    const numericPrice = Number(form.price);
    const numericDiscount = Number(form.discount);
    if (
      !form.name.trim() ||
      !Number.isFinite(numericPrice) ||
      numericPrice < 100 ||
      !Number.isFinite(numericDiscount) ||
      numericDiscount < 0 ||
      numericDiscount > 90
    ) {
      notifyError({ title: "Enter valid product details" });
      return;
    }
    try {
      setSubmitting(true);
      const body = new FormData();
      body.append("name", form.name.trim());
      body.append("description", form.description.trim());
      body.append("category", form.category);
      body.append("brand", form.brand);
      body.append("price", String(numericPrice));
      body.append("discount", String(numericDiscount));
      body.append("status", form.status);
      body.append("isFeatured", String(form.isFeatured));
      images.forEach((image) => body.append("images", image));
      const response = (await putRequest(`/product/${id}`, body)) as any;
      if (response?.status !== "OK" || !response?.data)
        throw new Error(response?.message || "Product was not updated");
      notifySuccess({ title: "Product updated successfully" });
      navigate("/admin/products");
    } catch (exception) {
      notifyError({
        title: "Product update failed",
        description:
          (exception as { message?: string })?.message || "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) return <p>Loading product...</p>;
  return (
    <>
      <BreadCrumbComponent
        links={[
          { title: "Product Management", url: "/admin/products" },
          { title: "Edit Product" },
        ]}
      />
      <PageTitle title="Edit Product" />
      <form
        onSubmit={submit}
        className="my-10 flex flex-col gap-5 rounded-3xl border border-slate-200 p-5"
      >
        <label className="font-semibold">
          Product Name
          <input
            required
            minLength={2}
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="mt-1 w-full rounded p-2"
          />
        </label>
        <label className="font-semibold">
          Description
          <textarea
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
            className="mt-1 w-full rounded p-2"
            rows={4}
          />
        </label>
        <label className="font-semibold">
          Category
          <select
            value={form.category}
            onChange={(event) =>
              setForm({ ...form, category: event.target.value })
            }
            className="mt-1 w-full rounded p-2"
          >
            <option value="">None</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="font-semibold">
          Brand
          <select
            value={form.brand}
            onChange={(event) =>
              setForm({ ...form, brand: event.target.value })
            }
            className="mt-1 w-full rounded p-2"
          >
            <option value="">None</option>
            {brands.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="font-semibold">
          Price
          <input
            required
            type="number"
            min="100"
            step="0.01"
            value={form.price}
            onChange={(event) =>
              setForm({ ...form, price: event.target.value })
            }
            className="mt-1 w-full rounded p-2"
          />
        </label>
        <label className="font-semibold">
          Discount (%)
          <input
            type="number"
            min="0"
            max="90"
            step="0.01"
            value={form.discount}
            onChange={(event) =>
              setForm({ ...form, discount: event.target.value })
            }
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
          Featured product
        </label>
        {existingImages.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {existingImages.map((image) => (
              <img
                key={image}
                src={image}
                alt={form.name}
                className="h-20 w-24 rounded object-cover"
              />
            ))}
          </div>
        )}
        <label className="font-semibold">
          Add images
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(event) =>
              setImages(Array.from(event.target.files ?? []))
            }
            className="mt-1 block w-full rounded p-2"
          />
        </label>
        <div>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
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
