import axios from "axios";
import { constants } from "./constants";


export async function jsonLoad(_network, target) {
  const { network } = constants.networks[_network];
  const params = { network, target };
  const response = await axios.get(constants.api, { params });
  return response.data;
}

