import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LikesService } from '../services/likes.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.page.html',
  styleUrls: ['./likes.page.scss'],
})
export class LikesPage implements OnInit {
  likedPaintings: any[] = [];

  constructor(private router: Router, private likesService: LikesService) {}

  ngOnInit() {
    this.likesService.likedPaintings$.subscribe(likedPaintings => {
      this.likedPaintings = likedPaintings;
    });
  }

  goToDetailsPage(id: number) {
    this.router.navigate([`/painting-details/${id}`]);
  }

  likePainting(painting: any) {
    this.likesService.likePainting(painting);
  }
}


  // Commenting out the code to load liked paintings from local storage
  //loadLikedPaintings() {
  //   const likedPaintings = localStorage.getItem('likedPaintings');
  //   if (likedPaintings) {
  //     this.likedPaintings = JSON.parse(likedPaintings);
  //   }
   //}

  // Commenting out the code to toggle like functionality
  // toggleLike(painting: any) {
  //   let likedPaintings = this.likedPaintings;
  //   const index = likedPaintings.findIndex((p: any) => p.objectID === painting.objectID);
  //   if (index === -1) {
  //     painting.isLiked = true;
  //     likedPaintings.push(painting);
  //   } else {
  //     painting.isLiked = !painting.isLiked;
  //     likedPaintings[index] = painting;
  //   }
  //   localStorage.setItem('likedPaintings', JSON.stringify(likedPaintings));
  // }

 // goToDetailsPage(id: number) {
   // this.router.navigate([`/painting-details/${id}`]);
  //}
