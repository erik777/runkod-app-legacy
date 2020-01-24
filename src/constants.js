export const PROJECT_STATUS_ON = 1;
export const PROJECT_STATUS_MAINTENANCE = 2;
export const PROJECT_STATUS_OFF = 3;

export const DEFAULT_TAG_NAME = 'default';

export const NAME_SUFFIX = '.runkodapps.com';
export const NAME_MAX_LENGTH = 16;
export const CUSTOM_NAME_MAX_LENGTH = 60;

export const BASE_PATH = '/';
export const PATH_SEPARATOR = '/';

export const DISABLED_FILES = ['.DS_Store'];

export const FILE_CONCURRENCY = (navigator.hardwareConcurrency && navigator.hardwareConcurrency >= 4 ? 8 : 4);
