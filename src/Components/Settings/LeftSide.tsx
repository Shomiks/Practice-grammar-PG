import React, { FC } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { useParams } from "react-router";
import { settingsPageOptions } from "./index";
import { navigateTo } from "lib/routing";
import styled from "styled-components";
import { colors } from "styles";

const StyledListItem = styled(ListItem)`
  &&:hover {
    background: ${colors.blumine100};
  }
  &&.Mui-selected {
    background: ${colors.blumine};
    color: ${colors.fullWhite};
  }
  &&.Mui-selected:hover {
    background: ${colors.blumine};
    color: ${colors.fullWhite};
  }
`;

export const LeftSide: FC = () => {
  const { settingsPageKey } = useParams();

  return (
    <List>
      {settingsPageOptions.map(option => (
        <StyledListItem
          button
          key={option.key}
          onClick={() => {
            navigateTo(`/settings/${option.key}`);
          }}
          divider
          selected={settingsPageKey === option.key}
          disableRipple
        >
          <ListItemText primary={option.name} />
        </StyledListItem>
      ))}
    </List>
  );
};
