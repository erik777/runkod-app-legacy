import zip2files from './zip2files';

export default async () => {
  const v = Date.now();
  return await fetch(`/files/runkod-placeholder-dist.zip?v=${v}`)
    .then(r => zip2files(r.arrayBuffer()));
}
