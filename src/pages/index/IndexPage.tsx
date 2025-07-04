import AnalystResponse from "@/features/analyst-response";
import Form from "@/widgets/form";
import HowToFillForm from "@/widgets/how-to-fill-form";

export const IndexPage = () => {
  return (
    <div className="flex flex-col m-auto items-center self-center gap-6 mb-10 lg:mx-[20vmin] xl:mx-[50vmin]">
      <HowToFillForm />
      <Form className="w-full lg:px-[3vw] lg:py-5" />
      <AnalystResponse />
    </div>
  )
};
