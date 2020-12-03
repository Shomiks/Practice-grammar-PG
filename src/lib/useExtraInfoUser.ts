import { useQuery } from "@apollo/react-hooks";
import _ from "lodash";
// @ts-ignore
import meQuery from "./Me.graphql";

const useExtraInfoUser = () => {
  const { data } = useQuery(meQuery);

  const { examplesToday, dailyExampleLimit } = _.get(data, ["me"], {});

  return { examplesToday, dailyExampleLimit };
};

export { meQuery, useExtraInfoUser };
