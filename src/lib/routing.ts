import { history } from "lib/history";

const navigateTo = (pathname: string): void => history.push({ pathname });

export { navigateTo };
