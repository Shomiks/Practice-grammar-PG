import { useEffect, useState } from "react";
import { matchPath, useLocation, useParams } from "react-router-dom";
import _ from "lodash";

// This should be used for the Navigation component only
// The Navigation component is wrapper for all the <Route /> components which means it can't access its params with the useParams() function
// that is why projectId is taken from the pathname in this case
// For all the other cases please use - const { projectId } = useParams();
export const useLevelId = () => {
  const [levelId, setLevelId] = useState();
  const { pathname } = useLocation();
  const { projectId: RouteContextProjectId } = useParams();

  if (RouteContextProjectId)
    throw new Error(
      "This component is being misused please read the comments inside this file."
    );

  const match = matchPath<{ projectId: string }>(pathname, {
    path: "/levels/:levelId"
  });

  const newLevelId = _.get(match, "params.levelId", null);

  useEffect(() => {
    setLevelId(newLevelId);
  }, [newLevelId]);

  // This looks a bit odd but the reason why it is like this is when you are in
  // a project you have a projectId but if you click the back button in a
  // browser which navigates you back to the /projects page,
  // the new state ofo the useProjectId is not immediately falsy which causes UI
  // to render when it is not supposed to.
  return { levelId: newLevelId ? levelId : null };
};
