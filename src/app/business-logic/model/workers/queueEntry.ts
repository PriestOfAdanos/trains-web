/**
 * workers
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: 2.7
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { IdNameEntry } from './idNameEntry';


export interface QueueEntry {
    /**
     * Worker ID
     */
    id?: string;
    /**
     * Worker name
     */
    name?: string;
    next_task?: IdNameEntry;
    /**
     * Number of task entries in the queue
     */
    num_tasks?: number;
}
