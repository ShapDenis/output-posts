export interface IRoute {
  path: string;
}

export enum RouteNames {
  LOGIN = "/login",
  POSTS = "/",
}

export const publicRoutes: IRoute[] = [{ path: RouteNames.LOGIN }];
export const privateRoutes: IRoute[] = [{ path: RouteNames.POSTS }];
