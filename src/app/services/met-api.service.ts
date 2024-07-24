import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

export interface PaintingDetails {
  objectID: number;
  title: string;
  artist: string;

}

@Injectable({
  providedIn: 'root',
})
export class MetApiService {
  private apiUrl = 'https://collectionapi.metmuseum.org/public/collection/v1';
  private commentsUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/pKSoTbGzFhj5RtoeFQif/comments';

  constructor(private http: HttpClient) {}

  searchPaintings(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?q=${query}&hasImages=true`);
  }

  getPaintingDetails(objectID: number): Observable<PaintingDetails> {
    return this.http.get<PaintingDetails>(`${this.apiUrl}/objects/${objectID}`);
  }
  
  getCommentsForPainting(objectID: number): Observable<any> {
    return this.http.get<any>(`${this.commentsUrl}?item_id=${objectID}`);
  }  
  
  addComment(objectID: number, comment: { username: string; comment: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { item_id: objectID, ...comment };
    return this.http.post<any>(this.commentsUrl, body, { headers }).pipe(
      catchError(error => {
        console.error('Error adding comment:', error);
        return of(null); // Return null in case of error
      })
    );
  }
  /*addCommentToPainting(objectID: number, comment: { user: string; text: string }): Observable<any> {
    return this.http.post<any>(`${this.commentsUrl}objects/${objectID}`, comment);
  }

  addComment(paintingId: number, comment: { username: string, comment: string }): Observable<any> {
    const url = `${this.commentsUrl}/comments`;
    const body = {
      item_id: paintingId,
      username: comment.username,
      comment: comment.comment
    };
    return this.http.post(url, body);
  }*/
  
}
