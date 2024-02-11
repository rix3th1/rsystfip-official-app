import axios from "axios";

export const getPngbase64 = async () => {
  const { data } = await axios(
    "https://upload.wikimedia.org/wikipedia/commons/c/c7/Logo_itfip.png",
    { responseType: "blob" }
  );
  return data;
};
