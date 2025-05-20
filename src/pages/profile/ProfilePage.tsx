import UserForm from "@/widgets/user-form";

export const ProfilePage = () => {
  return (
    <div className="mx-[5vmin] lg:mx-[20vmin] xl:mx-[50vmin] flex flex-col gap-4">
      <UserForm className="w-full mt-5" />
    </div>
  )
}