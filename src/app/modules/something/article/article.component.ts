import {Component, OnInit, HostBinding, ViewEncapsulation, OnDestroy} from '@angular/core';

import {ActivatedRoute, ParamMap} from '@angular/router';
import {slideInDownAnimation} from '../../../shared/animations';
import {SomethingService} from '../something.service';
import {ArticleModel, ResModel, CommentModel} from '../../../shared/models';
import {switchMap} from 'rxjs/operators';
import {JsonHelper} from '../../../shared/tools';
import {AppConst} from "../../../shared/app-const";

// declare var require: any;
// const Quill = require('quill');

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  animations: slideInDownAnimation,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleComponent implements OnInit, OnDestroy {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'flex';
  @HostBinding('style.flex-direction') direction = 'column';
  @HostBinding('style.width') width = '100%';
  // @HostBinding('style.position')  position = 'absolute';
  quill: any;
  article = new ArticleModel();
  comments: CommentModel[];
  newComment = new CommentModel();

  constructor(
    private somethingService: SomethingService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.newComment.author = '';
  }
  onQuillInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.somethingService.getArticle(+params.get('id')))
    ).subscribe((article: ArticleModel) => {
      JsonHelper.toAny(article, JsonHelper.articleMember);
      this.article = article;
      // Set page tile
      document.title = this.article.title;
      this.quill.setContents(article.content);
      this.somethingService.getComments(this.article.id).subscribe((res: CommentModel[]) => {
        this.comments = res;
      })
    });
    // let id = this.route.snapshot.paramMap.get('id');
    // this.hero$ = this.services.getHero(id);
  }
  onSubmit() {
    this.newComment.id_article = this.article.id;
    this.somethingService.putComment(this.newComment).subscribe((res: ResModel) => {
      if (res.errcode === 0) {
        this.comments.push({...this.newComment});
        alert('success');
      } else {
        alert(res.errmsg);
      }
    }, err => {
      alert(err);
    })
  }
  likeComment(c: CommentModel) {
    c.likes += 1;
  }
  ngOnDestroy() {
    // Reset page tile
    document.title = AppConst.APP_TILE;
  }
}
