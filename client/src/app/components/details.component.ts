import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit, OnDestroy  {
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)

  protected gid: number = 0

  protected subParams!: Subscription

  ngOnInit(): void {
    this.subParams = this.activatedRoute.params.subscribe(
      params => {
        console.info('>>> params: ', params)
        this.gid = parseInt(params['gid'])
      }
    )    
  }

  ngOnDestroy(): void {
    console.info('>>> unsubscribing...')
    this.subParams.unsubscribe()
  }
}
