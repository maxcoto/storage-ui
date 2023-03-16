import axios from "axios";
import { constants } from "./constants";


export async function jsonLoad(network, target, infura) {
  const params = { ...constants.networks[network], target, infura };
  const response = await axios.get(constants.api, { params });
  return response.data;
}

