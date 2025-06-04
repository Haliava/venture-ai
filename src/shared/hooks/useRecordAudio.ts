import { useState, useRef, useEffect, useCallback } from "react";
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
  const [recordingStatus, setRecordingStatus] = useState<STATUS>(STATUS.IDLE);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const stopRecordingButton = useRef<HTMLButtonElement | null>(null);
  const [hasMicAccess, setHasMicAccess] = useState(true);
  const [isScreenLarge, setIsScreenLarge] = useState(currentWidth >= SCREEN_LG);
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  const {
    resetTranscript,
    finalTranscript,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const { mutate: transcribe, isPending: isLoadingTranscription } = useMutation({
    mutationKey: ['transcribe'],
    mutationFn: (text: string) => transformTranscriptionToFormFields(text),
    onError: () => {
      setValues(defaultFormValues);
    },
    onSuccess: data => {
      setValues({ ...defaultFormValues, ...mapApiToFormFields(data.data) });
    },
  })

  const initMediaRecorder = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setMediaBlobUrl(audioUrl);
        audioChunksRef.current = [];
        
        stream.getTracks().forEach(track => track.stop());
      };
      
      return mediaRecorder;
    } catch (error) {
      console.error("MediaRecorder initialization failed:", error);
      setHasMicAccess(false);
      return null;
    }
  }, []);

  const handleStartRecording = useCallback(async () => {
    if (!isMicrophoneAvailable || !browserSupportsSpeechRecognition) return;
    
    try {
      const mediaRecorder = mediaRecorderRef.current || await initMediaRecorder();
      if (!mediaRecorder) return;
      
      resetTranscript();
      audioChunksRef.current = [];
      
      mediaRecorder.start();
      setRecordingStatus(STATUS.RECORDING);
      
      SpeechRecognition.startListening({
        continuous: true,
        language: 'ru-RU',
      });
    } catch (error) {
      console.error("Recording start failed:", error);
      setHasMicAccess(false);
    }
  }, [initMediaRecorder, isMicrophoneAvailable, browserSupportsSpeechRecognition, resetTranscript]);

  // Пауза записи
  const handlePauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && recordingStatus === STATUS.RECORDING) {
      mediaRecorderRef.current.pause();
      SpeechRecognition.stopListening();
      setRecordingStatus(STATUS.PAUSED);
    }
  }, [recordingStatus]);

  // Возобновление записи
  const handleResumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && recordingStatus === STATUS.PAUSED) {
      mediaRecorderRef.current.resume();
      SpeechRecognition.startListening({
        continuous: true,
        language: 'ru-RU',
      });
      setRecordingStatus(STATUS.RECORDING);
    }
  }, [recordingStatus]);

  // Окончание записи
  const handleEndRecording = useCallback(() => {
    if (mediaRecorderRef.current && recordingStatus !== STATUS.STOPPED) {
      mediaRecorderRef.current.stop();
      SpeechRecognition.stopListening();
      setRecordingStatus(STATUS.STOPPED);
    }
  }, [recordingStatus]);

  // Отправка записи на транскрибацию
  const handleSendRecording = useCallback(() => {
    if (finalTranscript) {
      console.log("Transcription text:", finalTranscript);
      transcribe(finalTranscript);
    } else {
      console.warn("No transcription available");
    }
  }, [finalTranscript, transcribe]);

  // Очистка URL медиа
  const clearMediaBlobUrl = useCallback(() => {
    if (mediaBlobUrl) {
      URL.revokeObjectURL(mediaBlobUrl);
      setMediaBlobUrl(null);
    }
  }, [mediaBlobUrl]);

  // Обработка прогресса записи
  useEffect(() => {
    let progressInterval: NodeJS.Timeout | null = null;
    let timeInterval: NodeJS.Timeout | null = null;

    if (recordingStatus === STATUS.RECORDING) {
      // Прогресс в процентах
      progressInterval = setInterval(() => {
        setRecordingProgress(prev => {
          const newProgress = prev + (100 / (TIMER_FOR_N_MINUTES * 60));
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 1000);

      // Отсчет времени
      timeInterval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (timeInterval) clearInterval(timeInterval);
    };
  }, [recordingStatus]);

  // Автоматическая остановка по времени
  useEffect(() => {
    if (elapsedSeconds >= TIMER_FOR_N_MINUTES * 60 && recordingStatus === STATUS.RECORDING) {
      handleEndRecording();
    }
  }, [elapsedSeconds, recordingStatus, handleEndRecording]);

  // Обработка окончания записи
  useEffect(() => {
    if (recordingStatus === STATUS.STOPPED) {
      // Задержка для завершения обработки аудио
      const processingTimer = setTimeout(() => {
        handleSendRecording();
        setRecordingProgress(0);
        setElapsedSeconds(0);
      }, 500);

      return () => clearTimeout(processingTimer);
    }
  }, [recordingStatus, handleSendRecording]);

  // Обновление размера экрана
  useEffect(() => {
    setIsScreenLarge(currentWidth >= SCREEN_LG);
  }, [currentWidth]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        if (mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
        }
      }
      clearMediaBlobUrl();
      SpeechRecognition.abortListening();
    };
  }, [clearMediaBlobUrl]);

  return {
    isScreenLarge,
    recordingProgress,
    elapsedSeconds,
    hasMicAccess,
    isMicrophoneAvailable,
    handleStartRecording,
    handleEndRecording,
    handlePauseRecording,
    handleResumeRecording,
    stopRecordingButton,
    isLoadingTranscription,
    recordingStatus,
    mediaBlobUrl,
    clearMediaBlobUrl,
  }
}