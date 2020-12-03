import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";

import { RouteConfigItem } from "Components/Root";

const RenderRoutes: FC<RouteConfigItem[]> = config => (
  <Switch>
    {config.map(({ path, component }: RouteConfigItem) => (
      // @ts-ignore
      <Route key={path} path={path} component={component} />
    ))}
  </Switch>
);

export default RenderRoutes;
