// @ts-ignore
import { coordinator } from '@uwdata/vgplot';

export function input(InputClass: any, options: any) {
    const input = new InputClass(options);
    coordinator().connect(input);
    return input;
}