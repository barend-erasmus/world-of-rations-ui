import { DefaultUrlSerializer, UrlTree } from '@angular/router';

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
    public parse(url: string): UrlTree {
        const hasQueryParameters = url.split('?').length === 2;

        if (hasQueryParameters) {
            return super.parse(url.split('?')[0].toLowerCase() + '?' + url.split('?')[1]);
        }
        return super.parse(url.toLowerCase());
    }
}
