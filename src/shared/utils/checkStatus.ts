export const checkStatus = (response: Response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(response.statusText);
};
