import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BaseService {
  private readonly BASE_URL = "https://conduit.productionready.io/api/";

  constructor(private http: HttpClient) {}

  get$<R>(url: string): Observable<R> {
    const _url = this.BASE_URL + url
    return this.http.get<R>(_url);
  }
}
