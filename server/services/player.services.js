import mem_cache from 'memory-cache';

export function getMasterPlayerSocketID() {
  return mem_cache.get('master');
}

export function setMasterPlayerSocketID(socketID) {
  return mem_cache.put('master', socketID);
}

export function unsetMasterPlayer() {
  return mem_cache.del('master');
}
