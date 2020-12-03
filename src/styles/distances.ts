const rawDistances = {
  xsmall: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  xxlarge: 40,
  xxxlarge: 48
};

const sizes = Object.keys(rawDistances) as [keyof typeof rawDistances];

type SizeStringType = { [T in keyof typeof rawDistances]: string };
const px = sizes.reduce<SizeStringType>(
  (pxDistances, size) => ({
    ...pxDistances,
    [size]: `${rawDistances[size]}px`
  }),
  {} as any
);

export default {
  ...rawDistances,
  px
};
