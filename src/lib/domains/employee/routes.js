import { signupEmployeeController } from "./controller.js";
export async function postSignupEmployee(body) {
  return signupEmployeeController(body);
}
