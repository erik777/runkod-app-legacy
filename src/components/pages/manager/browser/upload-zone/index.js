import React, {Component} from 'react';

import PropTypes from 'prop-types';

import to from 'await-to-js';

import message from '../../../../helper/message';

import {uploadSvg} from '../../../../../svg';


const resolveDataTransfer = async (dataTransfer) => {

  const readEntries = (dir) => {
    return new Promise((resolve, reject) => {
      const dirReader = dir.createReader();
      dirReader.readEntries((entries) => {
        resolve(entries);
      }, (err) => {
        message.error(`Cannot read directory ${dir.fullPath}`);
        reject(err);
      });
    })
  };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      file.file(function (file) {
        resolve(file)
      }, (err) => {
        message.error(`Cannot read file ${file.fullPath}`);
        reject(err);
      });
    });
  };

  const readFileBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result)
      };

      reader.onerror = (err) => {
        message.error(`Cannot read file ${file.name}`);
        reject(err);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const fileList = [];

  const scan = async (item, path) => {
    path = path || '';
    if (item.isFile) {
      const [err, file] = await to(readFile(item));
      if (!err) {
        const [err, buffer] = await to(readFileBuffer(file));
        if (!err) {
          fileList.push({path, name: item.name, type: (file.type || null), size: file.size, buffer});
        }
      }
    } else if (item.isDirectory) {
      // Get folder contents
      const [err, entries] = await to(readEntries(item));
      if (!err) {
        for (let i = 0; i < entries.length; i++) {
          await to(scan(entries[i], path + item.name + "/"));
        }
      }
    }
  };

  const entries = [];
  for (let i = 0; i < dataTransfer.items.length; i++) {
    // webkitGetAsEntry should work away from async call
    const item = dataTransfer.items[i];
    entries.push(item.webkitGetAsEntry());
  }

  for (let i = 0; i < entries.length; i++) {
    await to(scan(entries[i]));
  }

  return new Promise((resolve) => {
    resolve(fileList)
  });

};


class UploadZone extends Component {

  highlight = () => {
    document.querySelector('#upload-zone').classList.add('highlight');
  };

  unHighlight = () => {
    document.querySelector('#upload-zone').classList.remove('highlight');
  };

  dragEnter = (e) => {
    this.highlight();
  };

  dragLeave = (e) => {
    this.unHighlight();
  };

  dragOver = (e) => {
    e.preventDefault();
  };

  drop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.unHighlight();

    // Check webkitGetAsEntry support
    if (!(DataTransferItem && DataTransferItem.prototype.webkitGetAsEntry)) {
      message.error("Your browser doesn't support drag&drop file upload");
      return;
    }

    resolveDataTransfer(e.dataTransfer).then(files => {
      const {onDrop} = this.props;
      onDrop(files);
      console.log(files);
    })
  };

  componentDidMount() {
    const el = document.querySelector('#upload-zone-layer');

    el.addEventListener('dragenter', this.dragEnter, false);
    el.addEventListener('dragleave', this.dragLeave, false);
    el.addEventListener('dragover', this.dragOver, false);
    el.addEventListener('drop', this.drop, false);
  }

  render() {
    return <div id="upload-zone">
      <div id="upload-zone-layer"/>
      <div id="upload-zone-content">{uploadSvg} Drop files or folders here to upload</div>
    </div>
  }
}

UploadZone.propTypes = {
  onDrop: PropTypes.func.isRequired,
};


export default UploadZone