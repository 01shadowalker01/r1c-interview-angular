import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BaseService {
  private readonly BASE_URL = environment.baseURL;

  constructor(private http: HttpClient) {}

  get$<R>(url: string): Observable<R> {
    const _url = this.BASE_URL + url;
    return this.http.get<R>(_url);
  }

  post$(url: string, model) {
    const _url = this.BASE_URL + url;
    const headers = this.getHeaders();
    return this.http.post(_url, model, { headers });
  }

  put$(url: string, model) {
    const _url = this.BASE_URL + url;
    const headers = this.getHeaders();
    return this.http.put(_url, model, { headers });
  }

  delete$(url: string) {
    const _url = this.BASE_URL + url;
    const headers = this.getHeaders();
    return this.http.delete(_url, { headers });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders({
      Authorization: "Token " + token,
    });
  }
}
