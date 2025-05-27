import { useState, useRef, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { STATUS, TIMER_FOR_N_MINUTES } from "../constants/audio";
import { SCREEN_LG } from "../constants/general";
import { useCurrentDevice } from "./useCurrentDevice";

export const useRecordAudio = () => {
  const { currentWidth } = useCurrentDevice();
  const [currentRecordingStatus, setCurrentRecordingStatus] = useState<STATUS>();
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerDisplayTimeInterval = useRef<NodeJS.Timeout | null>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const stopRecordingButton = useRef<HTMLButtonElement | null>(null);
  const [hasMicAccess, setHasMicAccess] = useState(true);
  const [isScreenLarge, setIsScreenLarge] = useState(currentWidth >= SCREEN_LG);
  const {
    transcript,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const handleStartRecording = async (startRecording: () => void) => {
    if (!isMicrophoneAvailable) return;
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setHasMicAccess(false);
      return;
    }
    SpeechRecognition.startListening();
    startRecording();
    setCurrentRecordingStatus(STATUS.RECORDING);
  }

  const handlePauseRecording = (pauseRecording: () => void) => {
    pauseRecording();
    setCurrentRecordingStatus(STATUS.PAUSED);
  }

  const handleEndReording = (stopRecording: () => void, mediaBlobUrl: string | undefined) => {
    SpeechRecognition.stopListening();
    stopRecording();
    setCurrentRecordingStatus(STATUS.STOPPED);
    if (mediaBlobUrl) {
      handleSendRecording(mediaBlobUrl);
    }
  }

  const handleSendRecording = (recordingBlob: string) => {
    console.log(transcript, recordingBlob);
  }

  const handleResumeRecording = (resumeRecording: () => void) => {
    resumeRecording();
    setCurrentRecordingStatus(STATUS.RECORDING);
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

  useEffect(() => {
    setIsScreenLarge(currentWidth >= SCREEN_LG)
  }, [currentWidth])

  return {
    isScreenLarge,
    recordingProgress,
    elapsedSeconds,
    hasMicAccess,
    isMicrophoneAvailable,
    handleStartRecording,
    handleEndReording,
    handlePauseRecording,
    handleResumeRecording,
    stopRecordingButton,
  }
}