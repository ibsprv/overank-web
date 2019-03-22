import { MouseEvent } from 'react';
import { filter } from 'lodash';
import { AnyAction } from 'redux';
import { ISomething } from '../models';

export const filterSomething = (something: ISomething[], f: Partial<ISomething>): ISomething[] => {
    // tslint:disable-next-line:no-console
    console.log('do execute filterSomething', something, f, filter<ISomething>(something, f));
    return filter<ISomething>(something, f);
};
export const setFilter = (click: MouseEvent, f: Partial<ISomething>): AnyAction => ({
    type: '@@ProdConf/setFilter',
    click,
    f,
});
