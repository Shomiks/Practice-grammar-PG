import { Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import BugReportIcon from "@material-ui/icons/BugReport";
import React, { FC } from "react";
import { useSnackbar } from "Components/Shared/Snackbar/useSnackbar";
import { useMutation } from "react-apollo";
import { useLocation } from "react-router-dom";
import { ExerciseExample } from "./useManageExamples";
import styled from "styled-components";
import distances from "styles/distances";

// @ts-ignore
import reportQuestionMutation from "./ReportQuestionMutation.graphql";

interface ReportExampleButtonProps {
  currentExample: ExerciseExample;
}

const ReportQuestionButton = styled.div`
  position: absolute;
  bottom: ${distances.px.small};
  right: ${distances.px.small};
  opacity: 0.3;
  z-index: 100;
  &:hover {
    opacity: 1;
  }
`;

export const ReportExampleButton: FC<ReportExampleButtonProps> = ({
  currentExample
}) => {
  const { pushSnackbar } = useSnackbar();
  const [reportQuestion] = useMutation(reportQuestionMutation);
  const { pathname } = useLocation();

  return (
    <Tooltip
      title={`If you think this example might be wrong, please report it here.`}
      placement="left"
    >
      <ReportQuestionButton>
        <IconButton
          size={"small"}
          onClick={async () => {
            try {
              const { data } = await reportQuestion({
                variables: {
                  input: {
                    exerciseId: currentExample.example.id,
                    exerciseType: pathname.split("/")[3]
                  }
                }
              });
              data.reportQuestion.status == 200
                ? pushSnackbar("Thank you for the feedback!", "success")
                : pushSnackbar(
                    "Oops something went wrong. Please try again.",
                    "error"
                  );
            } catch (e) {
              pushSnackbar(
                "Oops something went wrong. Please try again.",
                "error"
              );
            }
          }}
        >
          <BugReportIcon />
        </IconButton>
      </ReportQuestionButton>
    </Tooltip>
  );
};
