/*import { Component, OnInit } from '@angular/core';
import { MetApiService } from '../services/met-api.service';
import { Router } from '@angular/router';
import { LikesService } from '../services/likes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  paintings: any[] = [];
  likedPaintings: any[] = [];

  constructor(
    private metApiService: MetApiService,
    private router: Router,
    private likesService: LikesService
  ) {}

  ngOnInit() {
    this.likesService.likedPaintings$.subscribe(likedPaintings => {
      this.likedPaintings = likedPaintings;
      this.updateLikedStatus();
    });

    this.metApiService.searchPaintings('painting').subscribe((response: any) => {
      if (response.objectIDs) {
        response.objectIDs.slice(100, 110).forEach((objectID: number) => {
          this.metApiService.getPaintingDetails(objectID).subscribe((details: any) => {
            this.paintings.push(details);
            this.updateLikedStatus();
          });
        });
      }
    });
  }
    

  updateLikedStatus() {
    this.paintings.forEach(painting => {
      painting.liked = !!this.likedPaintings.find(p => p.objectID === painting.objectID);
    });
  }

  goToDetailsPage(id: number) {
    this.router.navigate([`/painting-details/${id}`]);  
  }

  likePainting(painting: any) {
    this.likesService.likePainting(painting);
  }
}*/


/*
  async likePainting(painting: any) {
    let likedPaintings = await this.storage.get('likedPaintings') || [];
    const index = likedPaintings.findIndex((p: any) => p.objectID === painting.objectID);
    if (index === -1) {
      painting.liked = true;
      likedPaintings.push(painting);
    } else {
      painting.liked = false;
      likedPaintings.splice(index, 1);
    }
    await this.storage.set('likedPaintings', likedPaintings);
  }

  goToLikesPage() {
    this.navCtrl.navigateForward('/likes');
  }
    */

  import { Component, OnInit } from '@angular/core';
  import { MetApiService } from '../services/met-api.service';
  import { Router } from '@angular/router';
  import { LikesService } from '../services/likes.service';
  
  @Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
  })
  export class HomePage implements OnInit {
    paintings: any[] = [];
    likedPaintings: any[] = [];
    unknownArtist: string = 'Unknown'; 
  
    constructor(
      private metApiService: MetApiService,
      private router: Router,
      private likesService: LikesService
    ) {}
  
    ngOnInit() {
      console.log('HomePage ngOnInit');
      
      this.likesService.likedPaintings$.subscribe(likedPaintings => {
        console.log('Liked paintings:', likedPaintings);
        this.likedPaintings = likedPaintings;
        this.updateLikedStatus();
      });
  
      this.metApiService.searchPaintings('painting').subscribe((response: any) => {
        console.log('Search paintings response:', response);
        if (response.objectIDs) {
          response.objectIDs.slice(11, 22).forEach((objectID: number) => {
            this.metApiService.getPaintingDetails(objectID).subscribe((details: any) => {
              console.log('Painting details:', details);
              this.paintings.push(details);
              console.log('Current paintings array:', this.paintings);
              this.updateLikedStatus();
            });
          });
        }
      });
    }
  
    updateLikedStatus() {
      this.paintings.forEach(painting => {
        painting.liked = !!this.likedPaintings.find(p => p.objectID === painting.objectID);
      });
    }
  
    goToDetailsPage(id: number) {
      this.router.navigate([`/painting-details/${id}`]);  
    }
  
    likePainting(painting: any) {
      this.likesService.likePainting(painting); // Correct method name
    }
  }
  