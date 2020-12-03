import { firebase } from "lib/firebase";
import { User } from "firebase";
import { useCurrentUser } from "lib/useCurrentUser";
import { navigateTo } from "lib/routing";
import { useState } from "react";
import { useSnackbar } from "Components/Shared/Snackbar/useSnackbar";

interface SignupWithEmailAndPasswordProps extends SignupProps {
  pushSnackbar(message: string, variant: string): void;
  setIsLoading(arg: boolean): void;
}

const signupWithEmailAndPassword = ({
  email,
  password,
  name,
  pushSnackbar,
  setIsLoading
}: SignupWithEmailAndPasswordProps) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      if (user) {
        user.updateProfile({
          displayName: name
        });
        navigateTo("/levels");
      }
    })
    .catch(error => {
      setIsLoading(false);

      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === "auth/email-already-in-use")
        return pushSnackbar(errorMessage, "info");
      if (errorCode === "auth/invalid-email")
        return pushSnackbar("Please enter a valid email.", "info");
      if (errorCode === "auth/weak-password")
        return pushSnackbar(errorMessage, "info");
      if (errorCode === "auth/network-request-failed")
        return pushSnackbar(
          "Sorry, something went wrong there. Try again.",
          "error"
        );
    });
};

interface SignupAnonymouslyProps extends SignupProps {
  currentUser: User;
  pushSnackbar(message: string, variant: string): void;
  setIsLoading(arg: boolean): void;
}

const signupAnonymously = ({
  email,
  password,
  name,
  currentUser,
  pushSnackbar,
  setIsLoading
}: SignupAnonymouslyProps) => {
  const credential = firebase.auth.EmailAuthProvider.credential(
    email,
    password
  );

  currentUser
    .linkWithCredential(credential)
    .then(async userCredential => {
      const user = userCredential.user;
      if (user) {
        await user.sendEmailVerification();
        user
          .updateProfile({
            displayName: name
          })
          .then(() => navigateTo("/levels"))
          .catch(() => setIsLoading(false));
      }
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === "auth/network-request-failed")
        return pushSnackbar(
          "Sorry, something went wrong there. Try again.",
          "error"
        );
      setIsLoading(false);
      return pushSnackbar(errorMessage, "info");
    });
};

interface SignupProps {
  email: string;
  password: string;
  name: string;
}

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { currentUser } = useCurrentUser();
  const { pushSnackbar } = useSnackbar();

  const signup = ({ email, password, name }: SignupProps) => {
    setIsLoading(true);
    currentUser && currentUser.isAnonymous
      ? signupAnonymously({
          email,
          password,
          name,
          currentUser,
          pushSnackbar,
          setIsLoading
        })
      : signupWithEmailAndPassword({
          email,
          password,
          name,
          pushSnackbar,
          setIsLoading
        });
  };

  return {
    signup,
    isLoading,
    currentUser
  };
};
