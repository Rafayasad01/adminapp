function setThemeColor(theme: any) {
  // console.log('text is here', theme);
  const root = document.documentElement;
  root?.style.setProperty('--theme-primary', theme?.primary);
  root?.style.setProperty('--theme-secondary', theme?.secondary);
  root?.style.setProperty('--theme-secondary2', theme?.secondary2);
  root?.style.setProperty('--theme-foreground', theme?.foreground);
  root?.style.setProperty('--theme-faded', theme?.faded);
  root?.style.setProperty('--theme-background', theme?.background);
}

export default setThemeColor;
