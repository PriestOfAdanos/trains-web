import {Action} from '@ngrx/store';
import {Worker} from '../../../business-logic/model/workers/worker';
import {TableSortOrderEnum} from '../../shared/ui-components/data/table/table.consts';
import {Topic} from '../../shared/utils/statistics';

const workersPrefix = 'WORKERS_';
export const SET_WORKERS = workersPrefix + 'SET_WORKERS';
export const SET_WORKERS_TASKS = workersPrefix + 'SET_WORKERS_TASKS';
export const GET_SELECTED_WORKER = workersPrefix + 'GET_SELECTED_WORKER';
export const WORKERS_TABLE_SORT_CHANGED = workersPrefix + 'WORKERS_TABLE_SORT_CHANGED';
export const SET_SELECTED_WORKER_FROM_SERVER = workersPrefix + 'SET_SELECTED_WORKER_FROM_SERVER';
export const SYNC_SPECIFIC_WORKER_IN_TABLE = workersPrefix + 'SYNC_SPECIFIC_WORKER_IN_TABLE';
export const GET_STATS_AND_WORKERS = workersPrefix + 'GET_STATS_AND_WORKERS';
export const SET_STATS = workersPrefix + 'SET_STATS';
export const SET_STATS_PARAMS = workersPrefix + 'SET_STATS_PARAMS';


export class SetWorkers implements Action {
  type = SET_WORKERS;
  public payload: { workers: Array<Worker> };

  constructor(workers: Array<Worker>) {
    this.payload = {workers};
  }
}

export class GetSelectedWorker implements Action {
  type = GET_SELECTED_WORKER;
  public payload: { worker: Worker };

  constructor(worker: Worker) {
    this.payload = {worker};
  }
}

export class WorkersTableSortChanged implements Action {
  public type = WORKERS_TABLE_SORT_CHANGED;
  public payload: { colId: string; sortOrder: (TableSortOrderEnum) };

  constructor(colId: string, sortOrder: TableSortOrderEnum) {
    this.payload = {colId, sortOrder};
  }
}

export class SetSelectedWorkerFromServer implements Action {
  type = SET_SELECTED_WORKER_FROM_SERVER;
  public payload: { worker: Worker };

  constructor(worker: Worker) {
    this.payload = {worker};
  }
}

export class SyncSpecificWorkerInTable implements Action {
  type = SYNC_SPECIFIC_WORKER_IN_TABLE;
  public payload: { worker: Worker };

  constructor(worker: Worker) {
    this.payload = {worker};
  }
}

export class GetStatsAndWorkers implements Action {
  type = GET_STATS_AND_WORKERS;

  constructor(public payload: {
    maxPoints: number
  }) {
  }
}

export class SetStats implements Action {
  type = SET_STATS;

  constructor(public payload: { data: Topic[] }) {
  }
}

export class SetStatsParams implements Action {
  type = SET_STATS_PARAMS;

  constructor(public payload: { timeFrame: string, param: string }) {
  }
}
