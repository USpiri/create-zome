interface PackageManagerInfo {
  name: string;
  version: string;
}

export const getPackageManager = (
  userAgent: string | undefined,
): PackageManagerInfo | undefined => {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(" ")[0];
  const pkgSpecArr = pkgSpec.split("/");
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
};
