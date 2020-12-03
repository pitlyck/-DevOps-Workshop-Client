import * as Immutable from 'immutable';

export function toggleChannelMember(id: Uuid, memberIds: Immutable.List<Uuid>): Immutable.List<Uuid> {
  if (memberIds.contains(id)) {
    const index = memberIds.findIndex((userId: Uuid) => userId === id);
    return memberIds.remove(index);
  }
  return memberIds.push(id);
}
