import { AbilityBuilder, AbilityClass, PureAbility } from '@casl/ability';

const ability: any = new PureAbility();

export default (action: string, subject: string): any => {
  return ability.can(action, subject);
};

type Actions = 'canAdd' | 'canView' | 'canUpdate' | 'canDelete';
type Subject = 'user' | 'role';
type AppAbilityType = PureAbility<[Actions, Subject]>;
const AppAbility = PureAbility as AbilityClass<AppAbilityType>;

export const defineRules = (permissions: any): any => {
  const { can, rules } = new AbilityBuilder<AppAbilityType>(AppAbility);
  permissions?.forEach((item: any) => {
    item.showOnMenu && can('canAdd', item.name);
    item.showOnMenu && can('canView', item.name);
    item.showOnMenu && can('canUpdate', item.name);
    item.showOnMenu && can('canDelete', item.name);
  });
  const updatedRules = ability.update(rules);
  return updatedRules;
};

export const access = ability;
