function setThemeColor(tenantConfig: any) {
  const root = document.documentElement;
  root?.style.setProperty(
    '--theme-primary',
    tenantConfig?.primary ?? '#1D1D1D'
  );
  root?.style.setProperty(
    '--theme-secondary',
    tenantConfig?.secondary ?? '#1A1A1A'
  );
  root?.style.setProperty(
    '--theme-secondary2',
    tenantConfig?.secondary2 ?? '#343434'
  );
  root?.style.setProperty(
    '--theme-foreground',
    tenantConfig?.foreground ?? '#FFF'
  );
  root?.style.setProperty('--theme-faded', tenantConfig?.faded ?? '#6A6A6A');
  root?.style.setProperty(
    '--theme-background',
    tenantConfig?.background ?? '#F0F0F0'
  );
}

export default setThemeColor;
