export function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const exponent = Math.floor(Math.log(bytes) / Math.log(1024));
    const value = (bytes / Math.pow(1024, exponent)).toFixed(2);
    
    return `${value} ${units[exponent]}`;
  }
  
  export function formatNumber(num: number): string {
    if (num < 1000) return num.toString();
    
    const units = ['K', 'M', 'B', 'T'];
    const exponent = Math.floor(Math.log(num) / Math.log(1000));
    const value = (num / Math.pow(1000, exponent)).toFixed(1);
    
    return `${value}${units[exponent - 1]}`;
  }
