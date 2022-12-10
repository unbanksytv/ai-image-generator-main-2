import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IImage, IPromptDetails } from 'src/app/modals/image';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  private readonly BASEURL = `${environment.BASE_URL}/openai`

  constructor(
    private http: HttpClient,
  ) { }

  generateImage(promptDeails: IPromptDetails): Observable<HttpResponse<IImage>> {
    const headers = new HttpHeaders({ 'Content-type': 'application/json' })

    return this.http.post<IImage>(`${this.BASEURL}/image`, promptDeails, {
      headers: headers, observe: "response"
    })
  }
}