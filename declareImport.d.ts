declare module "*.png" {
  const value: any;
  export default value;
}
declare module "*.jpg";
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
