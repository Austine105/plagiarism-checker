import { CheckerModel } from "./checker.model";
import { CHECKER_REPOSITORY } from "./constants";

export const CheckerProvider = [
  {
    provide: CHECKER_REPOSITORY,
    useValue: CheckerModel,
  },
];
