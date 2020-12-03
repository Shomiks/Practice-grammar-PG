import { useState } from "react";
import { firebase } from "lib/firebase";
import { navigateTo } from "lib/routing";
import { useSnackbar } from "Components/Shared/Snackbar/useSnackbar";

export const useLogin = () => {
  const { pushSnackbar } = useSnackbar();
  const [signInAnonymouslyLoading, setSignInAnonymouslyLoading] = useState();
  const [
    signInWithEmailAndPasswordLoading,
    setSignInWithEmailAndPasswordLoading
  ] = useState();

  const signInAnonymously = () => {
    setSignInAnonymouslyLoading(true);
    firebase
      .auth()
      .signInAnonymously()
      .catch(error => {
        const errorCode = error.code;
        if (errorCode === "auth/network-request-failed") {
          pushSnackbar(
            "Sorry, something went wrong there. Try again.",
            "error"
          );
        }
      })
      .finally(() => {
        localStorage.setItem("onceSignedInAnonymously", "true");
        setSignInAnonymouslyLoading(false);
      });
  };

  const signInWithEmailAndPassword = ({
    email,
    password
  }: {
    email: string;
    password: string;
  }) => {
    setSignInWithEmailAndPasswordLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigateTo("/questions"))
      .catch(error => {
        const errorCode = error.code;

        if (errorCode === "auth/network-request-failed")
          return pushSnackbar(
            "Sorry, something went wrong there. Try again.",
            "error"
          );
        if (errorCode === "auth/user-disabled")
          return pushSnackbar(
            "This email has been disabled.\n Please contacts us at office@practicegrammar.co.",
            "info"
          );
        if (errorCode === "auth/user-not-found")
          return pushSnackbar(
            "An account with this email doesn't exist.",
            "info"
          );
        if (errorCode === "auth/wrong-password")
          return pushSnackbar(
            "The entered password is not correct. Please try again.",
            "info"
          );
      })
      .finally(() => setSignInWithEmailAndPasswordLoading(false));
  };

  return {
    signInAnonymouslyLoading,
    signInWithEmailAndPasswordLoading,
    signInAnonymously,
    signInWithEmailAndPassword,
    isSignedInAnonymouslyOnce:
      JSON.parse(localStorage.getItem("onceSignedInAnonymously") || "false") ===
      true
  };
};
