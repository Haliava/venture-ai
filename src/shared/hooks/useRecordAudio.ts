import { useState, useRef, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { STATUS, TIMER_FOR_N_MINUTES } from "../constants/audio";
import { SCREEN_LG } from "../constants/general";
import { useCurrentDevice } from "./useCurrentDevice";
import { useMutation } from "@tanstack/react-query";
import { transformTranscriptionToFormFields } from "@/entities/analyst/api";
import { useFormikContext } from "formik";
import { StartupForm } from "../types/form";
import { defaultFormValues } from "../constants/form";
import { mapApiToFormFields } from "@/entities/analyst/mappers";

export const useRecordAudio = () => {
  const { setValues } = useFormikContext<StartupForm>();
  const { currentWidth } = useCurrentDevice();
  const [currentRecordingStatus, setCurrentRecordingStatus] = useState<STATUS>();
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const stopRecordingButton = useRef<HTMLButtonElement | null>(null);
  const [hasMicAccess, setHasMicAccess] = useState(true);
  const [isScreenLarge, setIsScreenLarge] = useState(currentWidth >= SCREEN_LG);
  
  const {
    transcript,
    resetTranscript,
    finalTranscript,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const { mutate: transcribe, isPending: isLoadingTransription } = useMutation({
    mutationKey: ['transcribe'],
    mutationFn: (text: string) => transformTranscriptionToFormFields(text),
    onError: () => {
      setValues(defaultFormValues);
    },
    onSuccess: data => {
      setValues({ ...defaultFormValues, ...mapApiToFormFields(data.data) });
    }
  })

  const handleStartRecording = async (startRecording: () => void) => {
    if (!isMicrophoneAvailable || !browserSupportsSpeechRecognition) return;
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setHasMicAccess(false);
      return;
    }
    
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: true,
      language: 'ru-RU',
      interimResults: true
    });
    
    startRecording();
    setCurrentRecordingStatus(STATUS.RECORDING);
  }

  const handlePauseRecording = (pauseRecording: () => void) => {
    pauseRecording();
    setCurrentRecordingStatus(STATUS.PAUSED);
  }

  const handleEndReording = (stopRecording: () => void) => {
    SpeechRecognition.stopListening();
    stopRecording();
    setElapsedSeconds(0);
    setRecordingProgress(0);
    setCurrentRecordingStatus(STATUS.STOPPED);
    handleSendRecording();
  }

  const handleSendRecording = () => {
    const textToSend = finalTranscript || transcript;
    if (textToSend) {
      transcribe(textToSend);
      console.log(textToSend)
    }
  }

  const handleResumeRecording = (resumeRecording: () => void) => {
    resumeRecording();
    setCurrentRecordingStatus(STATUS.RECORDING);
  }

  useEffect(() => {
    let progressInterval: NodeJS.Timeout | null = null;
    let timeInterval: NodeJS.Timeout | null = null;

    if (currentRecordingStatus === STATUS.RECORDING) {
      progressInterval = setInterval(() => {
        setRecordingProgress(prev => {
          const newProgress = prev + (100 / (TIMER_FOR_N_MINUTES * 60));
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 1000);

      timeInterval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (timeInterval) clearInterval(timeInterval);
    };
  }, [currentRecordingStatus]);

  useEffect(() => {
    if (elapsedSeconds >= TIMER_FOR_N_MINUTES * 60) {
      stopRecordingButton.current?.click();
    }
  }, [elapsedSeconds])

  useEffect(() => {
    setIsScreenLarge(currentWidth >= SCREEN_LG);
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
    isLoadingTransription,
  }
}