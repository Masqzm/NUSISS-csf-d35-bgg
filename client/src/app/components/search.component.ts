import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Game, SearchCriteria } from '../models';
import { BGGService } from '../bgg.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  private router = inject(Router)
  private bggSvc = inject(BGGService)

  private fb = inject(FormBuilder)
  protected form!: FormGroup

  // protected gameResults: Game[] = []
  //protected gameResults$ !: Promise<Game[]>   // add $ at end of variable to denote async variable (promise/observable)
  protected gameResults$ !: Observable<Game[]>   

  ngOnInit(): void {
    this.form = this.fb.group({
      q: this.fb.control<string>('', [ Validators.required ])
    })
  }

  search() {
    const q = this.form.value.q
    console.info('>>>> q: ', q)

    // const criteria: SearchCriteria = {
    //   q: q,
    //   count: 10
    // }
    // this.bggSvc.search({ q, count: 10 })
    //     .then(results => this.gameResults = results)
    //     .catch(err => console.info('ERROR: ', err))

    // Alternative to above
    //this.gameResults$ = this.bggSvc.search({ q, count: 10 })
    this.gameResults$ = this.bggSvc.searchAsObservable({ q, count: 10 })
  }

  
}
