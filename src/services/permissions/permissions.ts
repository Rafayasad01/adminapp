import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability';
import { useState } from 'react';

const ability: any = new Ability();

export default (action: string, subject: string): any => {
	return ability.can(action, subject);
};

type actions = 'canAdd' | 'canView' | 'canUpdate' | 'canDelete';
type subject = 'user' | 'role';
type AppAbilityType = Ability<[actions, subject]>;
const AppAbility = Ability as AbilityClass<AppAbilityType>;

export const defineRules = (permissions: any): any => {
    console.log("PERMISSIONS",permissions);
    
	const { can, rules } = new AbilityBuilder<AppAbilityType>(AppAbility);
	permissions.forEach((item: any) => {
		item.showOnMenu && can('canAdd', item.name);
		item.showOnMenu && can('canView', item.name);
		item.showOnMenu && can('canUpdate', item.name);
		item.showOnMenu && can('canDelete', item.name);
	});
	// return rules
	ability.update(rules);
};

export const access = ability