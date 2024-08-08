import { AbilityBuilder, AbilityClass, PureAbility } from '@casl/ability';

const ability: any = new PureAbility();

export default (action: string, subject: string): any => {
  // console.log('🚀 ~ action:', action, subject, ability.can(action, subject));
  return ability.can(action, subject);
};

type Actions = 'canAdd' | 'canView' | 'canUpdate' | 'canDelete';
type Subject = 'user' | 'role';
type AppAbilityType = PureAbility<[Actions, Subject]>;
const AppAbility = PureAbility as AbilityClass<AppAbilityType>;

export const defineRules = (permissions: any): any => {
  // console.log('🚀 ~ defineRules ~ permissions:', permissions);
  const { can, rules } = new AbilityBuilder<AppAbilityType>(AppAbility);
  permissions?.forEach((item: any) => {
    if (item.showOnMenu) {
      can('canAdd', item.name);
      can('canView', item.name);
      can('canUpdate', item.name);
      can('canDelete', item.name);
    } else {
      can('canView', item.name);
    }
  });

  const updatedRules = ability.update(rules);
  return updatedRules;
};

export const access = ability;
