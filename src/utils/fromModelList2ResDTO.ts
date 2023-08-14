import { ClassConstructor } from "class-transformer";

export const fromModelList2ResDTO = <T>(
  cls: ClassConstructor<T>,
  modelList: object[]
): T[] => modelList.map((model) => new cls({ ...model }));
