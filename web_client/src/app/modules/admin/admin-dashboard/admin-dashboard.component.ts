import { Component, OnInit } from '@angular/core';
import {CommentModel} from "@shared/models";
import {AdminDashboardService} from "./admin-dashboard.service";
import {ResModel} from "@shared/models";

@Component({
  selector: 'app-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  comments: CommentModel[];

  constructor(
    private adminDashboardService: AdminDashboardService,
  ) { }

  ngOnInit() {
    this.adminDashboardService.getCommentUnchecked().subscribe((res: CommentModel[]) => {
      this.comments = res.length ? res : [{content: 'no new comment'} as CommentModel];
    })
  }

  checkComment(id: number) {
    this.adminDashboardService.checkComment(id).subscribe((res: ResModel) => {
      if (res.code == 0) {
        this.comments[this.comments.findIndex(ff => ff.id === id)].is_check = true;
      } else {
        alert(res.message);
      }
    })
  }
}
