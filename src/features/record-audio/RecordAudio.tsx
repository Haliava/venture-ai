import { STATUS, TIMER_FOR_N_MINUTES } from "@/shared/constants/audio";
import { useRecordAudio } from "@/shared/hooks/useRecordAudio";
import { displayTimerTime } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import CircularProgress from "@/shared/ui/CircularProgress";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { Icon } from "@/shared/ui/icon";
import { useEffect, useState } from "react";

export const RecordAudio = ({ className, disabled }: { className?: string; disabled?: boolean }) => {
  const {
    isScreenLarge,
    recordingProgress,
    elapsedSeconds,
    hasMicAccess,
    isMicrophoneAvailable,
    handleEndRecording,
    handlePauseRecording,
    handleResumeRecording,
    handleStartRecording,
    stopRecordingButton,
    isLoadingTranscription,
    recordingStatus,
    mediaBlobUrl,
    clearMediaBlobUrl,
  } = useRecordAudio();

  // Управление состоянием Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Сброс записи при закрытии Drawer
  useEffect(() => {
    if (!drawerOpen) {
      // Если запись активна - останавливаем
      if (recordingStatus !== STATUS.IDLE && recordingStatus !== STATUS.STOPPED) {
        handleEndRecording();
      }
      
      // Очищаем медиа-ресурсы
      if (mediaBlobUrl) {
        clearMediaBlobUrl();
      }
    }
  }, [drawerOpen, recordingStatus, mediaBlobUrl]);

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger className={className} asChild>
        <Button
          className="flex items-center h-max justify-center gap-2.5 bg-none border-2 py-2.5 px-8 [&&]:pr-5 lg:[&&]:pr-1 lg:border-none bg-bg-grey hover:border-check hover:border-2 hover:bg-bg-grey"
          {...(!isScreenLarge && {variant: 'outline'})}
          disabled={disabled}
        >
          <Icon className="size-10 fill-white hover:bg-check" type="microphone" />
          {!isScreenLarge && <p className="font-semibold text-ai-lg">Начать запись аудио</p>}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-bg-accent border-none flex flex-col gap-4 items-center justify-center lg:ml-[20vmin] lg:mr-[calc(20vmin+15px)] xl:ml-[50vmin] xl:mr-[calc(50vmin+15px)]">
        <DrawerHeader className="relative flex items-center justify-center">
          <DrawerTitle className="font-semibold text-[1.5rem] text-white">Запись аудиоистории</DrawerTitle>
          <DrawerDescription className="font-medium text-[1rem] text-check text-center flex flex-col items-center justify-center gap-5 mb-5">
            Автоматически остановится при достижении длительности {TIMER_FOR_N_MINUTES} минут.
          </DrawerDescription>
          <CircularProgress
            className="w-[12rem] h-[12rem] -rotate-90"
            strokeWidth={5}
            value={recordingProgress}
            disabled={isLoadingTranscription}
          />
          <div className="absolute bottom-[6rem] *:font-medium *:text-ai-lg flex gap-1.5">
            <p>{displayTimerTime(elapsedSeconds)}</p>
            <p className="text-check">/</p>
            <p className="text-check">{TIMER_FOR_N_MINUTES}:00</p>
          </div>
        </DrawerHeader>
        <div className="min-h-[15vmin] w-full flex flex-col items-center">
          <div className="flex flex-col gap-5 w-full max-w-xs">
            {(recordingStatus === STATUS.IDLE || recordingStatus === STATUS.STOPPED) && (
              <Button
                disabled={!hasMicAccess || !isMicrophoneAvailable}
                onClick={handleStartRecording}
                className="flex gap-2.5 min-h-fit [&&]:px-8 [&&]:py-2 bg-danger hover:bg-danger-secondary w-full"
              >
                <Icon type="circle" className="size-6" />
                <p className="font-semibold text-ai-lg lg:font-medium">Начать запись</p>
              </Button>
            )}
            {recordingStatus !== STATUS.IDLE && recordingStatus !== STATUS.STOPPED && (
              <>
                <Button
                  ref={stopRecordingButton}
                  onClick={handleEndRecording}
                  variant="outline"
                  className="flex h-max gap-2 border-2 bg-bg-accent active:bg-transparent [&&]:hover:bg-transparent active:text-white hover:text-white w-full"
                >
                  <Icon type="square" className="size-3.5" />
                  <p className="font-semibold text-ai-lg lg:font-medium">Закончить запись</p>
                </Button>
                
                {isLoadingTranscription && (
                  <div className="text-white text-center w-full">
                    Обработка аудио...
                  </div>
                )}
                
                {recordingStatus === STATUS.RECORDING && (
                  <Button
                    onClick={handlePauseRecording}
                    className="flex h-max gap-2 border-2 bg-white active:bg-text-field-hint hover:bg-text-field-hint [&&]:px-8 [&&]:py-2 w-full"
                  >
                    <Icon type="pause" className="size-5 fill-black" />
                    <p className="text-black font-semibold text-ai-lg lg:font-medium">Пауза</p>
                  </Button>
                )}
                
                {recordingStatus === STATUS.PAUSED && (
                  <Button
                    onClick={handleResumeRecording}
                    className="flex h-max gap-2 border-2 bg-white [&&]:active:bg-text-field-hint [&&]:hover:bg-text-field-hint [&&]:px-8 [&&]:py-2 w-full"
                  >
                    <Icon type="triangle" className="size-5" />
                    <p className="text-black font-semibold text-ai-lg lg:font-medium">Продолжить</p>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}