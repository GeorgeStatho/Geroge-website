export function scaleSqrt(value: number, minValue: number, maxValue: number, minSize: number, maxSize: number) {
  if (maxValue <= minValue) return minSize;
  const normalized = (Math.sqrt(value) - Math.sqrt(minValue)) / (Math.sqrt(maxValue) - Math.sqrt(minValue));
  return minSize + normalized * (maxSize - minSize);
}

export function scaleLog(value: number, minValue: number, maxValue: number, minSize: number, maxSize: number) {
  if (maxValue <= minValue) return minSize;
  const normalized = (Math.log(value + 1) - Math.log(minValue + 1)) / (Math.log(maxValue + 1) - Math.log(minValue + 1));
  return minSize + normalized * (maxSize - minSize);
}