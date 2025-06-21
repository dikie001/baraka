import { useRef } from "react";
import success from "/sounds/success.mp3";
import error from "/sounds/error.mp3";
import finish from "/sounds/finish.mp3";
import send from "/sounds/send.mp3";
import receive from "/sounds/receive.mp3";
import { useEffect } from "react";

const useFeedbackSound = () => {
  // Create Audio Instances Once
  const successRef = useRef(new Audio(success));
  const errorRef = useRef(new Audio(error));
  const finishRef = useRef(new Audio(finish));
  const sendRef = useRef(new Audio(send));
  const receiveRef = useRef(new Audio(receive));

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

  const playSend = () => {
    const audio = sendRef.current;
    audio.currentTime = 0;
    audio.volume = 1;
    audio.play().catch(console.warn);
  };

  const playReceive = () => {
    const audio = receiveRef.current;
    audio.currentTime = 0;
    audio.volume = 1;
    audio.play().catch(console.warn);
  };

  return { playSuccess, playError, playFinish, playSend, playReceive };
};

export default useFeedbackSound;
