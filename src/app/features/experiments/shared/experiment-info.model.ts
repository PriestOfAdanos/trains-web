import {Task} from '../../../business-logic/model/tasks/task';
import {Model} from '../../../business-logic/model/models/model';
import {User} from '../../../business-logic/model/users/user';
import {TaskTypeEnum} from '../../../business-logic/model/tasks/taskTypeEnum';
import {TaskStatusEnum} from '../../../business-logic/model/tasks/taskStatusEnum';
import {Project} from '../../../business-logic/model/projects/project';
import {Script} from '../../../business-logic/model/tasks/script';
import {IExecutionForm} from './experiment-execution.model';
import {Execution} from '../../../business-logic/model/tasks/execution';
import {IHyperParamsForm} from '../../../webapp-common/experiments/shared/experiment-hyper-params.model';
import {Artifact} from '../../../business-logic/model/tasks/artifact';
import {IExperimentModelInfo} from '../../../webapp-common/experiments/shared/common-experiment-model.model';

/**
 * an extended object of task that includes projection, will come from the server as an api response.
 */
export interface ISelectedExperiment {
  id?: string;
  name?: string;
  user?: User;
  company?: string;
  type?: TaskTypeEnum;
  status?: TaskStatusEnum;
  comment?: string;
  created?: Date;
  completed?: Date;
  started?: Date;
  last_update?: Date;
  parent?: string;
  project?: Project;
  output?: ISelectedExperimentOutput;
  execution?: ISelectedExperimentExecution;
  script?: Script;
  tags?: Array<string>;
  system_tags?: Array<string>;
  published?: Task['published'];
  status_changed?: Date;
  status_message?: string;
  status_reason?: string;
  last_iteration?: number;
}

/**
 * an object that will transfrom from the ISelectedExperiment response to more comfortable object to display.
 */
export interface IExperimentInfo {
  id?: Task['id'];
  name?: string;
  comment?: string;
  model?: IExperimentModelInfo;
  execution?: IExecutionForm;
  hyperParams?: IHyperParamsForm;
  artifacts?: Artifact[];
}

export interface ISelectedExperimentOutput {
  destination?: string;
  model?: {
    id: Model['id'];
    name: Model['name'];
    design?: Model['design'];
    framework?: Model['framework'];
  };
  result?: string;
  error?: string;
}

export interface ISelectedExperimentExecution {
  model?: {
    id: Model['id'],
    name: Model['name'],
    uri: Model['uri'],
    created: Model['created'],
    labels: Model['labels'],
    task: {
      id: Task['id'];
      name: Task['name'];
    },
    project: {
      id: Project['id'];
      name: Project['name'];
    },
    user: {
      id: User['id'];
      name: User['name'];
    },
  };
  parameters: Execution['parameters'];
  model_desc?: any;
  framework?: any;
  model_labels?: { [key: string]: number; };
  artifacts?: Artifact[];
  docker_cmd?: string;
}

export interface IExperimentInfoFormComponent {
  editable: boolean;
}
