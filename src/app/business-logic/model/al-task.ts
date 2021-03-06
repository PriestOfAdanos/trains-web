/**
 * tasks
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.6
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import {Output} from './tasks/output';
import {Script} from './tasks/script';
import {TaskStatusEnum} from './tasks/taskStatusEnum';
import {TaskTypeEnum} from './tasks/taskTypeEnum';
import {User} from './users/user';
import {Project} from './projects/project';
import {IExecution} from '../../webapp-common/core/models/model-data';


export interface ITask {
  /**
   * Task id
   */
  id?: string;
  /**
   * Task Name
   */
  name?: string;
  /**
   * Associated user id
   */
  user?: User;
  /**
   * Company ID
   */
  company?: string;
  /**
   * Type of task. Values: 'dataset_import', 'annotation', 'training', 'testing'
   */
  type?: TaskTypeEnum;
  /**
   *
   */
  status?: TaskStatusEnum;
  /**
   * Free text comment
   */
  comment?: string;
  /**
   * Task creation time (UTC)
   */
  created?: Date;
  /**
   * Task start time (UTC)
   */
  started?: Date;
  /**
   * Task end time (UTC)
   */
  completed?: Date;
  /**
   * Parent task id
   */
  parent?: string | ITask;
  /**
   * Project ID of the project to which this task is assigned
   */
  project?: Project;
  /**
   * Task output params
   */
  output?: Output;
  /**
   * Task execution params
   */
  execution?: IExecution;
  /**
   * Script info
   */
  script?: Script;
  /**
   * Tags list
   */
  tags?: Array<string>;
  /**
   * Last status change time
   */
  status_changed?: Date;
  /**
   * free text string representing info about the status
   */
  status_message?: string;
  /**
   * Reason for last status change
   */
  status_reason?: string;
  /**
   * Last status change time
   */
  published?: Date;
  /**
   * ID of last worker that handled the task
   */
  last_worker?: string;
  /**
   * Last time a worker reported while working on this task
   */
  last_worker_report?: Date;
}
