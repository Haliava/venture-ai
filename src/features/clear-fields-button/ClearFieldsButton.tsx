import { Button } from "@/shared/ui/button"
import { DialogHeader, DialogFooter, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/shared/ui/dialog"

export type ClearFieldsButtonProps = {
  resetForm: () => void
}

export const ClearFieldsButton = ({resetForm}: ClearFieldsButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <p className="underline font-semibold text-[20px]">Очистить все поля</p>
      </DialogTrigger>
      <DialogContent className="m-auto p-0 text-black w-[90vw]">
        <DialogHeader className="p-[12px]">
          <DialogTitle className="text-[20px] font-semibold">
            Вы точно хотите очистить все поля?
          </DialogTitle>
          <DialogDescription className="text-[16px] font-medium">
            После удаления вернуть информацию о&nbsp;проекте будет невозможно.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-0 justify-items-start">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="flex-1/2 rounded-none rounded-bl-lg text-check hover:text-black active:text-black"
              onClick={resetForm}
            >
              <p className="font-semibold text-[20px]">Да</p>
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="flex-1/2 rounded-none rounded-br-lg text-check hover:text-black active:text-black"
            >
              <p className="font-semibold text-[20px]">Нет</p>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}