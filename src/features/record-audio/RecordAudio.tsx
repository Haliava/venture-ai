import { STATUS, TIMER_FOR_N_MINUTES } from "@/shared/constants/audio";
import { displayTimerTime } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button"
import CircularProgress from "@/shared/ui/CircularProgress";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/shared/ui/drawer"
import { Icon } from "@/shared/ui/icon"
import { useEffect, useRef, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

var saveData = (function () {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function (data, fileName) {
      var json = JSON.stringify(data),
          blob = new Blob([json], {type: "audio/wav"}),
          url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
  };
}());

export const RecordAudio = () => {
  const [currentRecordingStatus, setCurrentRecordingStatus] = useState<STATUS>();
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerDisplayTimeInterval = useRef<NodeJS.Timeout | null>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const stopRecordingButton = useRef<HTMLButtonElement | null>(null);

  const handleSendRecording = (recordingBlob: string) => {
    console.log(recordingBlob);
    saveData(recordingBlob, 'res.wav');
  }

  useEffect(() => {
    if ((!timerInterval.current || !timerDisplayTimeInterval.current) && currentRecordingStatus !== STATUS.RECORDING) {
      return;
    }

    if (currentRecordingStatus === STATUS.RECORDING) {
      timerInterval.current = setInterval(() => setRecordingProgress(prev => prev + 1), TIMER_FOR_N_MINUTES * 60 * 1000 / 100)
      timerDisplayTimeInterval.current = setInterval(() => setElapsedSeconds(prev => prev + 1), 1000)
    }

    if (currentRecordingStatus === STATUS.PAUSED) {
      timerInterval.current && clearInterval(timerInterval.current);
      timerDisplayTimeInterval.current && clearInterval(timerDisplayTimeInterval.current);
    }

    if (currentRecordingStatus === STATUS.STOPPED) {
      timerInterval.current && clearInterval(timerInterval.current);
      timerDisplayTimeInterval.current && clearInterval(timerDisplayTimeInterval.current);
      setRecordingProgress(0);
      setElapsedSeconds(0);
    }

    return () => {
      timerInterval.current && clearInterval(timerInterval.current);
      timerDisplayTimeInterval.current && clearInterval(timerDisplayTimeInterval.current);
    }
  }, [currentRecordingStatus])

  useEffect(() => {
    if (elapsedSeconds >= TIMER_FOR_N_MINUTES * 60) {
      stopRecordingButton.current?.click()
    }
  }, [elapsedSeconds])

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="flex items-center h-max justify-center gap-2.5 bg-none border-2 py-2.5 px-8" variant="outline">
          <Icon className="size-8 fill-white" type="microphone" />
          <p className="font-semibold text-[20px]">Начать запись аудио</p>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-bg-accent border-none flex flex-col gap-4 items-center justify-center">
        <DrawerHeader className="flex items-center justify-center">
          <DrawerTitle className="font-semibold text-[20px] text-white">Запись аудиоистории</DrawerTitle>
          <DrawerDescription className="font-medium text-[16px] text-check text-center flex flex-col items-center justify-center gap-5 mb-5">
            Автоматически остановится при достижении длительности 10 минут.
          </DrawerDescription>
          <CircularProgress className="relative w-[160px] h-[160px] -rotate-90" strokeWidth={5} value={recordingProgress} />
          <div className="absolute top-[230px] *:font-medium *:text-[20px] flex gap-1.5">
            <p>{displayTimerTime(elapsedSeconds)}</p>
            <p className="text-check">/</p>
            <p className="text-check">{TIMER_FOR_N_MINUTES}:00</p>
          </div>
        </DrawerHeader>
        <div className="min-h-[40vmin]">
          <ReactMediaRecorder
            audio
            render={({ status, startRecording, stopRecording, pauseRecording, resumeRecording, mediaBlobUrl }) => (
              <div className="flex flex-col gap-5">
                {(status === STATUS.IDLE || status === STATUS.STOPPED) && (
                  <Button
                    onClick={() => {
                      startRecording();
                      setCurrentRecordingStatus(STATUS.RECORDING);
                    }}
                    className="flex gap-2.5 min-h-fit [&&]:px-8 [&&]:py-2 bg-danger"
                  >
                    <Icon type="circle" className="size-6" />
                    <p className="font-semibold text-[20px]">Начать запись</p>
                  </Button>
                )}
                <video src={mediaBlobUrl} controls loop />
                {status !== STATUS.IDLE && status !== STATUS.STOPPED && (
                  <>
                    <Button ref={stopRecordingButton} onClick={() => {
                      stopRecording();
                      setCurrentRecordingStatus(STATUS.STOPPED);
                      if (mediaBlobUrl) {
                        handleSendRecording(mediaBlobUrl);
                      }
                    }} variant="outline" className="flex gap-2 border-2 bg-[rgba(86, 86, 86, 1)] active:bg-none">
                      <Icon type="square" className="size-3.5" />
                      <p className="font-semibold text-[20px]">Закончить запись</p>
                    </Button>
                    {status === STATUS.RECORDING && (
                      <Button
                        onClick={() => {
                          pauseRecording();
                          setCurrentRecordingStatus(STATUS.PAUSED);
                        }}
                        className="flex gap-2 border-2 bg-white active:bg-[rgba(217, 217, 217, 1)] [&&]:px-8 [&&]:py-2"
                      >
                        <Icon type="pause" className="size-5 fill-black" />
                        <p className="text-black font-semibold text-[20px]">Пауза</p>
                      </Button>
                    )}
                    {status === STATUS.PAUSED && (
                      <Button
                        onClick={() => {
                          resumeRecording();
                          setCurrentRecordingStatus(STATUS.RECORDING);
                        }}
                        className="flex gap-2 border-2 bg-white active:bg-[rgba(217, 217, 217, 1)] [&&]:px-8 [&&]:py-2"
                      >
                        <Icon type="triangle" className="size-5" />
                        <p className="text-black font-semibold text-[20px]">Продолжить</p>
                      </Button>
                    )}
                  </>
                )}
              </div>
            )}
          />
        </div>
      </DrawerContent>
    </Drawer>
    
  )
}