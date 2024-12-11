import useAPI from "#services/useAPI";


export default function useGetRoutes(obj) {
  const cutObj = Object.assign({}, obj);
  delete cutObj["from_city_name"];
  delete cutObj["to_city_name"];

  let arr = [];
  let string = "";

  for (const [key, value] of Object.entries(cutObj)) {
    if (value) {
      const param = `${key}=${value}`;
      arr.push(param);
    }
  }

  if (arr.join("&").includes("from_city_id") && arr.join("&").includes("to_city_id")) {
    string = arr.join("&");
  }

  const {result, isLoading, error} = useAPI(`https://students.netoservices.ru/fe-diplom/routes?${string}`);

  return { result, isLoading, error };
}