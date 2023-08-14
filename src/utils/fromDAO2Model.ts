import { ClassConstructor, plainToClass } from "class-transformer";

export const fromDAO2Model = <T>(cls: ClassConstructor<T>, plain: object): T =>
  plainToClass(cls, plain);

export const fromDAO2ModelList = <T>(
  cls: ClassConstructor<T>,
  dao: object[]
): T[] => dao.map((ele) => fromDAO2Model(cls, ele));
