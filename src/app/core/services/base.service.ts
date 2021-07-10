import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BaseService {
  private readonly BASE_URL = "https://conduit.productionready.io/api/";

  constructor(private http: HttpClient) {}

  get$<R>(url: string): Observable<R> {
    const _url = this.BASE_URL + url;
    return this.http.get<R>(_url);
  }

  post$(url: string, model) {
    const _url = this.BASE_URL + url;
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: "Token " + token,
    });
    return this.http.post(_url, model, { headers });
  }
}
