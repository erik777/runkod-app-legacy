import React, {Component} from 'react';
import {uploadSvg} from "../../../../svg";
import message from "../../../helper/message";
import to from "await-to-js";
import PropTypes from "prop-types";
import Ddu from "../../../helper/ddu";


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


class DropZone extends Component {

  highlight = () => {
    document.querySelector('#drop-zone').classList.add('highlight');
  };

  unHighlight = () => {
    document.querySelector('#drop-zone').classList.remove('highlight');
  };

  dragEnter = (e) => {

    this.highlight();

  };

  dragLeave = (e) => {

    this.unHighlight();

  };

  dragOver = (e) => {
    e.preventDefault();

    e.dataTransfer.dropEffect = 'copy';
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
      // const {onDrop} = this.props;
      // onDrop(files);
      console.log(files);
    })
  };


  componentDidMount() {
    const el = document.querySelector('#drop-zone-layer');

    el.addEventListener('dragenter', this.dragEnter, false);
    el.addEventListener('dragleave', this.dragLeave, false);
    el.addEventListener('dragover', this.dragOver, false);
    el.addEventListener('drop', this.drop, false);
  }

  render() {
    return <div id="drop-zone">
      <div id="drop-zone-layer"/>
      <div id="drop-zone-content">{uploadSvg} Drop files or folders here to upload</div>
    </div>
  }
}

DropZone.propTypes = {
  onDrop: PropTypes.func.isRequired,
};


export default DropZone