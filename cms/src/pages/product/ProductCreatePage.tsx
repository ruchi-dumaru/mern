import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BreadCrumbComponent } from "../admin/page-settings/Breadcrumb";
import { PageTitle } from "../admin/page-settings/PageTitle";
import { getRequest, postRequest } from "../../config/axios.config";
import { notifyError, notifySuccess } from "../../utilities/helpers";

type Option = { _id: string; name: string };
type ProductResponse = { status?: string; message?: string; data?: unknown };

export default function ProductCreatePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("0");
  const [status, setStatus] = useState("inactive");
  const [isFeatured, setIsFeatured] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const [brands, setBrands] = useState<Option[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    const load = async () => {
      try {
        const [categoryResponse, brandResponse] = await Promise.all([
          getRequest("/category", { params: { limit: 100 } }),
          getRequest("/brand", { params: { limit: 100 } }),
        ]);
        setCategories(categoryResponse?.data ?? []);
        setBrands(brandResponse?.data ?? []);
      } catch (exception) {
        notifyError({
          title: "Unable to load categories or brands",
          description:
            (exception as { message?: string })?.message || "Please try again.",
        });
      } finally {
        setLoadingOptions(false);
      }
    };
    void load();
  }, []);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const numericPrice = Number(price);
    const numericDiscount = Number(discount);
    if (
      !name.trim() ||
      !Number.isFinite(numericPrice) ||
      numericPrice < 100 ||
      !Number.isFinite(numericDiscount) ||
      numericDiscount < 0 ||
      numericDiscount > 90
    ) {
      notifyError({
        title: "Enter valid product details",
        description: "Name, price and discount must be valid.",
      });
      return;
    }
    try {
      setSubmitting(true);
      const body = new FormData();
      body.append("name", name.trim());
      body.append("description", description.trim());
      body.append("category", category);
      body.append("brand", brand);
      body.append("price", String(numericPrice));
      body.append("discount", String(numericDiscount));
      body.append("status", status);
      body.append("isFeatured", String(isFeatured));
      images.forEach((image) => body.append("images", image));
      const response = (await postRequest("/product", body, {
        file: true,
        auth: true,
      })) as ProductResponse;
      if (response?.status !== "OK" || !response?.data)
        throw new Error(response?.message || "Product was not created");
      notifySuccess({ title: "Product created successfully" });
      navigate("/admin/products");
    } catch (exception) {
      notifyError({
        title: "Product creation failed",
        description:
          (exception as { message?: string })?.message || "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <BreadCrumbComponent
        links={[
          { title: "Product Management", url: "/admin/products" },
          { title: "Product Create Page" },
        ]}
      />
      <PageTitle title="Product Create Page" />
      <form
        onSubmit={submit}
        className="my-10 flex flex-col gap-5 rounded-3xl border border-slate-200 p-5"
      >
        <label className="font-semibold">
          Product Name
          <input
            required
            minLength={2}
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full rounded p-2"
          />
        </label>
        <label className="font-semibold">
          Description
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-1 w-full rounded p-2"
            rows={4}
          />
        </label>
        <label className="font-semibold">
          Category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            disabled={loadingOptions}
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
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            disabled={loadingOptions}
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
            value={price}
            onChange={(event) => setPrice(event.target.value)}
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
            value={discount}
            onChange={(event) => setDiscount(event.target.value)}
            className="mt-1 w-full rounded p-2"
          />
        </label>
        <div>
          <p className="font-semibold">Status</p>
          <label>
            <input
              type="radio"
              checked={status === "active"}
              onChange={() => setStatus("active")}
            />{" "}
            Active
          </label>
          <label className="ml-5">
            <input
              type="radio"
              checked={status === "inactive"}
              onChange={() => setStatus("inactive")}
            />{" "}
            Inactive
          </label>
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(event) => setIsFeatured(event.target.checked)}
          />{" "}
          Featured product
        </label>
        <label className="font-semibold">
          Images
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
            disabled={submitting}
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
            {submitting ? "Saving..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}
