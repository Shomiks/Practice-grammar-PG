import { Chip, withStyles } from "@material-ui/core";
import React, { FC } from "react";
import { colors, distances } from "styles";

const StyledChip = withStyles({
  root: {
    backgroundColor: colors.teal,
    borderRadius: distances.px.xsmall,
    height: distances.px.medium
  },
  label: {
    color: colors.fullWhite,
    fontSize: distances.px.small,
    padding: `0 ${distances.px.xsmall}`
  }
})(Chip);

export const ComingSoonChip: FC = () => <StyledChip label={"Coming soon"} />;
