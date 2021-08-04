export const fileType = (url: string) => {
    const splited = url.split(".").pop();
    return splited;
};
