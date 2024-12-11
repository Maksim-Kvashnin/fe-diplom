/* eslint-disable react-hooks/rules-of-hooks */
import useAPI from "#services/useAPI";


export default function useGetSeats(obj, identity) {
  const cutObj = {
    id: identity === "departure" ? obj.departure_id : obj.arrival_id, 
    have_first_class: obj.have_first_class, 
    have_second_class: obj.have_second_class, 
    have_third_class: obj.have_third_class, 
    have_fourth_class: obj.have_fourth_class, 
    have_wifi: obj.have_wifi, 
  };

  let arr = [];
  let string = "";

  for (const [key, value] of Object.entries(cutObj)) {
    if (key !== "id" && value) {
      const param = `${key}=${value}`;
      arr.push(param);
    }
  }

  string = arr.join("&");

  const resultDeparture = identity === "departure" ? useAPI(`https://students.netoservices.ru/fe-diplom/routes/${cutObj.id}/seats?${string}`) : null;
  const resultArrival = identity === "arrival" ? useAPI(`https://students.netoservices.ru/fe-diplom/routes/${cutObj.id}/seats?${string}`) : null;

  return { resultDeparture, resultArrival };
}