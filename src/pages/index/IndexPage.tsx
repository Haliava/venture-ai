import Form from "@/widgets/form";
import HowToFillForm from "@/widgets/how-to-fill-form";

export const IndexPage = () => {
  return (
    <div className="flex flex-col gap-4 mb-10">
      <HowToFillForm />
      <Form />
    </div>
  )
};
