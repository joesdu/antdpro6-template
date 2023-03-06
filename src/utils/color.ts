/**
 * 解析rgb格式
 * @param value 颜色十六进制RGB色值
 * @retern [R, G, B]色值数字表示数组
 */
const fAnalysisRGB = (value: string): number[] => {
  const temp = value.toLowerCase().substring(1, value.length);
  const colors = new Array<number>();
  colors.push(parseInt(temp.substring(0, 2), 16));
  colors.push(parseInt(temp.substring(2, 4), 16));
  colors.push(parseInt(temp.substring(4, 6), 16));
  return colors;
};
/**
 * 加0补位
 * @param v value,需要补位的字符串
 * @return 返回补位后的字符串
 */
const fAddZero = (v: string): string => {
  const newv = `00${v}`;
  return newv.substring(newv.length - 2, newv.length);
};
/**
 * rgb转hex
 * @param r Red 数值
 * @param g Green 数值
 * @param b Blue 数值
 * @return Hex色值表示
 */
const fColorToHex = (r: number, g: number, b: number): string => `#${fAddZero(r.toString(16))}${fAddZero(g.toString(16))}${fAddZero(b.toString(16))}`;
/**
 * 颜色渐变
 * @param startColor 起始色值
 * @param endColor 结束色值
 * @param num 渐变阶数
 * @return 返回每个阶段的主要色值
 */
const fColorGradualChange = (startColor: string, endColor: string, num: number): string[] => {
  const rgb = /^rgb|RGB\((([0-9]|[1-9]\d|1\d\d|2([0-4]\d|5[0-5])),){2}([0-9]|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\)$/; //rgb
  const hex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i; //16进制
  //颜色预处理
  let startRGB: string[] = [];
  let endRGB: string[] = [];
  if (hex.test(startColor)) {
    startRGB = fAnalysisRGB(startColor).map(c => c.toString());
  } else if (rgb.test(startColor)) {
    startRGB = startColor.substring(3, 15).split(',');
  }
  if (hex.test(endColor)) {
    endRGB = fAnalysisRGB(endColor).map(c => c.toString());
  } else if (rgb.test(startColor)) {
    endRGB = endColor.substring(3, 15).split(',');
  }
  const startR: number = parseInt(startRGB[0]);
  const startG: number = parseInt(startRGB[1]);
  const startB: number = parseInt(startRGB[2]);
  const endR = parseInt(endRGB[0]);
  const endG = parseInt(endRGB[1]);
  const endB = parseInt(endRGB[2]);
  const sR = (endR - startR) / num;
  const sG = (endG - startG) / num;
  const sB = (endB - startB) / num;
  const colors: string[] = [];
  for (let i = 0; i < num; i++) {
    colors.push(fColorToHex(sR * i + startR, sG * i + startG, sB * i + startB));
  }
  return colors;
};

/**
 * 获取色值
 * @param value
 * @returns
 */
export const getColor = (value: number): string | undefined => {
  const step = 10;
  // 按位非两次即可取到除法的商
  const colorZone = ~~(value / step);
  const index = value % step;
  let s: string[] = [];
  console.log(colorZone);
  switch (colorZone) {
    case 0:
      s = fColorGradualChange('#FF0000', '#FF9A00', step);
      return s[index];
    case 1:
      s = fColorGradualChange('#FF9A00', '#CCFF00', step);
      return s[index];
    case 2:
      s = fColorGradualChange('#CCFF00', '#33FF00', step);
      return s[index];
    case 3:
      s = fColorGradualChange('#33FF00', '#00FF67', step);
      return s[index];
    case 4:
      s = fColorGradualChange('#00FF67', '#00FFFF', step);
      return s[index];
    case 5:
      s = fColorGradualChange('#00FFFF', '#0066FF', step);
      return s[index];
    case 6:
      s = fColorGradualChange('#0066FF', '#3300FF', step);
      return s[index];
    case 7:
      s = fColorGradualChange('#3300FF', '#CC00FF', step);
      return s[index];
    case 8:
      s = fColorGradualChange('#CC00FF', '#FF0099', step);
      return s[index];
    case 9:
      s = fColorGradualChange('#FF0099', '#FF0000', step);
      return s[index];
    case 10:
      return '#FF0000';
  }
};
/**
 * 滑块的背景样式:
background-image: linear-gradient(
  90deg,
  #ff0000 0%,
  #ff9a00 10%,
  #ccff00 20%,
  #33ff00 30%,
  #00ff67 40%,
  #00ffff 50%,
  #0066ff 60%,
  #3300ff 70%,
  #cc00ff 80%,
  #ff0099 90%,
  #ff0000 100%
);
 */
