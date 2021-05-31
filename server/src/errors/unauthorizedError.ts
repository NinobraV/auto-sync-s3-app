import { SystemMessage } from "@common/systemMessage";
import { HttpBaseError } from "./httpBaseError";

export class UnauthorizedError extends HttpBaseError {
  constructor(className: string, functionName: string, message: string = SystemMessage.UNAUTHORIZED_ERROR) {
    super(className, functionName, 401, "UnauthorizedError", message);
  }
}
