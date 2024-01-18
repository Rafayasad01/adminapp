export function setThemeColor(tenantConfig: any) {
  const root = document.documentElement;
  root?.style.setProperty('--theme-bg-color', tenantConfig?.color1 ?? 'black');
  root?.style.setProperty('--theme-text-color', tenantConfig?.color2 ?? 'white');
}
