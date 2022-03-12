export const fileType = (url: string) => {
  if (url.search("blob") > -1) {
    return "pdf";
  }
  const splited = url.split(".").pop();
  return splited;
};
