type StaticImageData = {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
};

declare module "*.avif" {
  const value: StaticImageData;
  export default value;
}
