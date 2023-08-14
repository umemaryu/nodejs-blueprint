import { validate } from "class-validator";

import { HTTP400Error } from "~/utils/errors";

export const validateDTO = async (object: object): Promise<void> =>
  validate(object).then((res) => {
    if (res.length > 0) {
      throw new HTTP400Error(
        res[0].constraints[Object.keys(res[0].constraints)[0]]
      );
    }
  });
