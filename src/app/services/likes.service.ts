import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private likedPaintingsSubject = new BehaviorSubject<any[]>([]);
  likedPaintings$ = this.likedPaintingsSubject.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const likedPaintings = await this.storage.get('likedPaintings') || [];
    this.likedPaintingsSubject.next(likedPaintings);
  }

  async likePainting(painting: any) {
    const currentLikedPaintings = this.likedPaintingsSubject.value;
    const index = currentLikedPaintings.findIndex(p => p.objectID === painting.objectID);
    if (index === -1) {
      painting.liked = true;
      currentLikedPaintings.push(painting);
    } else {
      painting.liked = false;
      currentLikedPaintings.splice(index, 1);
    }
    await this.storage.set('likedPaintings', currentLikedPaintings);
    this.likedPaintingsSubject.next(currentLikedPaintings);
  }
}
