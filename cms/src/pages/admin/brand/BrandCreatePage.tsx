import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { BreadCrumbComponent } from "../page-settings/Breadcrumb";
import { PageTitle } from "../page-settings/PageTitle";
import { LabelComponent } from "../../../components/form/LabelComponent";
import {
  MultipleOptionSingleSelectComponent,
  SingleFileInputComponent,
  TextInputComponent,
} from "../../../components/form/InputComponent";
import {
  CancelButton,
  SubmitButton,
} from "../../../components/form/ActionButtonsComponent";
import { postRequest } from "../../../config/axios.config";
import { notifyError, notifySuccess } from "../../../utilities/helpers";
import {
  BrandDataDTO,
  BrandDefaultData,
  type IBrandForm,
} from "./Brand.contract";

export default function BrandCreatePage() {
  const navigate = useNavigate();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<IBrandForm>({
    defaultValues: BrandDefaultData,
    resolver: yupResolver(BrandDataDTO),
  });

  const submit = async (data: IBrandForm) => {
    try {
      const body = new FormData();
      body.append("name", data.name.trim());
      body.append("status", data.status);
      body.append("isFeatured", String(data.isFeatured));
      if (data.logo instanceof File) body.append("logo", data.logo);

      const response = (await postRequest("/brand", body, {
        file: true,
        auth: true,
      })) as any;
      if (response?.status !== "OK" || !response?.data)
        throw new Error(response?.message || "Brand was not created");
      notifySuccess({ title: "Brand created successfully" });
      navigate("/admin/brands");
    } catch (exception) {
      notifyError({
        title: "Brand creation failed",
        description:
          (exception as { message?: string })?.message || "Please try again.",
      });
    }
  };

  return (
    <>
      <BreadCrumbComponent
        links={[
          { title: "Brand Management", url: "/admin/brands" },
          { title: "Brand Create Page" },
        ]}
      />
      <PageTitle title="Brand Create Page" />
      <div className="rounded-3xl border border-slate-200 p-4 shadow-sm sm:p-5">
        <form
          onSubmit={handleSubmit(submit)}
          onReset={() => navigate("/admin/brands")}
          className="my-20 flex flex-col gap-5"
        >
          <div className="space-y-1">
            <LabelComponent
              htmlFor="name"
              value="Brand Name"
              className="font-semibold"
            />
            <TextInputComponent
              control={control}
              name="name"
              errorMessage={errors.name?.message}
            />
          </div>
          <div className="space-y-2">
            <LabelComponent
              htmlFor="status"
              value="Status"
              className="font-semibold"
            />
            <MultipleOptionSingleSelectComponent
              control={control}
              name="status"
              errorMessage={errors.status?.message}
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...control.register("isFeatured")} />{" "}
            Featured brand
          </label>
          <div className="space-y-2">
            <LabelComponent
              htmlFor="logo"
              value="Logo (optional)"
              className="font-semibold"
            />
            <SingleFileInputComponent
              control={control}
              name="logo"
              errorMessage={errors.logo?.message as string}
            />
          </div>
          <div className="flex gap-5">
            <CancelButton isDisabled={isSubmitting} />
            <SubmitButton isDisabled={isSubmitting} />
          </div>
        </form>
      </div>
    </>
  );
}
