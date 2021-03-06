import {Injectable} from '@angular/core';
import {
  IExperimentInfo, ISelectedExperiment
} from '../../../../features/experiments/shared/experiment-info.model';
import {
  IExecutionForm, sourceTypesEnum
} from '../../../../features/experiments/shared/experiment-execution.model';
import {get, getOr} from 'lodash/fp';
import {Execution} from '../../../../business-logic/model/tasks/execution';
import {Task} from '../../../../business-logic/model/tasks/task';
import {Model} from '../../../../business-logic/model/models/model';
import {Script} from '../../../../business-logic/model/tasks/script';
import {IExperimentModelInfo} from '../common-experiment-model.model';

@Injectable({providedIn: 'root'})
export class CommonExperimentReverterService {

  constructor() {
  }

  commonRevertExperiment(experiment: ISelectedExperiment): IExperimentInfo {
    return {
      id: experiment.id,
      name: experiment.name,
      comment: experiment.comment,
      execution: this.revertExecution(experiment),
      model: this.revertModel(experiment),
      hyperParams: {parameters: this.revertExecutionParameters(experiment.execution.parameters)},
    };
  }

  revertExecution(experiment: ISelectedExperiment): IExecutionForm {
    return {
      source: this.revertExecutionSource(experiment.script),
      output: {
        destination: get('destination', experiment.output) || '',
        logLevel: 'basic'// TODO: should be enum from gencode.
      },
      requirements: experiment.script ? this.revertRequirements(experiment.script) : {pip: ''},
      diff: get('diff', experiment.script) || '',
      docker_cmd: get('docker_cmd', experiment.execution)
    };
  }

  revertExecutionParameters(parameters: Execution['parameters']): Array<{ label: any, key: string }> {
    return parameters ?
      Object.entries(parameters).map(([key, val]) => ({label: val, key: key}))
        .sort((p, c) => p.key < c.key ? -1 : 1) :
      [];
  }

  revertExecutionSource(script: Task['script']): IExecutionForm['source'] {
    return {
      repository: get('repository', script) || '',
      tag: get('tag', script) || '',
      version_num: get('version_num', script) || '',
      branch: get('branch', script) || '',
      entry_point: get('entry_point', script) || '',
      working_dir: get('working_dir', script) || '',
      scriptType: this.revertScriptType(script)
    };
  }

  revertScriptType(script: Task['script']) {
    switch (true) {
      case !!get('tag', script):
        return sourceTypesEnum.Tag;
      case !!get('version_num', script):
        return sourceTypesEnum.VersionNum;
      default:
        return sourceTypesEnum.Branch;
    }
  }

  revertModel(experiment: ISelectedExperiment): IExperimentModelInfo {
    return {
      input: {
        id: get('model.id', experiment.execution),
        name: get('model.name', experiment.execution),
        url: get('model.uri', experiment.execution),
        framework: get('framework', experiment.execution),
        labels: get('model.labels', experiment.execution),
        project: get('model.project', experiment.execution),
      },
      output: {
        id: get('model.id', experiment.output) || '',
        name: get('model.name', experiment.output) || '',
        url: get('model.uri', experiment.output) || '',
        project: get('model.project', experiment.output) || '',
        design: get('model.design.design', experiment.output) || '',
      },
      artifacts: get('artifacts', experiment.execution) || [],
      source: {
        experimentName: get('model.task.name', experiment.execution),
        experimentId: get('model.task.id', experiment.execution),
        projectName: get('model.task.project.name', experiment.execution),
        projectId: get('model.task.project.id', experiment.execution),
        userName: get('model.user.name', experiment.execution),
        timeCreated: get('model.created', experiment.execution),
      },
      prototext: this.getModelDesign(get('model_desc', experiment.execution)),
    };
  }


  revertModelFromModel(model: Model, populatePrototext: boolean): Partial<IExperimentModelInfo> {
    const modelData: Partial<IExperimentModelInfo> = {
      input: model.id ? {
        id: model.id,
        name: model.name,
        url: model.uri,
        framework: model.framework,
        labels: model.labels,
      } : undefined,
      output: { // TODO: no need?
        id: null,
        name: null,
        url: null
      },
      source: {
        experimentId: get('task.id', model),
        projectId: get('project.id', model),
        experimentName: get('task.name', model),
        projectName: get('project.name', model),
        userName: get('user.name', model),
        timeCreated: model.created,
      },
    };

    if (populatePrototext) {
      modelData.prototext = this.getModelDesign(model.design);
    }

    return modelData;
  }

  public getModelDesign(modelDesc: Task['execution']['model_desc']) {
    const modelDesign = get('design', modelDesc) || get('prototxt', modelDesc);
    return typeof modelDesign === 'string' ? modelDesign : JSON.stringify(modelDesign);
  }

  public getOutputModelDesign(modelDesc: Task['execution']['model_desc']) {
    const modelDesign = get('design', modelDesc) || get('prototxt', modelDesc);
    return typeof modelDesign === 'string' ? modelDesign : JSON.stringify(modelDesign);
  }

  private revertRequirements(script: Script) {
    const pip = getOr([], 'requirements.pip', script);
    return {
      ...script.requirements,
      'pip': (Array.isArray(pip) ? pip.join('\n') : pip) || ''
    };
  }
}
