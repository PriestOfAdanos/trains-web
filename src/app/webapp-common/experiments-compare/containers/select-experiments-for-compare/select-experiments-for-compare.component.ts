import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {resetSelectCompareHeader, searchExperimentsForCompare, setSearchExperimentsForCompareResults, setShowSearchExperimentsForCompare} from '../../actions/compare-header.actions';
import {selectExperimentsForCompareSearchResults, selectExperimentsForCompareSearchTerm} from '../../reducers';
import {Observable, Subscription} from 'rxjs';
import {Task} from 'app/business-logic/model/tasks/task';
import {AddExperimentEvent} from '../../dumbs/select-experiments-for-compare-table/select-experiments-for-compare-table.component';
import {ActivatedRoute, Router} from '@angular/router';
import {selectRouterParams} from '../../../core/reducers/router-reducer';
import {filter, map} from 'rxjs/operators';
import {get} from 'lodash/fp';

@Component({
  selector   : 'sm-select-experiments-for-compare',
  templateUrl: './select-experiments-for-compare.component.html',
  styleUrls  : ['./select-experiments-for-compare.component.scss']
})
export class SelectExperimentsForCompareComponent implements OnInit, OnDestroy, AfterViewInit {
  public experimentsResults$: Observable<Array<Task>>;
  public selectedExperiments: string[] = [];
  private paramsSubscription: Subscription;
  public searchTerm$: Observable<string>;
  @ViewChild('searchExperiments', {static: true}) searchExperiments;

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.store.dispatch(setShowSearchExperimentsForCompare({payload: false}));
    }
  }


  constructor(private store: Store<any>, private route: ActivatedRoute, private router: Router, private eRef: ElementRef, private changedDetectRef: ChangeDetectorRef) {
    this.experimentsResults$ = this.store.pipe(select(selectExperimentsForCompareSearchResults));
    this.searchTerm$         = this.store.pipe(select(selectExperimentsForCompareSearchTerm));

  }

  public addOrRemoveExperiment(addExperimentEvent: AddExperimentEvent) {
    let experimentsIdsList;
    if (addExperimentEvent.addOrRemoved) {
      experimentsIdsList = this.selectedExperiments.concat([addExperimentEvent.experiment.id]);
    } else {
      experimentsIdsList = this.selectedExperiments.filter(expId => expId !== addExperimentEvent.experiment.id);
    }

    this.router.navigate(
      [
        {ids: experimentsIdsList.join(',')},
        ...this.route.children[0].snapshot.routeConfig.path.split('/')
      ],
      {relativeTo: this.route});
  }

  public searchTermChanged(term: string) {
    if (term.length > 2) {
      this.store.dispatch(searchExperimentsForCompare({payload: term}));
    } else {
      this.store.dispatch(setSearchExperimentsForCompareResults({payload: []}));
    }
  }

  public closeSearch() {
    this.store.dispatch(setShowSearchExperimentsForCompare({payload: false}));

  }


  ngOnInit() {
    this.paramsSubscription = this.store.pipe(
      select(selectRouterParams),
      map(params => get('ids', params)),
      filter(params => !!params)
    )
      .subscribe((experimentIds: string) => {
        this.selectedExperiments = experimentIds.split(',');
        this.changedDetectRef.detectChanges();

      });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    this.store.dispatch(resetSelectCompareHeader());
  }

  ngAfterViewInit(): void {
    this.searchExperiments.nativeElement.focus();
  }

}
