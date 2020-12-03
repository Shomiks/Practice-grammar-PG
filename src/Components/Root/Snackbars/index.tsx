import React, { FC } from "react";
import { useCurrentUser } from "lib/useCurrentUser";
import { VerifyEmail } from "./VerifyEmail";
import { AnonymousSignUp } from "./AnonymousSignUp";
import { Offline as OfflineSnackbar } from "./Offline";
// @ts-ignore
import { Offline, Online } from "react-detect-offline";

export const Snackbars: FC = () => {
  const { currentUser } = useCurrentUser();

  const renderOnline = () => {
    if (!currentUser) return null;

    if (currentUser.isAnonymous) return <AnonymousSignUp />;
    if (!currentUser.emailVerified) return <VerifyEmail />;

    return null;
  };

  return (
    <>
      <Offline>
        <OfflineSnackbar />
      </Offline>
      <Online>{renderOnline()}</Online>
    </>
  );
};
