/**
 * 判断一个对象是否为 null或者undefined或者为空对象
 * @param obj: 任意JavaScript对象
 * @returns boolean 为空则为 true 否则为 false
 */
Object.isNullOrEmpty = function isNullOrEmpty(obj: any) {
  return obj === null || obj === undefined || Object.keys(obj).length === 0;
};
