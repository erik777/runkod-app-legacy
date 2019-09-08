const dropZoneId = 'upload-zone-layer';


window.addEventListener('dragenter', function (e) {
  if (e.target.id !== dropZoneId) {
    e.preventDefault();
    e.dataTransfer.effectAllowed = 'none';
    e.dataTransfer.dropEffect = 'none';
  }

}, false);

window.addEventListener('dragover', function (e) {
  if (e.target.id !== dropZoneId) {
    e.preventDefault();
    e.dataTransfer.effectAllowed = 'none';
    e.dataTransfer.dropEffect = 'none';

  }
});

window.addEventListener('drop', function (e) {
  if (e.target.id !== dropZoneId) {
    e.preventDefault();
    e.dataTransfer.effectAllowed = 'none';
    e.dataTransfer.dropEffect = 'none';
  }
});