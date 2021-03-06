import {RECENT_TASKS_TABLE_COL_FIELDS} from '../../webapp-common/dashboard/common-dashboard.const';
import {ColHeaderTypeEnum, ISmCol} from '../../webapp-common/shared/ui-components/data/table/table.consts';


export const RECENT_EXPERIMENTS_TABLE_COLS: ISmCol[] = [
  {
    id            : RECENT_TASKS_TABLE_COL_FIELDS.TYPE,
    headerType    : ColHeaderTypeEnum.title,
    header        : 'TYPE',
    bodyStyleClass: 'type-col'
  },
  {
    id        : RECENT_TASKS_TABLE_COL_FIELDS.NAME,
    headerType: ColHeaderTypeEnum.title,
    header    : 'TITLE',
  },
  {
    id        : RECENT_TASKS_TABLE_COL_FIELDS.PROJECT,
    headerType: ColHeaderTypeEnum.title,
    header    : 'PROJECT',
  },
  {
    id        : RECENT_TASKS_TABLE_COL_FIELDS.STARTED,
    headerType: ColHeaderTypeEnum.title,
    header    : 'STARTED',
  },
  {
    id        : RECENT_TASKS_TABLE_COL_FIELDS.LAST_UPDATE,
    headerType: ColHeaderTypeEnum.title,
    header    : 'UPDATED'
  },
  // {
  //   id        : RECENT_TASKS_TABLE_COL_FIELDS.QUEUE,
  //   headerType: ColHeaderTypeEnum.title,
  //   header    : 'QUEUE'
  // },
  // {
  //   id        : RECENT_TASKS_TABLE_COL_FIELDS.WORKER,
  //   headerType: ColHeaderTypeEnum.title,
  //   header    : 'WORKER'
  // },
  {
    id            : RECENT_TASKS_TABLE_COL_FIELDS.STATUS,
    headerType    : ColHeaderTypeEnum.title,
    header        : 'STATUS',
    bodyStyleClass: 'status-col'
  }
];
