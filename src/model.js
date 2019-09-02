import {Model} from 'radiks';

export class Project extends Model {
  static className = 'project';

  static schema = {
    // project (domain) name
    name: {
      type: String,
      decrypted: true
    },
    // Username of owner
    username: {
      type: String,
      decrypted: true
    },
    // Whether a custom domain or sub domain
    custom: {
      type: Boolean,
      decrypted: true
    },
    // Active bucket name
    bucket: {
      type: String,
      decrypted: true
    },
    // Project status: 1=on, 2=off, 3=parked
    status: {
      type: Number,
      decrypted: true
    },
  }
}


export class Bucket extends Model {
  static className = 'bucket';

  static schema = {
    // Website _id
    website: {
      type: String,
      decrypted: true
    },
    // Bucket name
    name: {
      type: String,
      decrypted: true
    }
  }
}


export class File extends Model {
  static className = 'file';

  static schema = {
    // Project _id
    project: {
      type: String,
      decrypted: true
    },
    // Username of owner
    username: {
      type: String,
      decrypted: true
    },
    bucket: {
      type: String,
      decrypted: true
    },
    // Parent path
    parent: {
      type: String,
      decrypted: true
    },
    // Full file path (parent + file name)
    fullPath: {
      type: String,
      decrypted: true
    },
    // File name
    name: {
      type: String,
      decrypted: true
    },
    // File address on gaia storage
    address: {
      type: String,
      decrypted: true
    },
    // File size
    size: {
      type: Number,
      decrypted: true
    },
    // File type
    type: {
      type: String,
      decrypted: true
    },
    deleted: {
      type: Number,
      decrypted: true
    }
  }
}

