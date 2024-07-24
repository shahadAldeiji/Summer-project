import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MetApiService, PaintingDetails } from '../services/met-api.service';

@Component({
  selector: 'app-painting-details',
  templateUrl: './painting-details.page.html',
  styleUrls: ['./painting-details.page.scss'],
})
export class PaintingDetailsPage implements OnInit {
  painting: any;
  isLiked: boolean = false;
  likeCount: number = 0;
  comments: any[] = [];
  commentCount: number = 0;
  newComment = { username: '', comment: '' };
  showCommentForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private metApiService: MetApiService
  ) {}

  ngOnInit() {
    this.likeCount = 0;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchPaintingDetails(Number(id));
      this.fetchComments(Number(id));
    } else {
      console.error("No ID found in route parameters");
    }
  }

  fetchPaintingDetails(id: number) {
    this.metApiService.getPaintingDetails(id).subscribe(
      (data: any) => {
        this.painting = data;
      },
      (error) => {
        console.error("Error fetching painting details", error);
      }
    );
  }
  
  fetchComments(id: number) {
    this.metApiService.getCommentsForPainting(id).subscribe(
      (data: any) => {
        console.log("Comments fetched", data);
        this.comments = data;
        this.commentCount = this.comments.length;
      },
      (error) => {
        console.error("Error fetching comments:", error);
      }
    );
  }

  addComment(form: NgForm) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.metApiService.addComment(id, this.newComment).subscribe(() => {
      this.fetchComments(id);
      this.newComment = { username: '', comment: '' };
      form.resetForm();
      this.showCommentForm = false; // Hide form after submission
    }, (error) => {
      console.error('Error adding comment:', error);
    });
  }

  cancelComment() {
    this.newComment = { username: '', comment: '' };
    this.showCommentForm = false; // Hide form on cancel
    console.log('Comment canceled');
  }

  toggleCommentForm() {
    this.showCommentForm = !this.showCommentForm;
  }
}




/*import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetApiService, PaintingDetails } from '../services/met-api.service';

@Component({
  selector: 'app-painting-details',
  templateUrl: './painting-details.page.html',
  styleUrls: ['./painting-details.page.scss'],
})
export class PaintingDetailsPage implements OnInit {
  painting: any;
  isLiked: boolean = false;
  likeCount: number = 0;
  comments: any[] = [];
  commentCount: number = 0;
  newComment = { username: '', comment: '' };

  constructor(
    private route: ActivatedRoute,
    private metApiService: MetApiService
  ) {}

  ngOnInit() {
    this.likeCount = 0;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchPaintingDetails(Number(id));
      this.fetchComments(Number(id));
    } else {
      console.error("No ID found in route parameters");
    }
  }

  fetchPaintingDetails(id: number) {
    this.metApiService.getPaintingDetails(id).subscribe(
      (data: any) => {
        this.painting = data;
      },
      (error) => {
        console.error("Error fetching painting details", error);
      }
    );
  }
  
  fetchComments(id: number) {
    this.metApiService.getCommentsForPainting(id).subscribe(
      (data: any) => {
        console.log("Comments fetched", data);
        this.comments = data;
        this.commentCount = this.comments.length;
      },
      (error) => {
        console.error("Error fetching comments:", error);
      }
    );
  }

  addComment() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.metApiService.addComment(id, this.newComment).subscribe(() => {
      this.fetchComments(id);
      this.newComment = { username: '', comment: '' };
    }, (error) => {
      console.error('Error adding comment:', error);
    });
  }

  cancelComment() {
    this.newComment = { username: '', comment: '' };
    console.log('Comment canceled');
  }
}
*/


  /*addComment(user: string, text: string) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.metApiService.addCommentToPainting(Number(id), { user, text }).subscribe(
        (data: any) => {
          console.log("Comment added", data);
          this.fetchComments(Number(id)); // Refresh comments after adding
        },
        (error) => {
          console.error("Error adding comment:", error);
        }
      );
    } else {
      console.error("No ID found in route parameters");
    }
  }
 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetApiService, PaintingDetails } from '../services/met-api.service';

@Component({
  selector: 'app-painting-details',
  templateUrl: './painting-details.page.html',
  styleUrls: ['./painting-details.page.scss'],
})
export class PaintingDetailsPage implements OnInit {
  painting: any;
  isLiked: boolean = false;
  likeCount: number = 0;
  comments: any[] = [];
  commentCount: number = 0;
  commentForm: FormGroup;  // Define FormGroup for validation

  constructor(
    private route: ActivatedRoute,
    private metApiService: MetApiService,
    private fb: FormBuilder
  ) {
    // Initialize form group with validation
    this.commentForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      comment: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit() {
    this.likeCount = 0;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchPaintingDetails(Number(id));
      this.fetchComments(Number(id)); // Fetch comments when painting details are fetched
    } else {
      console.error("No ID found in route parameters");
    }
  }

  fetchPaintingDetails(id: number) {
    this.metApiService.getPaintingDetails(id).subscribe(
      (data: any) => {
        this.painting = data;
      },
      (error) => {
        console.error("Error fetching painting details", error);
      }
    );
  }
  
  fetchComments(id: number) {
    this.metApiService.getCommentsForPainting(id).subscribe(
      (data: any) => {
        console.log("Comments fetched", data);
        this.comments = data;
        this.commentCount = this.comments.length;
      },
      (error) => {
        console.error("Error fetching comments:", error);
      }
    );
  }

  addComment() {
    if (this.commentForm.valid) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.metApiService.addComment(id, this.commentForm.value).subscribe(() => {
        this.fetchComments(id); // Refresh comments after adding a new one
        this.commentForm.reset(); // Reset the form
      }, (error) => {
        console.error('Error adding comment:', error);
      });
    } else {
      console.log('Form is not valid');
    }
  }
}*/

