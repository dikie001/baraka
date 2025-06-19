import { useRef } from "react";
import success from "../assets/sounds/success.mp3";
import error from "../assets/sounds/error.mp3";
import finish from "../assets/sounds/finish.mp3";
import { useEffect } from "react";

const useFeedbackSound = () => {
  // Create Audio Instances Once
  const successRef = useRef(new Audio(success));
  const errorRef = useRef(new Audio(error));
  const finishRef = useRef(new Audio(finish));

  useEffect(() => {
    //   Force Preload
    successRef.current.preload = "auto";
    errorRef.current.preload = "auto";
    finishRef.current.preload = "auto";
// Touch the audio to warm it up!
    successRef.current.load();
    errorRef.current.load();
    finishRef.current.load();
  }, []);

  const playSuccess = () => {
    const audio = successRef.current;
    audio.currentTime = 0;
    audio.volume = 0.7;
    audio.play().catch(console.warn);
  };

  const playError = () => {
    const audio = errorRef.current;
    audio.currentTime = 0;
    audio.volume = 1;
    audio.play().catch(console.warn);
  };

  const playFinish = () => {
    const audio = finishRef.current;
    audio.currentTime = 0;
    audio.volume = 1;
    audio.play().catch(console.warn);
  };

  return { playSuccess, playError, playFinish };
};

export default useFeedbackSound;
