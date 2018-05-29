import * as moment from 'moment-timezone';

export const ACCT_PREF_KEY_FOR_OVERDUE_TASKS_TASK_SCHEDULE: string = 'is_overdue_task_schedule_setup_components';
export const APP_ID: number = 240; // TODO:
export const APP_API_KEY: string = 'todo_components_app'; // TODO:
export const APP_PERMISSION_DEFAULT_API_KEY: string = 'default';
export const APP_PERMISSION_TODO_ADMIN_API_KEY: string = 'todo_admin';
export const APP_PERMISSIONS: Array<string> = [APP_PERMISSION_DEFAULT_API_KEY, APP_PERMISSION_TODO_ADMIN_API_KEY];
export const DB_DATE_FORMAT: string = 'YYYY-MM-DD';
export const DB_FIELDS: Array<string> = ['id', 'created_at', 'created_by', 'updated_at', 'updated_by', 'is_deleted', 'uri'];
export const DEFAULT_INFO_TIMEOUT: number = 3000;
export const DEFAULT_LOCATION_ID: number = 1;
export const MESSAGE_TYPE_ERROR: string = 'alert';
export const MESSAGE_TYPE_INFO: string = 'info';
export const OVERDUE_TASKS_TASK_ID: number = 132; // TODO:
export const OVERDUE_TASKS_TASK_SCHEDULE: object = {
  task_id: OVERDUE_TASKS_TASK_ID,
  start_date: moment().format('YYYY-MM-DD'),
  timezone: 'UTC',
  recur_type: 'hour',
  recur_interval: 1
};
