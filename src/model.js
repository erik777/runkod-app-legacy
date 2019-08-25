import {Model} from 'radiks';

export class Website extends Model {
  static className = 'website';

  static schema = {
    // owner username
    user: {
      type: String,
      decrypted: true,
    },
    // website (domain) name
    name: {
      type: String,
      decrypted: true
    },
    // Whether a custom domain or sub domain
    custom: {
      type: Boolean,
      decrypted: true
    },
    // Active bucket _id
    bucket: {
      type: String,
      decrypted: true
    },
    // Website status: 1=on, 2=off, 3=parked
    status: {
      type: Number,
      decrypted: true
    },
  }
}


export class Bucket extends Model {
  static className = 'bucket';

  static schema = {
    // Owner username
    user: {
      type: String,
      decrypted: true,
    },
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
    // Owner username
    user: {
      type: String,
      decrypted: true,
    },
    // Website _id
    website: {
      type: String,
      decrypted: true
    },
    // Bucket _id
    bucket: {
      type: String,
      decrypted: true
    },
    // Full file path
    path: {
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
    mimeType: {
      type: String,
      decrypted: true
    }
  }
}

