import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Game, SearchCriteria } from "./models";
import { firstValueFrom, Observable } from "rxjs";

@Injectable()
export class BGGService {
    // RestTemplate
    private http = inject(HttpClient)

    games: Game[] = []

    search(criteria: SearchCriteria): Promise<Game[]> {
        const params = new HttpParams()
                        .set('q', criteria.q.replace(' ', '+'))
                        .set('limit', criteria.count)

        return firstValueFrom(
            this.http.get<Game[]>('/api/search', { params }) // { params } shorthand for { params: params }
        )
        // "Tap" into result so svc can update games search
        .then(result => {
            this.games = result 
            return result
        })
    }

    searchAsObservable(criteria: SearchCriteria): Observable<Game[]> {
        const params = new HttpParams()
                        .set('q', criteria.q.replace(' ', '+'))
                        .set('limit', criteria.count)

        return this.http.get<Game[]>('/api/search', { params }) 
    }
}