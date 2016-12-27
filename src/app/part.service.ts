import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Part } from './part';

@Injectable()
export class PartService {
    constructor(private http: Http) { }

    getParts(): Promise<Part[]> {
        return this.http.get('api/parts')
            .toPromise()
            .then(response => {
                var parts: Part[] = response.json() as Part[];
                return parts;
            })
            .then(parts => {
                return parts;
            })
            .catch(this.handleError);
    }

    createPart(part: Part): Promise<Part> {
        return this.http.post('api/parts', JSON.stringify(part))
        .toPromise()
        .then(response => {
            var part: Part = response.json() as Part;
            return part;
        })
        .catch(this.handleError);
    }

    getPart(id: string): Promise<Part> {
        return this.http.get('api/part/' + id)
        .toPromise()
        .then(response => {
            var part: Part = response.json() as Part;
            return part;
        })
        .catch(this.handleError);
    }

    // TODO: check response code?
    // TODO: Promise return value?
    deletePart(id: string): Promise<boolean> {
        return this.http.delete('api/part/' + id)
        .toPromise()
        .then(response => {
            return true;
        })
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
